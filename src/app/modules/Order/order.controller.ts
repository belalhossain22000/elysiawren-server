import httpStatus from "http-status"
import catchAsync from "../../../shared/catchAsync"
import sendResponse from "../../../shared/sendResponse"
import ApiError from "../../../errors/ApiErrors"
import { OrderServices } from "./order.service"
const createOrder = catchAsync(async (req, res) => {
  const userId = req.user.id
  const { paymentMethodId, shippingAddress, zipCode, city, state, country } =
    req.body

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
    country
  )
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: "Order Created successfully!",
    data: result,
  })
})

export const OrderControllers = {
  createOrder,
}
