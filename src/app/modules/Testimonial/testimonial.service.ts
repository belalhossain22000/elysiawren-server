import { Testimonial } from "@prisma/client"
import prisma from "../../../shared/prisma"

const createTestimonial = async (
  name: string,
  image: string,
  category: string,
  review: string,
  rating: number
) => {
  const testimonial = await prisma.testimonial.create({
    data: {
      name,
      category,
      image,
      review,
      rating,
    },
  })
  return testimonial
}

const getAllTestimonials = async () => {
  const testimonials = await prisma.testimonial.findMany()
  return testimonials
}

const getTestimonialById = async (id: string) => {
  const testimonial = await prisma.testimonial.findUnique({
    where: {
      id,
    },
  })
  return testimonial
}

const updateTestimonial = async (id: string, payload: Partial<Testimonial>) => {
  const { name, category, image, review, rating } = payload

  const testimonial = await prisma.testimonial.update({
    where: {
      id,
    },
    data: {
      name,
      category,
      image,
      review,
      rating,
    },
  })
  return testimonial
}

const deleteTestimonial = async (id: string) => {
  const testimonial = await prisma.testimonial.delete({
    where: {
      id,
    },
  })
  return testimonial
}

export const TestimonialServices = {
  createTestimonial,
  getAllTestimonials,
  getTestimonialById,
  updateTestimonial,
  deleteTestimonial,
}
