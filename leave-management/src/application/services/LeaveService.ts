import { LeaveRequest } from "../../domain/models/LeaveRequest";
import { ILeaveRepository } from "../ports/ILeaveRepository";

export class LeaveService {
  private leaveRepository: ILeaveRepository;

  constructor(leaveRepository: ILeaveRepository) {
    this.leaveRepository = leaveRepository;
  }

  async requestLeave(employeeId: number, startDate: Date, endDate: Date): Promise<LeaveRequest> {
    if (endDate < startDate) {
      throw new Error("La date de fin ne peut pas être avant la date de début.");
    }
    return this.leaveRepository.createLeaveRequest(employeeId, startDate, endDate);
  }

  async getUserLeaves(employeeId: number): Promise<LeaveRequest[]> {
    return this.leaveRepository.getLeavesByEmployeeId(employeeId);
  }

  async updateLeaveStatus(id: number, status: "APPROVED" | "REJECTED"): Promise<LeaveRequest> {
    return this.leaveRepository.updateLeaveStatus(id, status);
  }

  async getAllLeaveRequests(): Promise<LeaveRequest[]> {
    return this.leaveRepository.getAllLeaveRequests();
  }
}
