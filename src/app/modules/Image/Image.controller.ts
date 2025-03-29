// Image.controller: Module file for the Image.controller functionality.
import httpStatus from "http-status"
import catchAsync from "../../../shared/catchAsync"
import sendResponse from "../../../shared/sendResponse"
import { Request, Response } from "express"
import { ImageService } from "./Image.service"

// Controller for creating an image
const createImage = catchAsync(async (req: Request, res: Response) => {
  const result = await ImageService.createImage(req)
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: "Image Created successfully!",
    data: result,
  })
})

// Controller for creating images
const createImages = catchAsync(async (req: Request, res: Response) => {
  const result = await ImageService.createImages(req)
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: "Images Created successfully!",
    data: result,
  })
})

// Controller for getting an image by ID
const getImageById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const image = await ImageService.getImageById(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Image retrieved successfully",
    data: image,
  })
})

const getAllImages = catchAsync(async (req: Request, res: Response) => {
  const images = await ImageService.getAllImages(req.query)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Images retrieved successfully",
    data: images,
  })
})

// Controller for updating an image
const updateImage = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await ImageService.updateImage(id, req)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Image updated successfully!",
    data: result,
  })
})

// Controller for deleting an image
const deleteImage = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await ImageService.deleteImage(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Image deleted successfully!",
    data: result,
  })
})

export const ImageController = {
  createImage,
  getImageById,
  updateImage,
  deleteImage,
  createImages,
  getAllImages,
}
