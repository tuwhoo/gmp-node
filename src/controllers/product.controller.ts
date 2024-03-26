import { Response } from "express";
import { UserRequest } from "../middlewares/auth.middleware";
import ProductService from "../services/product.service";

class ProductController {
  getProduct(req: UserRequest, res: Response) {
    const productId = req.params.productId;

    if (productId === ":productId") {
      throw Error("Wrong :productId param");
    }

    const product = ProductService.getProductId(productId);

    if (!product) {
      res.status(404).send({
        data: null,
        error: {
          message: "No product with such id",
        },
      });

      return;
    }

    res.status(200).send({
      data: product,
      error: null,
    });
  }

  getAllProducts(req: UserRequest, res: Response) {
    const data = ProductService.getAllProducts();

    res.status(200).send({
      data,
      error: null,
    });
  }
}

export default new ProductController();
