import UserRepository from "../repositories/user.repository";

class UserService {
  getUser(userId: string) {
    return UserRepository.getUser(userId);
  }
}

export default new UserService();
