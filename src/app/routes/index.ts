import express from "express"
import { userRoutes } from "../modules/User/user.route"
import { AuthRoutes } from "../modules/Auth/auth.routes"
import { CategoryRoutes } from "../modules/Category/category.route"
import { SubCategoryRoutes } from "../modules/SubCategory/subCategory.route"
import { BrandRoutes } from "../modules/Brand/brand.route"
import { ProductRoutes } from "../modules/Product/product.route"
import { ImageRoutes } from "../modules/Image/Image.routes"
import { CartRoutes } from "../modules/Cart/cart.route"
import { CartItemRoutes } from "../modules/CartItem/cartItem.route"
import { OrderRoutes } from "../modules/Order/order.route"
import { ReviewRoutes } from "../modules/Review/review.route"
import { ShippingTypeRoutes } from "../modules/ShippingType/shippingType.route"
import { AdsRoutes } from "../modules/Ads/ads.route"
import { NewsletterRoutes } from "../modules/Newsletter/newsletter.route"
import { BannerRoutes } from "../modules/Banner/banner.route"
import { TestimonialRoutes } from "../modules/Testimonial/testimonial.route"
import { WishlistRoutes } from "../modules/Wishlist/wishlist.route"

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
  {
    path: "/cart-items",
    route: CartItemRoutes,
  },
  {
    path: "/orders",
    route: OrderRoutes,
  },
  {
    path: "/reviews",
    route: ReviewRoutes,
  },
  {
    path: "/shipping-types",
    route: ShippingTypeRoutes,
  },
  {
    path: "/shipping-types",
    route: ShippingTypeRoutes,
  },
  {
    path: "/ads",
    route: AdsRoutes,
  },
  {
    path: "/newsletters",
    route: NewsletterRoutes,
  },
  {
    path: "/banner",
    route: BannerRoutes,
  },
  {
    path: "/testimonials",
    route: TestimonialRoutes,
  },
  {
    path: "/wishlist",
    route: WishlistRoutes,
  },
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router
