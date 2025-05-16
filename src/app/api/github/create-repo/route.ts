import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "../../utils/auth";
import { GitHubController } from "../../services/github.main.service";

interface IPostData {
  name: string;
  description: string;
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
    const body: IPostData = await req.json();

    const res = await GitHubController.createRepository(
      tokenContent?.accessCode,
      body.name,
      body.description
    );

    if (!res) {
      return NextResponse.json(
        { message: "Repo not created, Permission Error" },
        { status: 500 }
      );
    }

    // console.log"CREATE FROM GITHUB", res);

    return NextResponse.json({
      message: "Successfully Created user repos",
      data: res,
    });
  } catch (error) {
    console.error("Error form Creating user repos", error);
    return NextResponse.json({
      message: `Error Creating data: ${(error as Error).message}`,
    });
  }
}
