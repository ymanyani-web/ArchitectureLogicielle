import express from "express";
import cors from "cors";
import { sequelize } from "./infrastructure/database/config";
import leaveRoutes from "./infrastructure/controllers/LeaveController";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", leaveRoutes);

if (process.env.NODE_ENV !== "test") {
    sequelize.sync().then(() => console.log("✅ Database connected!"));
}

export default app; 

app.listen(3000, () => console.log("Server running on port 3000"));
