import express from "express"
import auth from "../../middlewares/auth"
import { UserRole } from "@prisma/client"
import { CategoryControllers } from "./category.controller"

const router = express.Router()

router.post(
  "/",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  CategoryControllers.createCategory
)
router.get("/", CategoryControllers.getAllCategories)
router.get("/:id", CategoryControllers.getCategoryById)
router.put(
  "/:id",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  CategoryControllers.updateCategory
)
router.delete(
  "/:id",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  CategoryControllers.deleteCategory
)

export const CategoryRoutes = router
