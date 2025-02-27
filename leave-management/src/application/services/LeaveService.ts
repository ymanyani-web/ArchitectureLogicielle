import { ILeaveRepository } from "../ports/ILeaveRepository";

export class LeaveService {
  private leaveRepository: ILeaveRepository;

  constructor(leaveRepository: ILeaveRepository) {
    this.leaveRepository = leaveRepository;
  }

  async requestLeave(employeeId: number, startDate: Date, endDate: Date) {
    if (endDate < startDate) throw new Error("La date de fin ne peut pas être avant la date de début.");
    return await this.leaveRepository.requestLeave(employeeId, startDate, endDate);
  }

  async getUserLeaves(userId: number) {
    return await this.leaveRepository.getUserLeaves(userId);
  }

  async updateLeaveStatus(id: number, status: "PENDING" | "APPROVED" | "REJECTED") {
    return await this.leaveRepository.updateLeaveStatus(id, status);
  }
}
