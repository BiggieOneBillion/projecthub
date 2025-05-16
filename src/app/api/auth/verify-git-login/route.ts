import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
  const tokenCookie = req.cookies.get("auth");

  try {
    const body: { token: string } = await req.json();

    const { token } = body;

    if (token === tokenCookie?.value) {
      return NextResponse.json(
        { message: "Succesfully verified" },
        { status: 200 }
      );
    }

    return NextResponse.json({ message: "Error Verifying" }, { status: 401 });
  } catch (error) {
    console.error(error);

    return NextResponse.json({ message: "Error Verifying" }, { status: 500 });
  }
}
