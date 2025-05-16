import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "../../utils/auth";
import { GitHubController } from "../../services/github.main.service";

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

    const searchParams = req.nextUrl.searchParams;
    const repoName = searchParams.get("repoName")!;
    const owner = searchParams.get("owner")!;
    const branch = searchParams.get("branch")!;

    const res = await GitHubController.getRepositorySingleBranch(
      tokenContent?.accessCode,
      owner,
      repoName,
      branch
    );

    return NextResponse.json({
      message: "Successfully fetched single repo",
      data: res,
    });
  } catch (error) {
    console.error("Error fetching single repo", error);
    return NextResponse.json({
      message: `Error fetching data: ${(error as Error).message}`,
    });
  }
}
