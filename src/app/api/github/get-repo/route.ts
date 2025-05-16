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

    const res = await GitHubController.fetchUserRepos(tokenContent?.accessCode);

    // console.log"RES FROM GITHUB", res);

    return NextResponse.json({
      message: "Successfully fetched user repos",
      data: res,
    });
  } catch (error) {
    console.error("Error fetching user repos", error);
    return NextResponse.json({
      message: `Error fetching data: ${(error as Error).message}`,
    });
  }
}
