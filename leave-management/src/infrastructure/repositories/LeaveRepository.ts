import { LeaveRequest } from "../../domain/models/LeaveRequest";
import { ILeaveRepository } from "../../application/ports/ILeaveRepository";

export class LeaveRepository implements ILeaveRepository {
  async requestLeave(employeeId: number, startDate: Date, endDate: Date) {
    return await LeaveRequest.create({ employeeId, startDate, endDate, status: "PENDING" });
  }

  async getUserLeaves(userId: number) {
    return await LeaveRequest.findAll({ where: { employeeId: userId } });
  }

  async updateLeaveStatus(id: number, status: "PENDING" | "APPROVED" | "REJECTED") {
    const leaveRequest = await LeaveRequest.findByPk(id);
    if (!leaveRequest) throw new Error("Demande introuvable");
    leaveRequest.status = status;
    await leaveRequest.save();
    return leaveRequest;
  }
}
