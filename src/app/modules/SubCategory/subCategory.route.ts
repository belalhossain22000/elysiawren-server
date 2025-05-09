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
router.get("/", SubCategoryControllers.getAllSubCategories)
router.get("/:id", SubCategoryControllers.getSubCategoryById)
router.put(
  "/:id",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  SubCategoryControllers.updateSubCategory
)
router.delete(
  "/:id",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  SubCategoryControllers.deleteSubCategory
)

export const SubCategoryRoutes = router
