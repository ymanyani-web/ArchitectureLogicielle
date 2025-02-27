import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../infrastructure/database/config";

export class User extends Model {
  public id!: number;
  public username!: string;
  public password!: string;
  public role!: "user" | "admin";
}

User.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, allowNull: false, defaultValue: "user" },
  },
  { sequelize, modelName: "user" }
);
