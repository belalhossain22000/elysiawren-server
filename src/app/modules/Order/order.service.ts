import httpStatus from "http-status"
import prisma from "../../../shared/prisma"
import ApiError from "../../../errors/ApiErrors"
import { StripeOneTimePayment } from "../../utils/stripeOneTime"
import { paymentStatus } from "@prisma/client"

const createOrder = async (
  userId: string,
  paymentMethodId: string,
  shippingAddress: string,
  zipCode: string,
  city: string,
  state: string,
  country: string
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

  const totalAmount = cart.items.reduce((acc, item) => {
    return acc + item.price
  }, 0)

  let order

  await prisma.$transaction(async (tsx) => {
    const payment = await StripeOneTimePayment(
      totalAmount,
      userId,
      paymentMethodId
    )

    if (!payment) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Payment failed")
    }

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

    await tsx.orderItem.createMany({
      data: cart.items.map((item) => ({
        orderId: order.id,
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
      })),
    })

    await prisma.payment.create({
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

// const getAllOrders = async (query:string) => {
//   const {page=1, limit=10} = query

//   const whereConditions = {}

//   const totalOrders =

export const OrderServices = {
  createOrder,
}
