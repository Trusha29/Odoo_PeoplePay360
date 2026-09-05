import { Request, Response } from "express";
import { prisma } from "../config/prisma";

export const getContracts = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const contracts = await prisma.contract.findMany({
      include: {
        employee: true,
        salaryStructure: true,
      },
      orderBy: {
        id: "desc",
      },
    });

    res.status(200).json({
      success: true,
      data: contracts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to fetch contracts",
    });
  }
};

export const getContractById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = Number(req.params.id);

    const contract = await prisma.contract.findUnique({
      where: { id },
      include: {
        employee: true,
        salaryStructure: {
          include: {
            rules: true,
          },
        },
      },
    });

    if (!contract) {
      res.status(404).json({
        success: false,
        message: "Contract not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: contract,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to fetch contract",
    });
  }
};

export const createContract = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      employeeId,
      startDate,
      endDate,
      wage,
      employmentType,
      status,
      salaryStructureId,
    } = req.body;

    if (
      !employeeId ||
      !startDate ||
      !wage ||
      !employmentType ||
      !salaryStructureId
    ) {
      res.status(400).json({
        success: false,
        message:
          "Employee, start date, wage, employment type and salary structure are required",
      });
      return;
    }

    const employee = await prisma.employee.findUnique({
      where: {
        id: Number(employeeId),
      },
    });

    if (!employee) {
      res.status(404).json({
        success: false,
        message: "Employee not found",
      });
      return;
    }

    const contract = await prisma.contract.create({
      data: {
        employeeId: Number(employeeId),
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        wage: Number(wage),
        employmentType,
        status: status || "ACTIVE",
        salaryStructureId: Number(salaryStructureId),
      },
    });

    res.status(201).json({
      success: true,
      message: "Contract created successfully",
      data: contract,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to create contract",
    });
  }
};

export const updateContract = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = Number(req.params.id);

    const existingContract = await prisma.contract.findUnique({
      where: { id },
    });

    if (!existingContract) {
      res.status(404).json({
        success: false,
        message: "Contract not found",
      });
      return;
    }

    const {
      startDate,
      endDate,
      wage,
      employmentType,
      status,
      salaryStructureId,
    } = req.body;

    const contract = await prisma.contract.update({
      where: { id },
      data: {
        startDate: startDate ? new Date(startDate) : undefined,
        endDate:
          endDate !== undefined
            ? endDate
              ? new Date(endDate)
              : null
            : undefined,
        wage: wage !== undefined ? Number(wage) : undefined,
        employmentType,
        status,
        salaryStructureId:
          salaryStructureId !== undefined
            ? Number(salaryStructureId)
            : undefined,
      },
    });

    res.status(200).json({
      success: true,
      message: "Contract updated successfully",
      data: contract,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to update contract",
    });
  }
};

export const getEmployeeContracts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const employeeId = Number(req.params.id);

    const employee = await prisma.employee.findUnique({
      where: { id: employeeId },
    });

    if (!employee) {
      res.status(404).json({
        success: false,
        message: "Employee not found",
      });
      return;
    }

    const contracts = await prisma.contract.findMany({
      where: {
        employeeId,
      },
      include: {
        salaryStructure: true,
      },
      orderBy: {
        startDate: "desc",
      },
    });

    res.status(200).json({
      success: true,
      data: contracts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Failed to fetch employee contracts",
    });
  }
};