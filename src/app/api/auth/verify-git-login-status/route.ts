import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "../../utils/auth";

export async function POST(req: NextRequest) {
  const tokenCookie = req.cookies.get("auth");

  if (!tokenCookie) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 }); // Unauthorized
  }

  // // console.log"ACCESS CODE---", tokenCookie?.value);
  try {
    const tokenFromCookie = await verifyToken(tokenCookie?.value as string);

    // // console.log"PAYLOAD FROM BROWSER", tokenFromCookie);

    if (tokenFromCookie?.accessCode) {
      return NextResponse.json(
        { message: "Succesfully verified" },
        { status: 200 }
      );
    }

    return NextResponse.json({ message: "Error Verifying" }, { status: 402 });
  } catch (error) {
    console.error(error);

    return NextResponse.json({ message: "Error Verifying" }, { status: 500 });
  }
}
