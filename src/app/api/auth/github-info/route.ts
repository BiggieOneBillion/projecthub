import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const accessCode = req.headers.get("X-access-code");

  // // console.log"GIT INFO ACCESS CODE--", accessCode);

  try {
    const userResponse = await axios.get("https://api.github.com/user", {
      headers: { Authorization: `Bearer ${accessCode}` },
    });
    // // console.log"USER DETAILS---", userResponse.data);

    return NextResponse.json({
      message: "User details fetched successfully",
      data: userResponse.data,
    });
  } catch (error) {
    console.error(`Error from data: ${error}`);
    return NextResponse.json(
      { message: "Error fetching git details" },
      { status: 500 }
    );
  }
}
