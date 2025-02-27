import { User } from "../../domain/models/User";

export interface IUserRepository {
  createUser(username: string, password: string, role: "user" | "admin"): Promise<User>;
  findByUsername(username: string): Promise<User | null>;
}
