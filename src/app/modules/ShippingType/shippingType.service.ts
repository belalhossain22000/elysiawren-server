import { ShippingPrice } from "@prisma/client"
import prisma from "../../../shared/prisma"

const createShippingType = async (payload: ShippingPrice) => {
  const { type, price, description } = payload

  if (!type || !price || !description) {
    throw new Error("Please provide all required fields")
  }

  const shippingType = await prisma.shippingPrice.create({
    data: {
      type,
      price,
      description,
    },
  })
  return shippingType
}

const getAllShippingTypes = async () => {
  const shippingTypes = await prisma.shippingPrice.findMany()
  return shippingTypes
}

const getShippingTypeById = async (id: string) => {
  const shippingType = await prisma.shippingPrice.findUnique({
    where: {
      id,
    },
  })
  return shippingType
}

const updateShippingType = async (id: string, payload: ShippingPrice) => {
  const { type, price, description } = payload

  const shippingType = await prisma.shippingPrice.update({
    where: {
      id,
    },
    data: {
      type,
      price,
      description,
    },
  })
  return shippingType
}

const deleteShippingType = async (id: string) => {
  const shippingType = await prisma.shippingPrice.delete({
    where: {
      id,
    },
  })
  return shippingType
}

export const ShippingTypeServices = {
  createShippingType,
  getAllShippingTypes,
  getShippingTypeById,
  updateShippingType,
  deleteShippingType,
}
