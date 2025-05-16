import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "../../utils/auth";
import { GitHubController } from "../../services/github.main.service";

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

    // get the search params
    const searchParams = req.nextUrl.searchParams
    const repoName = searchParams.get("repoName")!;
    const owner = searchParams.get("owner")!;

    if (!tokenContent?.accessCode) {
      return NextResponse.json(
        { message: "Token not avaliable" },
        { status: 401 }
      );
    }
    // get body data
    // const body: IPostData = await req.json();

    const res = await GitHubController.repoCommitCount(
      tokenContent?.accessCode,
      owner,
      repoName
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
