import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../infrastructure/database/config";

export class Employee extends Model {
  public id!: number;
  public name!: string;
  public leaveBalance!: number;
}

Employee.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    leaveBalance: { type: DataTypes.INTEGER, defaultValue: 20 },
  },
  { sequelize, modelName: "employee" }
);
