import { LeaveRequest } from "../../domain/models/LeaveRequest";
import { ILeaveRepository } from "../../application/ports/ILeaveRepository";

export class LeaveRepository implements ILeaveRepository {
  async createLeaveRequest(employeeId: number, startDate: Date, endDate: Date): Promise<LeaveRequest> {
    return await LeaveRequest.create({ employeeId, startDate, endDate, status: "PENDING" });
  }

  async getLeavesByEmployeeId(employeeId: number): Promise<LeaveRequest[]> {
    return await LeaveRequest.findAll({ where: { employeeId } });
  }

  async updateLeaveStatus(id: number, status: "APPROVED" | "REJECTED"): Promise<LeaveRequest> {
    const leave = await LeaveRequest.findByPk(id);
    if (!leave) {
      throw new Error("Demande de congé non trouvée.");
    }
    leave.status = status;
    await leave.save();
    return leave;
  }

  async getAllLeaveRequests(): Promise<LeaveRequest[]> {
    return await LeaveRequest.findAll(); // Fetch all leave requests
  }
}
