import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import db from "./db/db";
import authMiddleware from "./middlewares/auth.middleware";
import predefinedData from "./db/predefinedData";

import apiRouter from "./routes/api.router";

dotenv.config();
db.initialize(predefinedData);

const app: Express = express();
const port = process.env.PORT || 8000;

app.get("/", (req: Request, res: Response) => {
  res.send("Express Server");
});

app.use("/api", authMiddleware, apiRouter);

app.get("/db", (req: Request, res: Response) => {
  const data = {
    users: db.getAll("users"),
    carts: db.getAll("carts"),
    orders: db.getAll("orders"),
    products: db.getAll("products"),
  };

  res.status(200).json(data);
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).send({
    data: null,
    error: {
      message: "Internal Server error",
    },
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
