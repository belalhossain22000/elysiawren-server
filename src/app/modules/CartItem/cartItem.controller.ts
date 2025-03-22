import httpStatus from "http-status"
import catchAsync from "../../../shared/catchAsync"
import sendResponse from "../../../shared/sendResponse"
import ApiError from "../../../errors/ApiErrors"
import { cartItemServices } from "./cartItem.service"

const createCartItem = catchAsync(async (req, res) => {
  const userId = req.user.id
  const { cartId, productId, quantity, price } = req.body

  if (!cartId || !productId || !quantity || !price) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Please provide all required fields"
    )
  }
  const result = await cartItemServices.createCartItem(
    userId,
    productId,
    quantity,
    price
  )
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: "CartItem Created successfully!",
    data: result,
  })
})

const getCartItems = catchAsync(async (req, res) => {
  const { cartId } = req.params
  const result = await cartItemServices.getCartItems(cartId)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "CartItems retrieved successfully",
    data: result,
  })
})

const updateCartItem = catchAsync(async (req, res) => {
  const result = await cartItemServices.updateCartItem(req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "CartItem updated successfully!",
    data: result,
  })
})

const deleteCartItem = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await cartItemServices.deleteCartItem(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "CartItem deleted successfully!",
    data: result,
  })
})

export const cartItemControllers = {
  createCartItem,
  getCartItems,
  updateCartItem,
  deleteCartItem,
}
