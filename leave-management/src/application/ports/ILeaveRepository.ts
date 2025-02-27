import { LeaveRequest } from "../../domain/models/LeaveRequest";

export interface ILeaveRepository {
  requestLeave(employeeId: number, startDate: Date, endDate: Date): Promise<LeaveRequest>;
  getUserLeaves(userId: number): Promise<LeaveRequest[]>;
  updateLeaveStatus(id: number, status: "PENDING" | "APPROVED" | "REJECTED"): Promise<LeaveRequest>;
}
