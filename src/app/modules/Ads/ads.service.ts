import { Ads } from "@prisma/client"
import prisma from "../../../shared/prisma"

const createAd = async (payload: Ads) => {
  const { title, description, image } = payload

  if (!title || !description || !image) {
    throw new Error("Please provide all required fields")
  }

  const ad = await prisma.ads.create({
    data: {
      title,
      description,
      image,
    },
  })
  return ad
}

const getAllAds = async () => {
  const ads = await prisma.ads.findMany()
  return ads
}

const getAdById = async (id: string) => {
  const ad = await prisma.ads.findUnique({
    where: {
      id,
    },
  })
  return ad
}

const updateAd = async (id: string, payload: Ads) => {
  const { title, description, image } = payload

  const ad = await prisma.ads.update({
    where: {
      id,
    },
    data: {
      title,
      description,
      image,
    },
  })
  return ad
}

const deleteAd = async (id: string) => {
  const ad = await prisma.ads.delete({
    where: {
      id,
    },
  })
  return ad
}

export const AdServices = {
  createAd,
  getAllAds,
  getAdById,
  updateAd,
  deleteAd,
}
