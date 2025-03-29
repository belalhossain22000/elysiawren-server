import express from "express"
import { NewsletterControllers } from "./newsletter.controller"
import auth from "../../middlewares/auth"
import { UserRole } from "@prisma/client"

const router = express.Router()

router.post("/subscribe", NewsletterControllers.subscribeToNewsletter)
router.post("/unsubscribe", NewsletterControllers.unSubscribeFromNewsletter)
router.get(
  "/",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  NewsletterControllers.getAllSubscribers
)
router.get(
  "/:id",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  NewsletterControllers.getSubscriberById
)
router.patch(
  "/:id",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  NewsletterControllers.updateSubscriber
)
router.delete(
  "/:id",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  NewsletterControllers.deleteSubscriber
)

export const NewsletterRoutes = router
