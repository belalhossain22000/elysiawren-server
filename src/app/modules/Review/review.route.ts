import express from "express"
import { ReviewControllers } from "./review.controller"
import auth from "../../middlewares/auth"
import { UserRole } from "@prisma/client"

const router = express.Router()
router.post("/", auth(UserRole.USER), ReviewControllers.createReview)
router.get(
  "/",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.USER),
  ReviewControllers.getAllReviews
)
router.get(
  "/:id",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.USER),
  ReviewControllers.getReviewById
)
router.patch(
  "/:id",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.USER),
  ReviewControllers.updateReview
)
router.delete(
  "/:id",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN, UserRole.USER),
  ReviewControllers.deleteReview
)

export const ReviewRoutes = router
