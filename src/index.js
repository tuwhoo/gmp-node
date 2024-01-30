import http from "http";
import app from "./app.js";
import { PORT } from "./constants.js";

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
