import db from "../db/db";
import { UserEntity } from "../schemas/user.entity";

class UserRepository {
  getUser(userId: string): UserEntity | null {
    const user: UserEntity | null = db.getOne("users", userId) || null;

    return user;
  }
}

export default new UserRepository();
