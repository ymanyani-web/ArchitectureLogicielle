import { User } from "../../domain/models/User";
import { IUserRepository } from "../../application/ports/IUserRepository";

export class UserRepository implements IUserRepository {
  async createUser(username: string, password: string, role: "user" | "admin") {
    return await User.create({ username, password, role });
  }

  async findByUsername(username: string) {
    return await User.findOne({ where: { username } });
  }
}
