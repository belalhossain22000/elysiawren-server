import catchAsync from "../../../shared/catchAsync"
import sendResponse from "../../../shared/sendResponse"
import { ColorServices } from "./color.service"

const createColor = catchAsync(async (req, res) => {
  const { name, hexCode, productId } = req.body
  const result = await ColorServices.createColor(name, hexCode, productId)

  sendResponse(res, {
    statusCode: 201,
    message: "Color created successfully",
    data: result,
  })
})

const getAllColorsByProductId = catchAsync(async (req, res) => {
  const { productId } = req.params
  const result = await ColorServices.getAllColorsByProductId(productId)

  sendResponse(res, {
    statusCode: 200,
    message: "Colors fetched successfully",
    data: result,
  })
})

const getColorById = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await ColorServices.getColorById(id)

  sendResponse(res, {
    statusCode: 200,
    message: "Color fetched successfully",
    data: result,
  })
})

const updateColor = catchAsync(async (req, res) => {
  const { id } = req.params
  const { name, hexCode, productId } = req.body
  const result = await ColorServices.updateColor(id, name, hexCode, productId)

  sendResponse(res, {
    statusCode: 200,
    message: "Color updated successfully",
    data: result,
  })
})

const deleteColor = catchAsync(async (req, res) => {
  const { id } = req.params
  await ColorServices.deleteColor(id)

  sendResponse(res, {
    statusCode: 200,
    message: "Color deleted successfully",
    data: null,
  })
})

export const ColorControllers = {
  createColor,
  getAllColorsByProductId,
  getColorById,
  updateColor,
  deleteColor,
}
