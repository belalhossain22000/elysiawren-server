import ApiError from "../../../errors/ApiErrors"
import prisma from "../../../shared/prisma"

const createCategory = async (name: string) => {
  const existingCategory = await prisma.category.findUnique({
    where: {
      name,
    },
  })

  if (existingCategory) {
    throw new ApiError(400, "Category already exists")
  }

  return prisma.category.create({
    data: {
      name,
    },
  })
}

const getAllCategories = async (query: any) => {
  const { page = 1, limit = 10 } = query
  const skip = (Number(page) - 1) * Number(limit)
  const take = Number(limit)

  const whereConditions = {}

  const totalCategories = await prisma.category.count({
    where: whereConditions,
  })

  const categories = await prisma.category.findMany({
    where: whereConditions,
    skip,
    take,
    include: {
      Subcategory: true,
    },
  })

  return {
    meta: {
      totalCategories,
      page,
      limit,
    },
    data: categories,
  }
}

const getCategoryById = async (id: string) => {
  return prisma.category.findUnique({
    where: {
      id,
    },
  })
}

const updateCategory = async (id: string, name: string) => {
  return prisma.category.update({
    where: {
      id,
    },
    data: {
      name,
    },
  })
}

const deleteCategory = async (id: string) => {
  return prisma.category.delete({
    where: {
      id,
    },
  })
}

export const CategoryServices = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
}
