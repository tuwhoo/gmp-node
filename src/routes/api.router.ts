import express from "express";
import CartController from "../controllers/cart.controller";
import ProductController from "../controllers/product.controller";

const apiRouter = express.Router();

apiRouter.get("/profile/cart", CartController.getProfileCart);
apiRouter.delete("/profile/cart", CartController.deleteProfileCart);

apiRouter.get("/products", ProductController.getAllProducts);
apiRouter.get("/products/:productId", ProductController.getProduct);

export default apiRouter;
