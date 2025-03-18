import catchAsync from "../../../shared/catchAsync"
import sendResponse from "../../../shared/sendResponse"
import { CategoryServices } from "./category.service"

const createCategory = catchAsync(async (req, res) => {
  const { name } = req.body
  const result = await CategoryServices.createCategory(name)

  sendResponse(res, {
    statusCode: 201,
    message: "Category created successfully",
    data: result,
  })
})

const getAllCategories = catchAsync(async (req, res) => {
  const result = await CategoryServices.getAllCategories(req.query)

  sendResponse(res, {
    statusCode: 200,
    message: "Categories fetched successfully",
    data: result,
  })
})

const getCategoryById = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await CategoryServices.getCategoryById(id)

  sendResponse(res, {
    statusCode: 200,
    message: "Category fetched successfully",
    data: result,
  })
})

const updateCategory = catchAsync(async (req, res) => {
  const { id } = req.params
  const { name } = req.body
  const result = await CategoryServices.updateCategory(id, name)

  sendResponse(res, {
    statusCode: 200,
    message: "Category updated successfully",
    data: result,
  })
})

const deleteCategory = catchAsync(async (req, res) => {
  const { id } = req.params
  await CategoryServices.deleteCategory(id)

  sendResponse(res, {
    statusCode: 200,
    message: "Category deleted successfully",
    data: null,
  })
})

export const CategoryControllers = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
}
