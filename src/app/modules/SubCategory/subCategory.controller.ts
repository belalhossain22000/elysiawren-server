import catchAsync from "../../../shared/catchAsync"
import sendResponse from "../../../shared/sendResponse"
import { SubCategoryServices } from "./subCategory.service"

const createSubCategory = catchAsync(async (req, res) => {
  const { name, categoryId } = req.body
  const result = await SubCategoryServices.createSubCategory(name, categoryId)

  sendResponse(res, {
    statusCode: 201,
    message: "SubCategory created successfully",
    data: result,
  })
})

const getAllSubCategories = catchAsync(async (req, res) => {
  const result = await SubCategoryServices.getAllSubCategories(req.query)

  sendResponse(res, {
    statusCode: 200,
    message: "SubCategories fetched successfully",
    data: result,
  })
})

const getSubCategoryById = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await SubCategoryServices.getSubCategoryById(id)

  sendResponse(res, {
    statusCode: 200,
    message: "SubCategory fetched successfully",
    data: result,
  })
})

const updateSubCategory = catchAsync(async (req, res) => {
  const { id } = req.params
  const { name, categoryId } = req.body
  const result = await SubCategoryServices.updateSubCategory(
    id,
    name,
    categoryId
  )

  sendResponse(res, {
    statusCode: 200,
    message: "SubCategory updated successfully",
    data: result,
  })
})

const deleteSubCategory = catchAsync(async (req, res) => {
  const { id } = req.params
  await SubCategoryServices.deleteSubCategory(id)

  sendResponse(res, {
    statusCode: 200,
    message: "SubCategory deleted successfully",
    data: null,
  })
})

export const SubCategoryControllers = {
  createSubCategory,
  getAllSubCategories,
  getSubCategoryById,
  updateSubCategory,
  deleteSubCategory,
}
