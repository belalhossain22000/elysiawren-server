import { Review } from "@prisma/client"
import prisma from "../../../shared/prisma"
import ApiError from "../../../errors/ApiErrors"

const createReview = async (
  userId: string,
  productId: string,
  rating: number,
  content: string
) => {
  const newReview = await prisma.review.create({
    data: {
      userId,
      productId,
      rating,
      content,
    },
  })

  return newReview
}

const getAllReviews = async (query: any) => {
  const { page = 1, limit = 10, userId, productId } = query
  const skip = (Number(page) - 1) * Number(limit)
  const take = Number(limit)

  const whereConditions: any = {}

  if (userId) {
    whereConditions["userId"] = userId
  }

  if (productId) {
    whereConditions["productId"] = productId
  }

  const totalReviews = await prisma.review.count({
    where: whereConditions,
  })

  const reviews = await prisma.review.findMany({
    skip,
    take,
    where: whereConditions,
    include: {
      user: true,
      product: true,
    },
  })

  return {
    meta: {
      totalReviews,
      page: parseInt(page),
      limit: parseInt(limit),
    },
    data: reviews,
  }
}

const getReviewById = async (reviewId: string) => {
  const review = await prisma.review.findUnique({
    where: {
      id: reviewId,
    },
    include: {
      user: true,
      product: true,
    },
  })

  return review
}

const updateReview = async (reviewId: string, data: Partial<Review>) => {
  const updatedReview = await prisma.review.update({
    where: {
      id: reviewId,
    },
    data,
  })

  return updatedReview
}

const deleteReview = async (reviewId: string, userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  })

  if (!user) {
    throw new ApiError(404, "Review not found")
  }

  const review = await prisma.review.findUnique({
    where: {
      id: reviewId,
    },
  })

  if (user.role !== "ADMIN" && user.role !== "SUPER_ADMIN") {
    if (review?.userId !== userId) {
      throw new ApiError(403, "You are not authorized to delete this review")
    }
  }
  const deletedReview = await prisma.review.delete({
    where: {
      id: reviewId,
    },
  })

  return deletedReview
}

export const ReviewServices = {
  createReview,
  getAllReviews,
  getReviewById,
  updateReview,
  deleteReview,
}
