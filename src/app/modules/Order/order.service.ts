import httpStatus from "http-status"
import prisma from "../../../shared/prisma"
import ApiError from "../../../errors/ApiErrors"
import { StripeOneTimePayment } from "../../utils/stripeOneTime"
import { OrderStatus, paymentStatus } from "@prisma/client"
import { date } from "zod"
import { stripe } from "../../utils/stripe"

const createOrder = async (
  userId: string,
  paymentMethodId: string,
  shippingAddress: string,
  zipCode: string,
  city: string,
  state: string,
  country: string,
  shippingType: string
) => {
  const cart = await prisma.cart.findUnique({
    where: {
      userId,
    },
    include: {
      items: true,
    },
  })

  if (!cart) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Cart not found")
  }

  const shippingCost = await prisma.shippingPrice.findUnique({
    where: {
      type: shippingType,
    },
  })

  if (!shippingCost) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Shipping type not found")
  }

  // console.log({ cart })

  let totalAmount = cart.items.reduce((acc, item) => {
    return acc + item.price
  }, 0)

  totalAmount += shippingCost.price

  let order: any

  await prisma.$transaction(async (tsx) => {
    const payment = await StripeOneTimePayment(
      totalAmount,
      userId,
      paymentMethodId
    )

    if (!payment) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Payment failed")
    }

    // console.log({ payment })

    order = await tsx.order.create({
      data: {
        userId,
        totalAmount,
        status: "PENDING",
        shippingAddress,
        zipCode,
        city,
        state,
        country,
      },
    })

    // console.log({ order })

    await tsx.orderItem.createMany({
      data: cart.items.map((item) => ({
        orderId: order.id,
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
      })),
    })

    if (!order.id) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Order not created")
    }

    console.log(order.id)

    await tsx.payment.create({
      data: {
        userId,
        paymentMethod: payment.payment_method as string,
        amount: totalAmount,
        paymentStatus: paymentStatus.SUCCEEDED,
        orderId: order.id,
        paymentDate: new Date(),
        transactionId: payment.id,
      },
    })

    await tsx.cartItem.deleteMany({
      where: {
        cartId: cart.id,
      },
    })

    await tsx.cart.delete({
      where: {
        id: cart.id,
      },
    })
  })

  return order
}

const getAllOrders = async (query: any) => {
  let { page = 1, limit = 10, status } = query
  console.log(typeof page)

  if (page) {
    page *= 1
  }

  if (limit) {
    limit *= 1
  }

  const whereConditions: any = {}

  if (status as OrderStatus) {
    whereConditions["status"] = status
  }

  const totalOrders = await prisma.order.count({
    where: whereConditions,
  })

  const orders = await prisma.order.findMany({
    where: whereConditions,
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
    skip: (page - 1) * limit,
    take: limit,
  })

  return {
    meta: {
      totalOrders,
      page: parseInt(page),
      limit: parseInt(limit),
    },
    data: orders,
  }
}

const getUserOrders = async (userId: string, query: any) => {
  const { page = 1, limit = 10 } = query
  const skip = (page - 1) * limit
  const take = limit

  const whereConditions: any = {
    userId,
  }

  const totalOrders = await prisma.order.count({
    where: whereConditions,
  })
  const orders = await prisma.order.findMany({
    skip,
    take,
    where: whereConditions,
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  })

  return orders
}

const getOrderById = async (orderId: string) => {
  const order = await prisma.order.findUnique({
    where: {
      id: orderId,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  })

  return order
}

const updateOrderStatus = async (orderId: string, status: OrderStatus) => {
  const order = await prisma.order.update({
    where: {
      id: orderId,
    },
    data: {
      status,
    },
  })

  return order
}

const cancelOrder = async (orderId: string) => {
  const order = await prisma.order.findUnique({
    where: {
      id: orderId,
    },
  })

  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, "Order not found")
  }

  if (
    order.status !== OrderStatus.PENDING &&
    order.status !== OrderStatus.REQUESTED_FOR_CANCEL
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Order cannot be cancelled")
  }

  const payment = await prisma.payment.findFirst({
    where: {
      orderId,
    },
  })

  if (!payment) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Payment not found")
  }

  if (payment.paymentStatus === paymentStatus.SUCCEEDED) {
    if (payment.transactionId) {
      await stripe.refunds.create({
        payment_intent: payment.transactionId,
      })
    } else {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Invalid transaction ID for refund"
      )
    }
  }

  return prisma.order.update({
    where: {
      id: orderId,
    },
    data: {
      status: OrderStatus.CANCELLED,
    },
  })
}

const requestToCancelOrder = async (orderId: string) => {
  const order = await prisma.order.findUnique({
    where: {
      id: orderId,
    },
  })

  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, "Order not found")
  }

  if (order.status !== OrderStatus.PENDING) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Order cannot be cancelled")
  }

  return prisma.order.update({
    where: {
      id: orderId,
    },
    data: {
      status: OrderStatus.REQUESTED_FOR_CANCEL,
    },
  })
}

const reviewOrder = async (userId: string) => {
  const cartId = await prisma.cart.findUnique({
    where: {
      userId,
    },
  })

  if (!cartId) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Cart not found")
  }

  const cartItems = await prisma.cartItem.findMany({
    where: {
      cartId: cartId.id,
    },
  })

  if (!cartItems) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Cart items not found")
  }

  let orderItems: any[] = []

  cartItems.forEach((item) => {
    orderItems.push({
      productId: item.productId,
      quantity: item.quantity,
      price: item.price,
    })
  })

  return orderItems
}

export const OrderServices = {
  createOrder,
  getAllOrders,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder,
  requestToCancelOrder,
  reviewOrder,
}
