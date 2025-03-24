import httpStatus from "http-status"
import catchAsync from "../../../shared/catchAsync"
import sendResponse from "../../../shared/sendResponse"
import { ReviewServices } from "./review.service"

const createReview = catchAsync(async (req, res) => {
  const userId = req.user.id
  const { productId, rating, content } = req.body
  const review = await ReviewServices.createReview(
    userId,
    productId,
    rating,
    content
  )
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: "Review created successfully!",
    data: review,
  })
})

const getAllReviews = catchAsync(async (req, res) => {
  const reviews = await ReviewServices.getAllReviews(req.query)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Reviews fetched successfully!",
    data: reviews,
  })
})

const getReviewById = catchAsync(async (req, res) => {
  const reviewId = req.params.id
  const review = await ReviewServices.getReviewById(reviewId)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Review fetched successfully!",
    data: review,
  })
})

const updateReview = catchAsync(async (req, res) => {
  const reviewId = req.params.id
  const review = await ReviewServices.updateReview(reviewId, req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Review updated successfully!",
    data: review,
  })
})

const deleteReview = catchAsync(async (req, res) => {
  const reviewId = req.params.id
  const userId = req.user.id
  await ReviewServices.deleteReview(reviewId, userId)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Review deleted successfully!",
    data: null,
  })
})

export const ReviewControllers = {
  createReview,
  getAllReviews,
  getReviewById,
  updateReview,
  deleteReview,
}
