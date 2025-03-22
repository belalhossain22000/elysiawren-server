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
  const cart = await prisma.cart.findFirst({
    where: {
      userId,
    },
  })

  return cart
}

const getAllCarts = async () => {
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
