import { UserRole } from "@prisma/client"
import express from "express"
import auth from "../../middlewares/auth"
import { OrderControllers } from "./order.controller"

const router = express.Router()

router.post("/", auth(UserRole.USER), OrderControllers.createOrder)

export const OrderRoutes = router
