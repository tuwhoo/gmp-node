import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import db from "./db/db";
import predefinedData from "./db/predefinedData";

dotenv.config();
db.initialize(predefinedData);

const app: Express = express();
const port = process.env.PORT || 8000;

app.get("/", (req: Request, res: Response) => {
  res.send("Express Server");
});

app.get("/api/db", (req: Request, res: Response) => {
  res.status(200);
  res.setHeader("Content-Type", "application/json");

  const data = {
    users: db.getAll('users'),
    carts: db.getAll('carts'),
    orders: db.getAll('orders'),
    products: db.getAll('products'),
  };

  const response = JSON.stringify(data);
  res.send(response);
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  res.status(500);
  res.setHeader("Content-Type", "application/json");
  res.send({ message: err.message, ok: false });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
