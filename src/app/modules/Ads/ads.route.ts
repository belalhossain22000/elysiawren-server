import express from "express"
import auth from "../../middlewares/auth"
import { UserRole } from "@prisma/client"
import { AdControllers } from "./ads.controller"

const router = express.Router()

router.post(
  "/",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  AdControllers.createAd
)
router.get("/", AdControllers.getAllAds)
router.get("/:id", AdControllers.getAdById)
router.patch(
  "/:id",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  AdControllers.updateAd
)
router.delete(
  "/:id",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  AdControllers.deleteAd
)

export const AdsRoutes = router
