import catchAsync from "../../../shared/catchAsync"
import sendResponse from "../../../shared/sendResponse"
import { BrandServices } from "./brand.service"

const createBrand = catchAsync(async (req, res) => {
  const { name } = req.body
  const result = await BrandServices.createBrand(name)

  sendResponse(res, {
    statusCode: 201,
    message: "Brand created successfully",
    data: result,
  })
})

const getAllBrands = catchAsync(async (req, res) => {
  const result = await BrandServices.getAllBrands(req.query)

  sendResponse(res, {
    statusCode: 200,
    message: "Brands fetched successfully",
    data: result,
  })
})

const getBrandById = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await BrandServices.getBrandById(id)

  sendResponse(res, {
    statusCode: 200,
    message: "Brand fetched successfully",
    data: result,
  })
})

const updateBrand = catchAsync(async (req, res) => {
  const { id } = req.params
  const { name } = req.body
  const result = await BrandServices.updateBrand(id, name)

  sendResponse(res, {
    statusCode: 200,
    message: "Brand updated successfully",
    data: result,
  })
})

const deleteBrand = catchAsync(async (req, res) => {
  const { id } = req.params
  await BrandServices.deleteBrand(id)

  sendResponse(res, {
    statusCode: 200,
    message: "Brand deleted successfully",
    data: null,
  })
})

export const BrandControllers = {
  createBrand,
  getAllBrands,
  getBrandById,
  updateBrand,
  deleteBrand,
}
