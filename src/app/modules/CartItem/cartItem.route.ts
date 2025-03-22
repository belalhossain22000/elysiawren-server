import express from "express"
import auth from "../../middlewares/auth"
import { UserRole } from "@prisma/client"
import { cartItemControllers } from "./cartItem.controller"

const router = express.Router()

router.post("/", auth(UserRole.USER), cartItemControllers.createCartItem)
// router.get("/", cartItemControllers.getCartItems)
router.put("/:id", auth(UserRole.USER), cartItemControllers.updateCartItem)
router.delete("/:id", auth(UserRole.USER), cartItemControllers.deleteCartItem)

export const CartItemRoutes = router
