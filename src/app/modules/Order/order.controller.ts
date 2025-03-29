import httpStatus from "http-status"
import catchAsync from "../../../shared/catchAsync"
import sendResponse from "../../../shared/sendResponse"
import ApiError from "../../../errors/ApiErrors"
import { OrderServices } from "./order.service"
const createOrder = catchAsync(async (req, res) => {
  const userId = req.user.id
  const {
    paymentMethodId,
    shippingAddress,
    zipCode,
    city,
    state,
    country,
    shippingType,
  } = req.body

  if (!userId) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Please provide all required fields"
    )
  }

  const result = await OrderServices.createOrder(
    userId,
    paymentMethodId,
    shippingAddress,
    zipCode,
    city,
    state,
    country,
    shippingType
  )
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: "Order Created successfully!",
    data: result,
  })
})

const getAllOrders = catchAsync(async (req, res) => {
  const userId = req.user.id
  const orders = await OrderServices.getAllOrders(req.query)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Orders fetched successfully!",
    data: orders,
  })
})

const getOrderById = catchAsync(async (req, res) => {
  const orderId = req.params.id
  const order = await OrderServices.getOrderById(orderId)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Order fetched successfully!",
    data: order,
  })
})

const getUserOrders = catchAsync(async (req, res) => {
  const userId = req.user.id
  const orders = await OrderServices.getUserOrders(userId, req.query)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Orders fetched successfully!",
    data: orders,
  })
})

const updateOrderStatus = catchAsync(async (req, res) => {
  const orderId = req.params.id
  const { status } = req.body
  const order = await OrderServices.updateOrderStatus(orderId, status)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Order status updated successfully!",
    data: order,
  })
})

const cancelOrder = catchAsync(async (req, res) => {
  const orderId = req.params.id
  const result = await OrderServices.cancelOrder(orderId)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Order cancelled successfully!",
    data: result,
  })
})

const requestToCancelOrder = catchAsync(async (req, res) => {
  const orderId = req.params.id
  const result = await OrderServices.requestToCancelOrder(orderId)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Request to cancel order sent successfully!",
    data: result,
  })
})

const reviewOrder = catchAsync(async (req, res) => {
  const userId = req.user.id

  const result = await OrderServices.reviewOrder(userId)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Order reviewed successfully!",
    data: result,
  })
})

export const OrderControllers = {
  createOrder,
  getAllOrders,
  getOrderById,
  getUserOrders,
  updateOrderStatus,
  cancelOrder,
  requestToCancelOrder,
}
