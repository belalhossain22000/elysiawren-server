import express from "express"
import auth from "../../middlewares/auth"
import { UserRole } from "@prisma/client"
import { ProductControllers } from "./product.controller"

const router = express.Router()

router.post(
  "/",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  ProductControllers.createProduct
)
router.get("/", ProductControllers.getAllProducts)
router.get("/:id", ProductControllers.getProductById)
router.put(
  "/:id",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  ProductControllers.updateProduct
)
router.delete(
  "/:id",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  ProductControllers.deleteProduct
)

export const ProductRoutes = router
