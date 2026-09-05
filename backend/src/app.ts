import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import employeeRoutes from "./routes/employee.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "PeoplePay360 backend is running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/employees", employeeRoutes);

export default app;