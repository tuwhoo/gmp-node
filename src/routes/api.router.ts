import express from "express";
import authMiddleware from "../middlewares/auth.middleware";
import CartController from "../controllers/cart.controller";

const apiRouter = express.Router();

apiRouter.get("/profile/cart", authMiddleware, CartController.getProfileCart);

export default apiRouter;
