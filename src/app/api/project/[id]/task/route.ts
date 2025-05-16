import { TaskController } from "@/app/api/services/task.service";
import { dbConnect } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: projectId } = await params;

  if (!projectId) {
    return NextResponse.json(
      { message: "Project ID missing" },
      { status: 400 }
    );
  }

  try {
    await dbConnect();

    const projectTask = await TaskController.getTasksByProject(projectId);

    return NextResponse.json(
      { message: "Successfully gotten tasks", data: projectTask },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching task for project:", error);
    return NextResponse.json(
      { Error: `Error: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}
