import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../infrastructure/database/config";

export class LeaveRequest extends Model {
  public id!: number;
  public employeeId!: string;
  public startDate!: Date;
  public endDate!: Date;
  public status!: "PENDING" | "APPROVED" | "REJECTED";
}

LeaveRequest.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    employeeId: { type: DataTypes.STRING, allowNull: false },
    startDate: { type: DataTypes.DATE, allowNull: false },
    endDate: { type: DataTypes.DATE, allowNull: false },
    status: { type: DataTypes.STRING, defaultValue: "PENDING" },
  },
  { sequelize, modelName: "LeaveRequests" }
);
