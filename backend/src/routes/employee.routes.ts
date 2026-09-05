import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import {
	createEmployee,
	deleteEmployee,
	getEmployeeById,
	getEmployees,
	getEmployeeSummary,
	updateEmployee,
} from "../controllers/employee.controller";

const router = Router();

router.use(authenticate);
router.get("/", getEmployees);
router.post("/", createEmployee);
router.get("/:id/summary", getEmployeeSummary);
router.get("/:id", getEmployeeById);
router.put("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);

export default router;
