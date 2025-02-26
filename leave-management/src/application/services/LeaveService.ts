import { LeaveRequest } from "../../domain/models/LeaveRequest";

export class LeaveService {
  async requestLeave(employeeId: number, startDate: Date, endDate: Date) {
    if (endDate < startDate) {
      throw new Error("La date de fin ne peut pas être avant la date de début.");
    }

    return await LeaveRequest.create({
      employeeId,
      startDate,
      endDate,
      status: "PENDING",
    });
  }

  // ✅ Add the missing method to fetch leave requests for a specific user
  async getUserLeaves(userId: number) {
    return await LeaveRequest.findAll({ where: { employeeId: userId } });
  }

  // ✅ Admin method to update leave request status
  async updateLeaveStatus(id: number, status: "PENDING" | "APPROVED" | "REJECTED") {
    const leaveRequest = await LeaveRequest.findByPk(id);
    if (!leaveRequest) throw new Error("Demande de congé introuvable");

    leaveRequest.status = status;
    await leaveRequest.save();
    return leaveRequest;
  }
}
