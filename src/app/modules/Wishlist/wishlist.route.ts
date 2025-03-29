import e from "express"
import express from "express"
import auth from "../../middlewares/auth"
import { UserRole } from "@prisma/client"
import { WishlistControllers } from "./wishlist.controller"

const router = express.Router()

router.post("/add", auth(UserRole.USER), WishlistControllers.addToWishlist)
router.get("/", auth(UserRole.USER), WishlistControllers.getWishlistItems)
router.delete(
  "/:id",
  auth(UserRole.USER),
  WishlistControllers.removeWishlistItem
)

export const WishlistRoutes = router
