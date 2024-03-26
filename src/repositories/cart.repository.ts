import db from "../db/db";
import { CartEntity } from "../schemas/cart.entity";
import { ProductEntity } from "../schemas/product.entity";
import ProductRepository from "./product.repository";

class CartRepository {
  getCart(userId: string, isDeleted = false): CartEntity | null {
    const cart = db.findOne("carts", (cart: CartEntity) => {
      return cart.userId === userId && cart.isDeleted === isDeleted;
    });

    if (cart?.items?.length > 0) {
      cart.items = cart.items.reduce((items: any, item: any) => {
        const productId = item.product.id;
        const product = ProductRepository.getProduct(productId);

        if (product) {
          items.push({
            ...item,
            product,
          });
        }

        return items;
      }, []);
    }

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

  markCartAsDeleted(cartId: string) {
    const cart = db.updateOne('carts', cartId, { isDeleted: true });

    return cart.isDeleted;
  }
}

export default new CartRepository();
