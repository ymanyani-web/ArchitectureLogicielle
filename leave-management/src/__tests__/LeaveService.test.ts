import { LeaveService } from "../application/services/LeaveService";
import { ILeaveRepository } from "../application/ports/ILeaveRepository";
import { LeaveRequest } from "../domain/models/LeaveRequest";
import { jest } from "@jest/globals";

const mockLeaveRepository: jest.Mocked<ILeaveRepository> = {
  createLeaveRequest: jest.fn(),  
  getLeavesByEmployeeId: jest.fn(),
  updateLeaveStatus: jest.fn(),
  getAllLeaveRequests: jest.fn(), 
};

const leaveService = new LeaveService(mockLeaveRepository);

describe("LeaveService", () => {
  test("should create a leave request successfully", async () => {
    const mockLeave = LeaveRequest.build({
      id: 1,
      employeeId: 2,
      startDate: new Date(),
      endDate: new Date(),
      status: "PENDING",
    });

    mockLeaveRepository.createLeaveRequest.mockResolvedValue(mockLeave);

    const result = await leaveService.requestLeave(2, new Date(), new Date());
    expect(result).toEqual(mockLeave);
    expect(mockLeaveRepository.createLeaveRequest).toHaveBeenCalled();
  });

  test("should get all leave requests for admin", async () => {
    const mockLeaves = [
      LeaveRequest.build({ id: 1, employeeId: 2, startDate: new Date(), endDate: new Date(), status: "PENDING" }),
      LeaveRequest.build({ id: 2, employeeId: 3, startDate: new Date(), endDate: new Date(), status: "APPROVED" }),
    ];

    mockLeaveRepository.getAllLeaveRequests.mockResolvedValue(mockLeaves);

    const result = await leaveService.getAllLeaveRequests();
    expect(result).toEqual(mockLeaves);
    expect(mockLeaveRepository.getAllLeaveRequests).toHaveBeenCalled();
  });
});
