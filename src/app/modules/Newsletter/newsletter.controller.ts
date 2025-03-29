import { send } from "process"
import catchAsync from "../../../shared/catchAsync"
import { NewsletterServices } from "./newsletter.service"
import httpStatus from "http-status"
import sendResponse from "../../../shared/sendResponse"

const subscribeToNewsletter = catchAsync(async (req, res) => {
  const { email } = req.body
  const subscriber = await NewsletterServices.subscribeToNewsletter(email)

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: "Subscribed to newsletter successfully!",
    data: subscriber,
  })
})

const unSubscribeFromNewsletter = catchAsync(async (req, res) => {
  const { email } = req.body
  const subscriber = await NewsletterServices.unSubscribeFromNewsletter(email)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Unsubscribed from newsletter successfully!",
    data: subscriber,
  })
})

const getAllSubscribers = catchAsync(async (req, res) => {
  const subscribers = await NewsletterServices.getAllSubscribers(req.query)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Subscribers fetched successfully!",
    data: subscribers,
  })
})

const getSubscriberById = catchAsync(async (req, res) => {
  const subscriber = await NewsletterServices.getSubscriberById(req.params.id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Subscriber fetched successfully!",
    data: subscriber,
  })
})

const updateSubscriber = catchAsync(async (req, res) => {
  const { email } = req.body
  const subscriber = await NewsletterServices.updateSubscriber(
    req.params.id,
    email
  )
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Subscriber updated successfully!",
    data: subscriber,
  })
})

const deleteSubscriber = catchAsync(async (req, res) => {
  const subscriber = await NewsletterServices.deleteSubscriber(req.params.id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: "Subscriber deleted successfully!",
    data: subscriber,
  })
})

export const NewsletterControllers = {
  subscribeToNewsletter,
  unSubscribeFromNewsletter,
  getAllSubscribers,
  getSubscriberById,
  updateSubscriber,
  deleteSubscriber,
}
