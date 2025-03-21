import ApiError from "../../../errors/ApiErrors"
import prisma from "../../../shared/prisma"

const createColor = async (
  name: string,
  hexCode: string,
  productId: string
) => {
  return prisma.color.create({
    data: {
      name,
      hexCode,
      productId,
    },
  })
}

const getAllColorsByProductId = async (productId: string) => {
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
    include: {
      Color: true,
    },
  })

  if (!product) {
    throw new ApiError(404, "Product not found")
  }

  return product.Color
}

const getColorById = async (id: string) => {
  return prisma.color.findUnique({
    where: {
      id,
    },
  })
}

const updateColor = async (
  id: string,
  name: string,
  hexCode: string,
  productId: string
) => {
  if (productId) {
    const existingProduct = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    })

    if (!existingProduct) {
      throw new ApiError(404, "Product not found")
    }
  }

  return prisma.color.update({
    where: {
      id,
    },
    data: {
      name,
      hexCode,
      productId,
    },
  })
}

const deleteColor = async (id: string) => {
  return prisma.color.delete({
    where: {
      id,
    },
  })
}

export const ColorServices = {
  createColor,
  getAllColorsByProductId,
  getColorById,
  updateColor,
  deleteColor,
}
