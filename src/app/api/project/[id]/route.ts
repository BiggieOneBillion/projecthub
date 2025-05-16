import { dbConnect } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { ProjectController, ProjectData } from "../../services/project.service";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // const searchParams = req.nextUrl.searchParams;
  // const projectId = searchParams.get("projectId");

  const { id: projectId } = await params;

  if (!projectId) {
    return NextResponse.json(
      { message: "Project ID is required" },
      { status: 400 }
    );
  }
  try {
    await dbConnect();

    const project = await ProjectController.getProjectById(projectId);

    return NextResponse.json(
      {
        message: "Successfully fetched project",
        data: project,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching project:", error);
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
  const { id: projectId } = await params;

  if (!projectId) {
    return NextResponse.json(
      { message: "Project ID is required" },
      { status: 400 }
    );
  }
  try {
    await dbConnect();

    const body: Partial<ProjectData> = await req.json();

    const updateProject = await ProjectController.updateProject(
      projectId,
      body
    );

    return NextResponse.json(
      {
        message: "Successfully updated project",
        data: updateProject,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating project:", error);
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
  const { id: projectId } = await params;

  // console.log"DELETE PROJECT ID", projectId);

  if (!projectId) {
    return NextResponse.json(
      { message: "Project ID is required" },
      { status: 400 }
    );
  }
  try {
    await dbConnect();

    await ProjectController.getProjectById(projectId);

    await ProjectController.deleteProject(projectId);

    return NextResponse.json(
      {
        message: "Successfully deleted project",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json(
      { Error: `Error: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}
