import { NextFunction, Request, Response } from "express";
import UserService from "../services/user.service";
import { UserEntity } from "../schemas/user.entity";

export interface UserRequest extends Request {
  user?: UserEntity;
}

// authorization hack
const USER_ID_MAP: any = {
  admin: "0fe36d16-49bc-4aab-a227-f84df899a6cb", 
  empty: "0c5b00fb-0639-4420-816e-cee1492c7869"
};

const authMiddleware = (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  const userId = req?.headers?.["x-user-id"] as string;

  if (!userId) {
    res.status(401).send({
      data: null,
      error: { message: "User is not authorized" },
    });

    return;
  }

  if (userId?.split(',').length > 1) {
    throw Error('Wrong credentials format');
  }

  const user = UserService.getUser(USER_ID_MAP[userId] || userId);

  if (!user) {
    res.status(403).send({
      data: null,
      error: { message: "You must be authorized user" },
    });

    return;
  }

  req.user = user;

  next();
};

export default authMiddleware;
