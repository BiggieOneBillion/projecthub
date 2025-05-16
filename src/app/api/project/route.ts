import { dbConnect } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { ProjectController, ProjectData } from "../services/project.service";

export async function POST(req: NextRequest) {
  try {
    await dbConnect(); // connect to db

    const body: ProjectData = await req.json(); // get data from body

    const project = await ProjectController.createProject(body);

    return NextResponse.json(
      { message: "Employee Created Successfully", data: project },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ Error: `Error: ${(error as Error).message}` });
  }
}

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    const searchParams = req.nextUrl.searchParams
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json(
        { message: "Please provide user Id" },
        { status: 400 }
      );
    }

    const projectsByManagerId = await ProjectController.getProjectsByManagerId(
      userId
    );


    return NextResponse.json(
      { message: "Successfull Fetched", data: projectsByManagerId },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ Error: `Error: ${(error as Error).message}` });
  }
}
