import Stripe from "stripe"
import config from "../../config"

const stripe = new Stripe(config.stripe_secret_key, {
  apiVersion: "2024-06-20",
})

export { stripe }
