import express from "express"
import auth from "../../middlewares/auth"
import { CartControllers } from "./cart.controller"
import { UserRole } from "@prisma/client"

const router = express.Router()

router.post("/", auth(UserRole.USER), CartControllers.createCart)
router.get(
  "/",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  CartControllers.getAllCarts
)
router.get("/user", auth(), CartControllers.getCartByUserId)
router.get(
  "/:id",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  CartControllers.getCartById
)

router.delete(
  "/:id",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  CartControllers.deleteCart
)

export const CartRoutes = router
