import ApiError from "../../../errors/ApiErrors"
import sendResponse from "../../../shared/sendResponse"
import { TestimonialServices } from "./testimonial.service"

const createTestimonial = async (req: any, res: any) => {
  const { image, name, category, review, rating } = req.body

  if (!image || !name || !category || !review || !rating) {
    throw new ApiError(400, "Please provide all required fields")
  }

  const testimonial = await TestimonialServices.createTestimonial(
    image,
    name,
    category,
    review,
    rating
  )

  sendResponse(res, {
    statusCode: 201,
    data: testimonial,
    message: "Testimonial created successfully",
  })
}

const getAllTestimonials = async (req: any, res: any) => {
  const testimonials = await TestimonialServices.getAllTestimonials()

  sendResponse(res, {
    statusCode: 200,
    data: testimonials,
    message: "Testimonials fetched successfully",
  })
}

const getTestimonialById = async (req: any, res: any) => {
  const { id } = req.params

  const testimonial = await TestimonialServices.getTestimonialById(id)

  sendResponse(res, {
    statusCode: 200,
    data: testimonial,
    message: "Testimonial fetched successfully",
  })
}

const updateTestimonial = async (req: any, res: any) => {
  const { id } = req.params
  const { image, name, category, review, rating } = req.body

  const testimonial = await TestimonialServices.updateTestimonial(id, {
    image,
    name,
    category,
    review,
    rating,
  })

  sendResponse(res, {
    statusCode: 200,
    data: testimonial,
    message: "Testimonial updated successfully",
  })
}

const deleteTestimonial = async (req: any, res: any) => {
  const { id } = req.params

  const testimonial = await TestimonialServices.deleteTestimonial(id)

  sendResponse(res, {
    statusCode: 200,
    data: testimonial,
    message: "Testimonial deleted successfully",
  })
}

export const TestimonialControllers = {
  createTestimonial,
  getAllTestimonials,
  getTestimonialById,
  updateTestimonial,
  deleteTestimonial,
}
