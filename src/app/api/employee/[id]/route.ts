import { dbConnect } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import {
  EmployeeController,
  EmployeeSchema,
} from "../../services/employee.service";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: employeeId } = await params;

  if (!employeeId) {
    return NextResponse.json(
      { message: "Employee ID is required" },
      { status: 400 }
    );
  }
  try {
    await dbConnect();

    const employee = await EmployeeController.getEmployeeById(employeeId);

    return NextResponse.json(
      {
        message: "Successfully fetched employee",
        data: employee,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching employee:", error);
    return NextResponse.json(
      { Error: `Error: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: employeeId } = await params;

  if (!employeeId) {
    return NextResponse.json(
      { message: "Employee ID is required" },
      { status: 400 }
    );
  }
  try {
    await dbConnect();

    const body: EmployeeSchema = await req.json();

    const updateEmployee = await EmployeeController.updateEmployee(
      employeeId,
      body
    );

    return NextResponse.json(
      {
        message: "Successfully updated employee",
        data: updateEmployee,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating employee:", error);
    return NextResponse.json(
      { Error: `Error: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: employeeId } = await params;

  if (!employeeId) {
    return NextResponse.json(
      { message: "Employee ID is required" },
      { status: 400 }
    );
  }
  try {
    await dbConnect();

    await EmployeeController.getEmployeeById(employeeId);

    await EmployeeController.deleteEmployee(employeeId);

    return NextResponse.json(
      {
        message: "Successfully deleted employee",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting employee:", error);
    return NextResponse.json(
      { Error: `Error: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}
