import { Request, Response, Router } from "express";
import { LeaveService } from "../../application/services/LeaveService";
import { LeaveRepository } from "../repositories/LeaveRepository";
import { authMiddleware, adminMiddleware, AuthRequest } from "../middleware/authMiddleware";

const router = Router();
const leaveRepository = new LeaveRepository();
const leaveService = new LeaveService(leaveRepository);

router.get("/leave-requests", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    if (req.user!.role === "admin") {
      const leaves = await leaveService.getAllLeaveRequests();
      res.status(200).json(leaves);
    } else {
      const userId = req.user!.id;
      const leaves = await leaveService.getUserLeaves(userId);
      res.status(200).json(leaves);
    }
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

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

router.post("/leave-request", authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const { startDate, endDate } = req.body;
    const leave = await leaveService.requestLeave(userId, new Date(startDate), new Date(endDate));
    res.status(201).json(leave);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});


export default router;
