import { LeaveRequest } from "../../domain/models/LeaveRequest";

export interface ILeaveRepository {
  createLeaveRequest(employeeId: number, startDate: Date, endDate: Date): Promise<LeaveRequest>;
  getLeavesByEmployeeId(employeeId: number): Promise<LeaveRequest[]>;
  updateLeaveStatus(id: number, status: "APPROVED" | "REJECTED"): Promise<LeaveRequest>;
  getAllLeaveRequests(): Promise<LeaveRequest[]>;
}
