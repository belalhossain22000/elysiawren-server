import httpStatus from "http-status"
import prisma from "../../../shared/prisma"
import ApiError from "../../../errors/ApiErrors"
import { Part } from "@aws-sdk/client-s3"
import { CartItem } from "@prisma/client"

const createCartItem = async (
  cartId: string,
  productId: string,
  quantity: string,
  price: number
) => {
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  })

  if (!product) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Product not found")
  }

  const cart = await prisma.cart.findUnique({
    where: {
      id: cartId,
    },
  })

  if (!cart) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Cart not found")
  }

  const cartItem = await prisma.cartItem.create({
    data: {
      cartId,
      productId,
      quantity: parseInt(quantity),
      price,
    },
  })

  return cartItem
}

const getCartItems = async (cartId: string) => {
  const cartItems = await prisma.cartItem.findMany({
    where: {
      cartId,
    },
  })

  return cartItems
}

const updateCartItem = async (payload: Partial<CartItem>) => {
  let { id, productId, quantity, price } = payload

  if (quantity) {
    quantity = parseInt(quantity.toString())
  }

  if (price) {
    price = parseFloat(price.toString())
  }

  const cartItem = await prisma.cartItem.findUnique({
    where: {
      id,
    },
  })

  if (!cartItem) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Cart item not found")
  }

  if (productId) {
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    })

    if (!product) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Product not found")
    }
  }

  const updatedCartItem = await prisma.cartItem.update({
    where: {
      id,
    },
    data: {
      productId: productId || cartItem.productId,
      quantity: quantity || cartItem.quantity,
      price: price || cartItem.price,
    },
  })

  return updatedCartItem
}

const deleteCartItem = async (id: string) => {
  const cartItem = await prisma.cartItem.findUnique({
    where: {
      id,
    },
  })

  if (!cartItem) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Cart item not found")
  }

  await prisma.cartItem.delete({
    where: {
      id,
    },
  })

  return cartItem
}

export const cartItemServices = {
  createCartItem,
  getCartItems,
  updateCartItem,
  deleteCartItem,
}
