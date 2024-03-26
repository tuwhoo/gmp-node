import db from "../db/db";
import { CartEntity } from "../schemas/cart.entity";
import { ProductEntity } from "../schemas/product.entity";

class CartRepository {
  getCart(userId: string, isDeleted = false): CartEntity | null {
    const cart: CartEntity | null = db.findOne("carts", (cart: CartEntity) => cart.userId === userId && cart.isDeleted === isDeleted);

    return cart;
  }

  createCart(userId: string, items?: ProductEntity[]): CartEntity {
    const cart: CartEntity = db.create("carts", {
      userId,
      items,
      isDeleted: false,
    });

    return cart;
  }
}

export default new CartRepository();
