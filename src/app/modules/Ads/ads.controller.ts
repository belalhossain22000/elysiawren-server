import httpStatus from "http-status"
import catchAsync from "../../../shared/catchAsync"
import sendResponse from "../../../shared/sendResponse"
import { AdServices } from "./ads.service"

const createAd = catchAsync(async (req: any, res: any) => {
  const ad = await AdServices.createAd(req.body)
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: "Ad created successfully!",
    data: ad,
  })
})

const getAllAds = catchAsync(async (req: any, res: any) => {
  const ads = await AdServices.getAllAds()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Ads fetched successfully!",
    data: ads,
  })
})

const getAdById = catchAsync(async (req: any, res: any) => {
  const ad = await AdServices.getAdById(req.params.id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Ad fetched successfully!",
    data: ad,
  })
})

const updateAd = catchAsync(async (req: any, res: any) => {
  const ad = await AdServices.updateAd(req.params.id, req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Ad updated successfully!",
    data: ad,
  })
})

const deleteAd = catchAsync(async (req: any, res: any) => {
  const ad = await AdServices.deleteAd(req.params.id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Ad deleted successfully!",
    data: ad,
  })
})

export const AdControllers = {
  createAd,
  getAllAds,
  getAdById,
  updateAd,
  deleteAd,
}
