import { Product } from "@prisma/client"
import ApiError from "../../../errors/ApiErrors"
import prisma from "../../../shared/prisma"

const createProduct = async (req: Product) => {
  const {
    title,
    brandId,
    categoryId,
    subCategoryId,
    price,
    quantity,
    description,
  } = req

  if (
    !title ||
    !brandId ||
    !categoryId ||
    !subCategoryId ||
    !price ||
    !quantity ||
    !description
  ) {
    throw new Error("All fields are required")
  }

  const existingBrand = await prisma.brand.findUnique({
    where: {
      id: brandId,
    },
  })

  if (!existingBrand) {
    throw new ApiError(400, "Brand not found")
  }

  const existingCategory = await prisma.category.findUnique({
    where: {
      id: categoryId,
    },
  })

  if (!existingCategory) {
    throw new ApiError(400, "Category not found")
  }

  const existingSubCategory = await prisma.subcategory.findUnique({
    where: {
      id: subCategoryId,
    },
  })

  if (!existingSubCategory) {
    throw new ApiError(400, "Sub category not found")
  }

  const product = await prisma.product.create({
    data: {
      title,
      brandId,
      categoryId,
      subCategoryId,
      price,
      description,
      quantity,
      shortDescription: description,
    },
  })

  return product
}

const getAllProducts = async (query: any) => {
  const {
    page = 1,
    limit = 10,
    brandId,
    categoryId,
    subCategoryId,
    title,
  } = query
  const skip = (page - 1) * limit
  const take = limit

  const whereConditions: any = {}

  if (title) {
    whereConditions.title = {
      contains: title,
      mode: "insensitive",
    }
  }

  if (brandId) {
    whereConditions.brandId = brandId
  }

  if (categoryId) {
    whereConditions.categoryId = categoryId
  }

  if (subCategoryId) {
    whereConditions.subCategoryId = subCategoryId
  }

  const totalProducts = await prisma.product.count({
    where: whereConditions,
  })

  const products = await prisma.product.findMany({
    where: whereConditions,
    skip,
    take,
    include: {
      Brand: true,
      category: true,
      subcategory: true,
    },
  })

  return {
    meta: {
      totalProducts,
      page,
      limit,
    },
    data: products,
  }
}

const getProductById = async (id: string) => {
  return prisma.product.findUnique({
    where: {
      id,
    },
    include: {
      Brand: true,
      category: true,
      subcategory: true,
    },
  })
}

const updateProduct = async (id: string, payload: Partial<Product>) => {
  const existingProduct = await prisma.product.findUnique({
    where: {
      id,
    },
  })

  if (!existingProduct) {
    throw new ApiError(404, "Product not found")
  }

  const product = await prisma.product.update({
    where: {
      id,
    },
    data: payload,
  })

  return product
}

const deleteProduct = async (id: string) => {
  const existingProduct = await prisma.product.findUnique({
    where: {
      id,
    },
  })

  if (!existingProduct) {
    throw new ApiError(404, "Product not found")
  }

  await prisma.product.delete({
    where: {
      id,
    },
  })

  return "Product deleted successfully"
}

export const ProductServices = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
}
