import { dbConnect } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { ITask, TaskController } from "../../services/task.service";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: taskId } = await params;

  if (!taskId) {
    return NextResponse.json(
      { message: "Task ID is required" },
      { status: 400 }
    );
  }
  try {
    await dbConnect();

    const task = await TaskController.getTaskById(taskId);

    return NextResponse.json(
      {
        message: "Successfully fetched task",
        data: task,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching task:", error);
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
  const { id: taskId } = await params;

  if (!taskId) {
    return NextResponse.json(
      { message: "Task ID is required" },
      { status: 400 }
    );
  }
  try {
    await dbConnect();

    const body: ITask = await req.json();

    const updateTask = await TaskController.updateTask(taskId, body);

    return NextResponse.json(
      {
        message: "Successfully updated task",
        data: updateTask,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating task:", error);
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
  const { id: taskId } = await params;

  if (!taskId) {
    return NextResponse.json(
      { message: "Task ID is required" },
      { status: 400 }
    );
  }
  try {
    await dbConnect();

    await TaskController.getTaskById(taskId);

    await TaskController.deleteTask(taskId);

    return NextResponse.json(
      {
        message: "Successfully deleted task",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting task:", error);
    return NextResponse.json(
      { Error: `Error: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}
