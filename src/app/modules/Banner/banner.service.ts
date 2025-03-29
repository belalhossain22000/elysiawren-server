import { Banner } from "@prisma/client"
import prisma from "../../../shared/prisma"

const createBanner = async (payload: Banner) => {
  const { title, description, image, buttonText } = payload

  if (!title || !description || !image) {
    throw new Error("Please provide all required fields")
  }

  const banner = await prisma.banner.create({
    data: {
      title,
      description,
      image,
      buttonText,
    },
  })
  return banner
}

const getAllBanners = async () => {
  const banners = await prisma.banner.findMany()
  return banners
}

const getBannerById = async (id: string) => {
  const banner = await prisma.banner.findUnique({
    where: {
      id,
    },
  })
  return banner
}

const updateBanner = async (id: string, payload: Banner) => {
  const { title, description, image, buttonText } = payload

  const banner = await prisma.banner.update({
    where: {
      id,
    },
    data: {
      title,
      description,
      image,
      buttonText,
    },
  })
  return banner
}

const deleteBanner = async (id: string) => {
  const banner = await prisma.banner.delete({
    where: {
      id,
    },
  })
  return banner
}

export const BannerServices = {
  createBanner,
  getAllBanners,
  getBannerById,
  updateBanner,
  deleteBanner,
}
