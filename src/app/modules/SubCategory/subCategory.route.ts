import express from "express"
import auth from "../../middlewares/auth"
import { UserRole } from "@prisma/client"
import { SubCategoryControllers } from "./subCategory.controller"
const router = express.Router()

router.post(
  "/",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  SubCategoryControllers.createSubCategory
)

export const SubCategoryRoutes = router
