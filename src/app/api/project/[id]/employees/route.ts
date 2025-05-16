import { EmployeeController } from "@/app/api/services/employee.service";
import { ProjectController } from "@/app/api/services/project.service";
import { dbConnect } from "@/lib/db";
// import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: projectId } = await params;

  if (!projectId) {
    return NextResponse.json(
      { message: "Please provide project id" },
      { status: 400 }
    );
  }

  try {
    await dbConnect();
    // check if project exists
    await ProjectController.getProjectById(projectId.toString());

    // get the employees on that project
    const employees = await EmployeeController.getEmployeesByProjectId(
      projectId.toString()
    );
    // return the employees
    return NextResponse.json(
      {
        message: "Successfully fetched employees under project",
        data: employees,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching employee for project:", error);
    return NextResponse.json(
      { Error: `Error: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}
