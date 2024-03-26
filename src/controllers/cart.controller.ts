import { Response } from "express";
import { UserRequest } from "../middlewares/auth.middleware";
import CartService from "../services/cart.service";

class CartController {
  getProfileCart(req: UserRequest, res: Response) {
    const userId = req?.user?.id as string;
    const data = CartService.getProfileCart(userId);

    res.status(200).send({
      data,
      error: null,
    });
  }
}

export default new CartController();
