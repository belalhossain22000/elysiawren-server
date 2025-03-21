import express from "express"
import auth from "../../middlewares/auth"
import { UserRole } from "@prisma/client"
import { BrandControllers } from "./brand.controller"

const router = express.Router()

router.post(
  "/",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  BrandControllers.createBrand
)
router.get("/", BrandControllers.getAllBrands)
router.get("/:id", BrandControllers.getBrandById)
router.put(
  "/:id",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  BrandControllers.updateBrand
)
router.delete(
  "/:id",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  BrandControllers.deleteBrand
)

export const BrandRoutes = router
