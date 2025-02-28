import { Request, Response, Router } from "express";
import { AuthService } from "../../application/services/AuthService";
import { UserRepository } from "../repositories/UserRepository";

const router = Router();
const userRepository = new UserRepository();
const authService = new AuthService(userRepository);

router.post("/register", async (req: Request, res: Response) => {
  try {
    const { username, password, role } = req.body;
    const user = await authService.register(username, password, role);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

router.post("/login", async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const result = await authService.login(username, password);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

export default router;
