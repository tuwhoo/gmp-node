import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8000;

app.get("/", (req: Request, res: Response) => {
  console.log("'/' request");
  res.send("Express Server");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
