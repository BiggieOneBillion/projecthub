import { TaskController } from "@/app/api/services/task.service";
import { dbConnect } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const {id: employeeId} = await params;

  if (!employeeId) {
    return NextResponse.json(
      { message: "Employee ID missing" },
      { status: 400 }
    );
  }

  try {
    await dbConnect();

    const employeeTask = await TaskController.getTasksByEmployee(employeeId);

    console.log(employeeTask);
    

    return NextResponse.json(
      { message: "Successfully gotten task by employee", data: employeeTask },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching task for employee:", error);
    return NextResponse.json(
      { Error: `Error: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}
