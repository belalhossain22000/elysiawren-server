import { UserRole } from "@prisma/client"
import express from "express"
import auth from "../../middlewares/auth"
import { OrderControllers } from "./order.controller"

const router = express.Router()

router.post("/", auth(UserRole.USER), OrderControllers.createOrder)
router.get(
  "/",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  OrderControllers.getAllOrders
)
router.get("/user", auth(UserRole.USER), OrderControllers.getUserOrders)
router.get(
  "/:id",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  OrderControllers.getOrderById
)
router.patch(
  "/:id/status",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  OrderControllers.updateOrderStatus
)
router.patch(
  "/:id/cancel",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  OrderControllers.cancelOrder
)
router.patch(
  "/:id/request-cancel",
  auth(UserRole.USER),
  OrderControllers.requestToCancelOrder
)

export const OrderRoutes = router
