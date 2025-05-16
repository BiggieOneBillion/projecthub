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

    // Get body data
    const res = await GitHubController.getUserInfo(tokenContent?.accessCode);

    if (!res) {
      return NextResponse.json(
        { message: "No User Info Exist" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Successfully Fetched Data",
      data: res,
    });
  } catch (error) {
    console.error("Error fetching user info", error);
    return NextResponse.json({
      message: `Error Fetching user info data: ${(error as Error).message}`,
    });
  }
}
