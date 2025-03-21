import httpStatus from "http-status"
import catchAsync from "../../../shared/catchAsync"
import sendResponse from "../../../shared/sendResponse"
import { ProductServices } from "./product.service"

const createProduct = catchAsync(async (req: any, res: any) => {
  const result = await ProductServices.createProduct(req.body)

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: "Product created successfully",
    data: result,
  })
})

const getAllProducts = catchAsync(async (req: any, res: any) => {
  const result = await ProductServices.getAllProducts(req.query)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Products fetched successfully",
    data: result,
  })
})

const getProductById = catchAsync(async (req: any, res: any) => {
  const { id } = req.params
  const result = await ProductServices.getProductById(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Product fetched successfully",
    data: result,
  })
})

const updateProduct = catchAsync(async (req: any, res: any) => {
  const { id } = req.params
  const result = await ProductServices.updateProduct(id, req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Product updated successfully",
    data: result,
  })
})

const deleteProduct = catchAsync(async (req: any, res: any) => {
  const result = await ProductServices.deleteProduct(req.params.id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Product deleted successfully",
    data: result,
  })
})

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
}
