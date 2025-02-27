import { Request, Response, Router } from "express";
import { LeaveService } from "../../application/services/LeaveService";
import { LeaveRepository } from "../repositories/LeaveRepository";
import { authMiddleware, adminMiddleware, AuthRequest } from "../middleware/authMiddleware";

const router = Router();
const leaveRepository = new LeaveRepository();
const leaveService = new LeaveService(leaveRepository);

// ✅ Protect Route - Only Authenticated Users Can View Their Requests
router.get("/leave-requests", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id; // Access `req.user` safely
    const leaves = await leaveService.getUserLeaves(userId);
    res.status(200).json(leaves);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// ✅ Protect Route - Only Admins Can Approve/Reject Requests
router.put("/leave-requests/:id", authMiddleware, adminMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const leave = await leaveService.updateLeaveStatus(Number(id), status);
    res.status(200).json(leave);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

export default router;
