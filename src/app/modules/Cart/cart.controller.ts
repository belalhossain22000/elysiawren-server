import httpStatus from "http-status"
import ApiError from "../../../errors/ApiErrors"
import catchAsync from "../../../shared/catchAsync"
import sendResponse from "../../../shared/sendResponse"
import { CartServices } from "./cart.service"

const createCart = catchAsync(async (req, res) => {
  const { userId } = req.body

  if (!userId) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Please provide all required fields"
    )
  }

  const result = await CartServices.createCart(userId)
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: "Cart Created successfully!",
    data: result,
  })
})

const getCartById = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await CartServices.getCartById(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Cart retrieved successfully",
    data: result,
  })
})

const getCartByUserId = catchAsync(async (req, res) => {
  const { userId } = req.params
  const result = await CartServices.getUserCart(userId)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Cart retrieved successfully",
    data: result,
  })
})

const getAllCarts = catchAsync(async (req, res) => {
  const result = await CartServices.getAllCarts()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Carts retrieved successfully",
    data: result,
  })
})

const deleteCart = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await CartServices.deleteCart(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Cart deleted successfully",
    data: result,
  })
})

export const CartControllers = {
  createCart,
  getCartById,
  getCartByUserId,
  getAllCarts,
  deleteCart,
}
