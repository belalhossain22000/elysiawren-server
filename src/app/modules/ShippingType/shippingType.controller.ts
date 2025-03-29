import httpStatus from "http-status"
import catchAsync from "../../../shared/catchAsync"
import sendResponse from "../../../shared/sendResponse"
import { ShippingTypeServices } from "./shippingType.service"

const createShippingType = catchAsync(async (req: any, res: any) => {
  const shippingType = await ShippingTypeServices.createShippingType(req.body)
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: "Shipping type created successfully!",
    data: shippingType,
  })
})

const getAllShippingTypes = catchAsync(async (req: any, res: any) => {
  const shippingTypes = await ShippingTypeServices.getAllShippingTypes()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Shipping types fetched successfully!",
    data: shippingTypes,
  })
})

const getShippingTypeById = catchAsync(async (req: any, res: any) => {
  const shippingType = await ShippingTypeServices.getShippingTypeById(
    req.params.id
  )
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Shipping type fetched successfully!",
    data: shippingType,
  })
})

const updateShippingType = catchAsync(async (req: any, res: any) => {
  const shippingType = await ShippingTypeServices.updateShippingType(
    req.params.id,
    req.body
  )
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Shipping type updated successfully!",
    data: shippingType,
  })
})

const deleteShippingType = catchAsync(async (req: any, res: any) => {
  const shippingType = await ShippingTypeServices.deleteShippingType(
    req.params.id
  )
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Shipping type deleted successfully!",
    data: shippingType,
  })
})

export const ShippingTypeControllers = {
  createShippingType,
  getAllShippingTypes,
  getShippingTypeById,
  updateShippingType,
  deleteShippingType,
}
