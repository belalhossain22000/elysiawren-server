import { Product } from "@prisma/client"
import ApiError from "../../../errors/ApiErrors"
import prisma from "../../../shared/prisma"
import { ImageService } from "../Image/Image.service"

const createProduct = async (req: Product) => {
  const {
    title,
    brandId,
    categoryId,
    subCategoryId,
    price,
    quantity,
    description,
    sizes,
  } = req

  // console.log("req", req)

  if (
    !title ||
    !brandId ||
    !categoryId ||
    !subCategoryId ||
    !price ||
    !quantity ||
    !description ||
    !sizes
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
  console.log({ existingBrand }, { existingCategory }, { existingSubCategory })

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
      sizes,
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
    isAvailable = "true",
  } = query
  const skip = (page - 1) * limit
  const take = limit

  // console.log(typeof isAvailable)

  const whereConditions: any = {}

  if (title) {
    whereConditions.title = {
      contains: title,
      mode: "insensitive",
    }
  }

  if (isAvailable === "true") {
    whereConditions.quantity = {
      gt: 0,
    }
  } else {
    whereConditions.quantity = {
      lte: 0,
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
      Image: true,
      Review: true,
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
  console.log("payload", payload)
  const existingProduct = await prisma.product.findUnique({
    where: {
      id,
    },
  })

  if (!existingProduct) {
    throw new ApiError(404, "Product not found")
  }

  if (payload.brandId) {
    const existingBrand = await prisma.brand.findUnique({
      where: {
        id: payload.brandId,
      },
    })

    if (!existingBrand) {
      throw new ApiError(400, "Brand not found")
    }
  }

  if (payload.categoryId) {
    const existingCategory = await prisma.category.findUnique({
      where: {
        id: payload.categoryId,
      },
    })

    if (!existingCategory) {
      throw new ApiError(400, "Category not found")
    }
  }

  if (payload.subCategoryId) {
    const existingSubCategory = await prisma.subcategory.findUnique({
      where: {
        id: payload.subCategoryId,
      },
    })

    if (!existingSubCategory) {
      throw new ApiError(400, "Sub category not found")
    }
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

  await prisma.$transaction(async (tsx) => {
    await tsx.image.deleteMany({
      where: {
        productId: id,
      },
    })

    await tsx.review.deleteMany({
      where: {
        productId: id,
      },
    })

    await tsx.cartItem.deleteMany({
      where: {
        productId: id,
      },
    })

    await tsx.orderItem.deleteMany({
      where: {
        productId: id,
      },
    })

    await tsx.wishlistItem.deleteMany({
      where: {
        productId: id,
      },
    })

    await tsx.product.delete({
      where: {
        id,
      },
    })
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
