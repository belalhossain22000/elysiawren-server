import ApiError from "../../../errors/ApiErrors"
import prisma from "../../../shared/prisma"

const createSubCategory = async (name: string, categoryId: string) => {
  const existingSubCategory = await prisma.subcategory.findUnique({
    where: {
      name,
    },
  })

  if (existingSubCategory) {
    throw new ApiError(400, "Sub category with this name already exists")
  }

  const category = await prisma.category.findUnique({
    where: {
      id: categoryId,
    },
  })

  if (!category) {
    throw new ApiError(400, "Category not found")
  }

  return prisma.subcategory.create({
    data: {
      name,
      categoryId,
    },
  })
}

const getAllSubCategories = async (query: any) => {
  const { page = 1, limit = 10, categoryId } = query
  const skip = (page - 1) * limit
  const take = limit

  const whereConditions: any = {}

  if (categoryId) {
    whereConditions["categoryId"] = categoryId
  }

  const totalSubCategories = await prisma.subcategory.count({
    where: whereConditions,
  })

  const subCategories = await prisma.subcategory.findMany({
    where: whereConditions,
    skip,
    take,
  })

  return {
    meta: {
      totalSubCategories,
      page,
      limit,
    },
    data: subCategories,
  }
}

const getSubCategoryById = async (id: string) => {
  return prisma.subcategory.findUnique({
    where: {
      id,
    },
  })
}

const updateSubCategory = async (
  id: string,
  name: string,
  categoryId: string
) => {
  if (categoryId) {
    const category = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    })

    if (!category) {
      throw new ApiError(400, "Category not found")
    }
  }
  return prisma.subcategory.update({
    where: {
      id,
    },
    data: {
      name,
      categoryId,
    },
  })
}

const deleteSubCategory = async (id: string) => {
  return prisma.subcategory.delete({
    where: {
      id,
    },
  })
}

export const SubCategoryServices = {
  createSubCategory,
  getAllSubCategories,
  getSubCategoryById,
  updateSubCategory,
  deleteSubCategory,
}
