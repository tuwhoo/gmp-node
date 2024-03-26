import { cart } from "../schemas/cart.entity";
import { order } from "../schemas/order.entity";
import { product } from "../schemas/product.entity";
import { user } from "../schemas/user.entity";

const emptyUser = {
  id: "0c5b00fb-0639-4420-816e-cee1492c7869",
};

export default {
  users: [user, emptyUser],
  carts: [cart],
  orders: [order],
  products: [product],
};
