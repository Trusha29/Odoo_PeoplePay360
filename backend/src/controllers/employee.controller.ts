import { Request, Response } from "express";
import { prisma } from "../config/prisma";

export const getEmployees = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const employees = await prisma.employee.findMany({
      include: {
        department: true,
      },
      orderBy: {
        id: "desc",
      },
    });

    res.status(200).json({
      success: true,
      data: employees,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to fetch employees",
    });
  }
};

export const getEmployeeById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = Number(req.params.id);

    const employee = await prisma.employee.findUnique({
      where: { id },
      include: {
        department: true,
        contracts: true,
        attendances: true,
        timeOffRequests: true,
      },
    });

    if (!employee) {
      res.status(404).json({
        success: false,
        message: "Employee not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: employee,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to fetch employee",
    });
  }
};

export const createEmployee = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      employeeCode,
      firstName,
      lastName,
      email,
      phone,
      jobTitle,
      departmentId,
      status,
    } = req.body;

    if (!employeeCode || !firstName || !lastName || !email) {
      res.status(400).json({
        success: false,
        message: "Employee code, first name, last name and email are required",
      });
      return;
    }

    const employee = await prisma.employee.create({
      data: {
        employeeCode,
        firstName,
        lastName,
        email,
        phone,
        jobTitle,
        departmentId: departmentId ? Number(departmentId) : undefined,
        status: status || "ACTIVE",
      },
    });

    res.status(201).json({
      success: true,
      message: "Employee created successfully",
      data: employee,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to create employee",
    });
  }
};

export const updateEmployee = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = Number(req.params.id);

    const {
      employeeCode,
      firstName,
      lastName,
      email,
      phone,
      jobTitle,
      departmentId,
      status,
    } = req.body;

    const existingEmployee = await prisma.employee.findUnique({
      where: { id },
    });

    if (!existingEmployee) {
      res.status(404).json({
        success: false,
        message: "Employee not found",
      });
      return;
    }

    const employee = await prisma.employee.update({
      where: { id },
      data: {
        employeeCode,
        firstName,
        lastName,
        email,
        phone,
        jobTitle,
        departmentId:
          departmentId !== undefined
            ? Number(departmentId)
            : undefined,
        status,
      },
    });

    res.status(200).json({
      success: true,
      message: "Employee updated successfully",
      data: employee,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to update employee",
    });
  }
};

export const deleteEmployee = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = Number(req.params.id);

    const employee = await prisma.employee.findUnique({
      where: { id },
    });

    if (!employee) {
      res.status(404).json({
        success: false,
        message: "Employee not found",
      });
      return;
    }

    await prisma.employee.delete({
      where: { id },
    });

    res.status(200).json({
      success: true,
      message: "Employee deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to delete employee",
    });
  }
};

export const getEmployeeSummary = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = Number(req.params.id);

    const employee = await prisma.employee.findUnique({
      where: { id },
      include: {
        department: true,
        contracts: true,
        attendances: true,
        timeOffRequests: true,
      },
    });

    if (!employee) {
      res.status(404).json({
        success: false,
        message: "Employee not found",
      });
      return;
    }

    const summary = {
      employeeId: employee.id,
      employeeCode: employee.employeeCode,
      name: `${employee.firstName} ${employee.lastName}`,
      department: employee.department?.name || null,
      contracts: employee.contracts.length,
      attendanceRecords: employee.attendances.length,
      timeOffRequests: employee.timeOffRequests.length,
    };

    res.status(200).json({
      success: true,
      data: summary,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to fetch summary",
    });
  }
};