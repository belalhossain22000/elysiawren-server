import httpStatus from "http-status"
import catchAsync from "../../../shared/catchAsync"
import sendResponse from "../../../shared/sendResponse"
import { BannerServices } from "./banner.service"

const createBanner = catchAsync(async (req, res) => {
  const banner = await BannerServices.createBanner(req.body)
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: "Banner created successfully!",
    data: banner,
  })
})

const getAllBanners = catchAsync(async (req, res) => {
  const banners = await BannerServices.getAllBanners()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Banners fetched successfully!",
    data: banners,
  })
})

const getBannerById = catchAsync(async (req, res) => {
  const banner = await BannerServices.getBannerById(req.params.id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Banner fetched successfully!",
    data: banner,
  })
})

const updateBanner = catchAsync(async (req, res) => {
  const banner = await BannerServices.updateBanner(req.params.id, req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Banner updated successfully!",
    data: banner,
  })
})

const deleteBanner = catchAsync(async (req, res) => {
  const banner = await BannerServices.deleteBanner(req.params.id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Banner deleted successfully!",
    data: banner,
  })
})

export const BannerControllers = {
  createBanner,
  getAllBanners,
  getBannerById,
  updateBanner,
  deleteBanner,
}
