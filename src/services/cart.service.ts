import CartRepository from "../repositories/cart.repository";
import { CartEntity } from "../schemas/cart.entity";

class CartService {
  getCartTotal(cart: CartEntity): number {
    return cart.items.reduce((acc, item) => {
      acc += item.product.price * item.count;
      return acc;
    }, 0);
  }

  getProfileCart(userId: string) {
    let cart = CartRepository.getCart(userId);
    if (!cart) cart = CartRepository.createCart(userId, []);

    return {
      cart: {
        id: cart.id,
        items: cart.items,
      },
      total: this.getCartTotal(cart),
    };
  }

  deleteProfileCart(userId: string) {
    let cart = CartRepository.getCart(userId);
    if (!cart) return true;

    const success = CartRepository.markCartAsDeleted(cart.id);

    return success;
  }
}

export default new CartService();
