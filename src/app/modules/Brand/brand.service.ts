import ApiError from "../../../errors/ApiErrors"
import prisma from "../../../shared/prisma"

const createBrand = async (name: string) => {
  const existingBrand = await prisma.brand.findUnique({
    where: {
      name,
    },
  })

  if (existingBrand) {
    throw new ApiError(400, "Brand already exists")
  }
  return prisma.brand.create({
    data: {
      name,
    },
  })
}

const getAllBrands = async (query: any) => {
  const { page = 1, limit = 10 } = query
  const skip = (page - 1) * limit
  const take = limit

  const whereConditions = {}

  const totalBrands = await prisma.brand.count({
    where: whereConditions,
  })

  const brands = await prisma.brand.findMany({
    where: whereConditions,
    skip,
    take,
  })

  return {
    meta: {
      totalBrands,
      page,
      limit,
    },
    data: brands,
  }
}

const getBrandById = async (id: string) => {
  return prisma.brand.findUnique({
    where: {
      id,
    },
  })
}

const updateBrand = async (id: string, name: string) => {
  const existingBrand = await prisma.brand.findUnique({
    where: {
      id,
    },
  })

  if (!existingBrand) {
    throw new ApiError(404, "Brand not found")
  }

  const existingBrandName = await prisma.brand.findUnique({
    where: {
      name,
    },
  })

  if (existingBrandName) {
    throw new ApiError(400, "Brand already exists")
  }

  return prisma.brand.update({
    where: {
      id,
    },
    data: {
      name,
    },
  })
}

const deleteBrand = async (id: string) => {
  const existingBrand = await prisma.brand.findUnique({
    where: {
      id,
    },
  })

  if (!existingBrand) {
    throw new ApiError(404, "Brand not found")
  }

  return prisma.brand.delete({
    where: {
      id,
    },
  })
}

export const BrandServices = {
  createBrand,
  getAllBrands,
  getBrandById,
  updateBrand,
  deleteBrand,
}
