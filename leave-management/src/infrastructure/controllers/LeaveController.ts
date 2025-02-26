import { Request, Response, Router } from "express";
import { LeaveService } from "../../application/services/LeaveService";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();
const leaveService = new LeaveService();

// ✅ Secure the route with `authMiddleware`
router.get("/leave-requests", authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = (req as any).user.id;
    const leaves = await leaveService.getUserLeaves(userId);
    res.status(200).json(leaves);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// ✅ Secure admin-only access
router.put("/leave-requests/:id", authMiddleware, async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const userRole = (req as any).user.role;

    if (userRole !== "admin") {
      res.status(403).json({ error: "Accès refusé, admin requis" });
      return;
    }

    const leave = await leaveService.updateLeaveStatus(Number(id), status);
    res.status(200).json(leave);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

export default router;
