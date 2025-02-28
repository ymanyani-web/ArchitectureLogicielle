import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { IUserRepository } from "../ports/IUserRepository";
import { User } from "../../domain/models/User";

const JWT_SECRET = process.env.JWT_SECRET || "mysecretkey"; // Use .env in production

export class AuthService {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async register(username: string, password: string, role: "user" | "admin"): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.userRepository.createUser(username, hashedPassword, role);
  }

  async login(username: string, password: string): Promise<{ token: string; user: User }> {
    const user = await this.userRepository.findByUsername(username);
    if (!user) {
      throw new Error("Utilisateur introuvable");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Mot de passe incorrect");
    }

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: "1h" });
    return { token, user };
  }
}
