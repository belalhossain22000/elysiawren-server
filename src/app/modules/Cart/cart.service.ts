import { Cart } from "@prisma/client"
import prisma from "../../../shared/prisma"

const createCart = async (userId: string) => {
  const cart = await prisma.cart.create({
    data: {
      userId,
    },
  })

  return cart
}

const getCartById = async (id: string) => {
  const cart = await prisma.cart.findUnique({
    where: {
      id,
    },
  })

  return cart
}

const getUserCart = async (userId: string) => {
  console.log("get user cart")
  let cart = (await prisma.cart.findFirst({
    where: {
      userId,
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  })) as Partial<Cart> | null

  console.log(cart, userId)

  if (!cart) {
    cart = await prisma.cart.create({
      data: {
        userId,
      },
    })
  }

  return cart
}

const getAllCarts = async () => {
  console.log("get all carts")
  const carts = await prisma.cart.findMany()
  return carts
}

const deleteCart = async (id: string) => {
  const cart = await prisma.cart.delete({
    where: {
      id,
    },
  })

  return cart
}

export const CartServices = {
  createCart,
  getCartById,
  getUserCart,
  getAllCarts,
  deleteCart,
}
