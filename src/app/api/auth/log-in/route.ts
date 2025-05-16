import { dbConnect } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { UserController } from "../../services/user.service";
import { generateToken } from "../../utils/auth";

export async function POST(req: NextRequest) {
  try {
    await dbConnect(); // connection to db
    const body: { email: string; password: string } = await req.json();
    //! validation would be done here or the middleware
    const user = await UserController.logIn(body.email, body.password);

    const response = NextResponse.json(
      { message: "Logged in successfully", data: user },
      { status: 200 }
    );
    const token = await generateToken({ isAuthenticated: true });
    response.cookies.set("auth", token, {
      httpOnly: true,
      path: "/",
    });

    return response;
  } catch (error) {
    // // console.log"SIGN IN", (error as Error).message);
    if (
      (error as Error).message === "User not found" ||
      (error as Error).message === "Invalid password"
    ) {
      return NextResponse.json(
        { Error: `${(error as Error).message}` },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { Error: `${(error as Error).message}` },
      { status: 500 }
    );
  }
}
