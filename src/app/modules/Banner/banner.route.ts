import express from "express"
import { BannerControllers } from "./banner.controller"
import auth from "../../middlewares/auth"
import { UserRole } from "@prisma/client"

const router = express.Router()

router.post(
  "/",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  BannerControllers.createBanner
)
router.get("/", BannerControllers.getAllBanners)
router.get("/:id", BannerControllers.getBannerById)
router.patch(
  "/:id",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  BannerControllers.updateBanner
)
router.delete(
  "/:id",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  BannerControllers.deleteBanner
)

export const BannerRoutes = router
