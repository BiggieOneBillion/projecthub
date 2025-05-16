import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "../../utils/auth";
import { GitHubController } from "../../services/github.main.service";
import { ProjectController } from "../../services/project.service";

interface IPostData {
  repoName: string;
  owner: string;
}
export async function GET(req: NextRequest) {
  const token = req.cookies.get("auth");
  if (!token) {
    return NextResponse.json(
      { message: "Token not avaliable" },
      { status: 401 }
    );
  }

  try {
    const tokenContent = await verifyToken(token.value);

    if (!tokenContent?.accessCode) {
      return NextResponse.json(
        { message: "Token not avaliable" },
        { status: 401 }
      );
    }

    // get the search params
    const searchParams = req.nextUrl.searchParams;
    const projectId = searchParams.get("projectId")!;
    const owner = searchParams.get("owner")!;

    const project = await ProjectController.getProjectById(projectId);

    if (!project) {
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 }
      );
    }

    const res = await GitHubController.repoCommits(
      tokenContent?.accessCode,
      owner,
      project?.name
    );

    if (!res) {
      return NextResponse.json(
        { message: "Repo not created, Permission Error" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Successfully Commits in a repos",
      data: res,
    });
  } catch (error) {
    console.error("Error form Commits in a repos", error);
    return NextResponse.json({
      message: `Error Creating data: ${(error as Error).message}`,
    });
  }
}
