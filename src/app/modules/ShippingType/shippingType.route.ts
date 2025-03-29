import express from "express"
import auth from "../../middlewares/auth"
import { ShippingTypeControllers } from "./shippingType.controller"
import { UserRole } from "@prisma/client"

const router = express.Router()

router.post(
  "/",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  ShippingTypeControllers.createShippingType
)
router.get("/", ShippingTypeControllers.getAllShippingTypes)
router.get("/:id", ShippingTypeControllers.getShippingTypeById)
router.patch(
  "/:id",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  ShippingTypeControllers.updateShippingType
)
router.delete(
  "/:id",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  ShippingTypeControllers.deleteShippingType
)

export const ShippingTypeRoutes = router
