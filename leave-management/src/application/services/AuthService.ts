import { User } from "../../domain/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = "mysecretkey"; // 

export class AuthService {
  async register(username: string, password: string, role: "user" | "admin") {
    const hashedPassword = await bcrypt.hash(password, 10);
    return await User.create({ username, password: hashedPassword, role });
  }

  async login(username: string, password: string) {
    const user = await User.findOne({ where: { username } });
    if (!user) throw new Error("Utilisateur introuvable");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Mot de passe incorrect");

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: "1h" });
    return { token, user };
  }
}
