import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "../../utils/auth";
import { GitHubController } from "../../services/github.main.service";

interface PostData {
  repoName: string;
  owner: string;
}

export async function POST(req: NextRequest) {
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
    // get body data
    const body: PostData = await req.json();

    const res = await GitHubController.monitorRepository(
      tokenContent?.accessCode,
      body.owner,
      body.repoName
    );

    if (!res) {
      return NextResponse.json(
        { message: "Monitoring denied, Permission Error" },
        { status: 500 }
      );
    }

    // console.log"MONITORING PROJECT", res);

    return NextResponse.json({
      message: "Successfully monitoring user repo",
      data: res,
    });
  } catch (error) {
    console.error("Error form set up monitoring user repo", error);
    return NextResponse.json({
      message: `Error Creating data: ${(error as Error).message}`,
    });
  }
}
