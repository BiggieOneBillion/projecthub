import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "../../utils/auth";
import { GitHubController } from "../../services/github.main.service";

export async function PUT(req: NextRequest) {
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

    const body = await req.json();

    const res = await GitHubController.updateRepositoryInfo(
      tokenContent?.accessCode,
      body.owner,
      body.repoName,
      body.updatedName,
      body.updatedDescription,
      body.updatedVisibility,
      body.homepage
    );

    return NextResponse.json({
      message: "Successfully updated single repo",
      data: res,
    });
  } catch (error) {
    console.error("Error updating single repo", error);
    return NextResponse.json({
      message: `Error updating data: ${(error as Error).message}`,
    });
  }
}
