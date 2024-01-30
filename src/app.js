import { ROUTES } from "./constants.js";
import {
  postUserHandler,
  getUsersHandler,
  getUserHandler,
  deleteUserHandler,
  getHobbiesHandler,
  patchHobbiesHandler,
  defaultHandler,
} from "./handlers.js";

export default async (req, res) => {
  switch (true) {
    case ROUTES.USER.test(req.url):
      if (req.method === "GET") return getUserHandler(req, res);
      if (req.method === "DELETE") return deleteUserHandler(req, res);
      break;
    case ROUTES.USERS.test(req.url):
      if (req.method === "POST") return await postUserHandler(req, res);
      if (req.method === "GET") return getUsersHandler(req, res);
      break;
    case ROUTES.HOBBIES.test(req.url):
      if (req.method === "GET") return getHobbiesHandler(req, res);
      if (req.method === "PATCH")
        return await patchHobbiesHandler(req, res);
      break;
    default:
      defaultHandler(req, res);
  }
};
