import { LeaveService } from "../application/services/LeaveService";
import { ILeaveRepository } from "../application/ports/ILeaveRepository";
import { LeaveRequest } from "../domain/models/LeaveRequest";
import { Sequelize } from "sequelize";

const sequelize = new Sequelize("sqlite::memory:", { logging: false }); // ✅ Disable logging

const mockLeaveRepository: jest.Mocked<ILeaveRepository> = {
  requestLeave: jest.fn(),
  getUserLeaves: jest.fn(),
  updateLeaveStatus: jest.fn(),
};

const leaveService = new LeaveService(mockLeaveRepository);

describe("LeaveService", () => {
  afterAll(async () => {
    await sequelize.close(); // ✅ Properly close database after tests
  });

  test("should create a leave request successfully", async () => {
    const mockLeave = LeaveRequest.build({
      id: 1,
      employeeId: 2,
      startDate: new Date(),
      endDate: new Date(),
      status: "PENDING",
    });

    mockLeaveRepository.requestLeave.mockResolvedValue(mockLeave);

    const result = await leaveService.requestLeave(2, new Date(), new Date());
    expect(result).toEqual(mockLeave);
    expect(mockLeaveRepository.requestLeave).toHaveBeenCalled();
  });
});
