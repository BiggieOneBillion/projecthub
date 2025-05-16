import { dbConnect } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
// import { ProjectController, ProjectData } from "../services/project.service";
import { ICreateTask, TaskController } from "../services/task.service";

export async function POST(req: NextRequest) {
  try {
    await dbConnect(); // connect to db

    const body: ICreateTask = await req.json(); // get data from body

    // console.log"TASK ENDPOINT BODY--", body)

    const project = await TaskController.createTask(body);

    return NextResponse.json(
      { message: "Task Created Successfully", data: project },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { Error: `Error: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}
