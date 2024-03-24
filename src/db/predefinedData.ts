import { cart } from "../schemas/cart.entity";
import { order } from "../schemas/order.entity";
import { product } from "../schemas/product.entity";
import { user } from "../schemas/user.entity";

export default {
  users: [user],
  carts: [cart],
  orders: [order],
  products: [product],
};
