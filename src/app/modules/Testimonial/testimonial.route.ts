import express from "express"
import { TestimonialControllers } from "./testimonial.controller"
import auth from "../../middlewares/auth"
import { UserRole } from "@prisma/client"
const router = express.Router()

router.post(
  "/",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  TestimonialControllers.createTestimonial
)
router.get("/", TestimonialControllers.getAllTestimonials)
router.get("/:id", TestimonialControllers.getTestimonialById)
router.patch(
  "/:id",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  TestimonialControllers.updateTestimonial
)
router.delete(
  "/:id",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  TestimonialControllers.deleteTestimonial
)

export const TestimonialRoutes = router
