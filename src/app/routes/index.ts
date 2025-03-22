import express from "express"
import { userRoutes } from "../modules/User/user.route"
import { AuthRoutes } from "../modules/Auth/auth.routes"
import { CategoryRoutes } from "../modules/Category/category.route"
import { SubCategoryRoutes } from "../modules/SubCategory/subCategory.route"
import { BrandRoutes } from "../modules/Brand/brand.route"
import { ProductRoutes } from "../modules/Product/product.route"
import { ImageRoutes } from "../modules/Image/Image.routes"
import { CartRoutes } from "../modules/Cart/cart.route"

const router = express.Router()

const moduleRoutes = [
  {
    path: "/users",
    route: userRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/categories",
    route: CategoryRoutes,
  },
  {
    path: "/sub-categories",
    route: SubCategoryRoutes,
  },
  {
    path: "/brands",
    route: BrandRoutes,
  },
  {
    path: "/products",
    route: ProductRoutes,
  },
  {
    path: "/uploads",
    route: ImageRoutes,
  },
  {
    path: "/cart",
    route: CartRoutes,
  },
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router
