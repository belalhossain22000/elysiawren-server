import httpStatus from "http-status"
import prisma from "../../../shared/prisma"
import ApiError from "../../../errors/ApiErrors"
import { Cart, CartItem } from "@prisma/client"
import { CartServices } from "../Cart/cart.service"

const createCartItem = async (
  userId: string,
  productId: string,
  quantity: number
) => {
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  })

  if (!product) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Product not found")
  }

  const price = product.price * quantity

  if (quantity > product.quantity) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Quantity not available")
  }

  let cart = await prisma.cart.findUnique({
    where: {
      userId,
    },
  })

  if (!cart) {
    cart = await CartServices.createCart(userId)
  }

  const cartItem = await prisma.cartItem.create({
    data: {
      cartId: cart.id,
      productId,
      quantity,
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

const updateCartItem = async (id: string, payload: Partial<CartItem>) => {
  let { productId, quantity, price } = payload

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
