import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "../../utils/auth";
import { GitHubController } from "../../services/github.main.service";

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

    const body = await req.json();

    const res = await GitHubController.deleteRepository(
      tokenContent?.accessCode,
      body.owner,
      body.repoName
    );

    return NextResponse.json({
      message: "Successfully deleted repo activities",
      data: res,
    });
  } catch (error) {
    console.error("Error delete repo activities", error);
    return NextResponse.json({
      message: `Error fetching data: ${(error as Error).message}`,
    });
  }
}
