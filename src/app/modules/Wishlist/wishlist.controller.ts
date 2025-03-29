import httpStatus from "http-status"
import catchAsync from "../../../shared/catchAsync"
import sendResponse from "../../../shared/sendResponse"
import ApiError from "../../../errors/ApiErrors"
import { WishlistServices } from "./wishlist.service"

const addToWishlist = catchAsync(async (req, res) => {
  const userId = req.user.id
  const { productId } = req.body

  if (!productId) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Please provide all required fields"
    )
  }

  const result = await WishlistServices.addToWishlist(userId, productId)
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: "Product added to wishlist successfully!",
    data: result,
  })
})

const getWishlistItems = catchAsync(async (req, res) => {
  const userId = req.user.id
  const result = await WishlistServices.getWishlistItems(userId)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Wishlist items fetched successfully",
    data: result,
  })
})

const removeWishlistItem = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await WishlistServices.removeWishlistItem(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Product removed from wishlist successfully!",
    data: result,
  })
})

export const WishlistControllers = {
  addToWishlist,
  getWishlistItems,
  removeWishlistItem,
}
