import { dbConnect } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { UserController, userData } from "../../services/user.service";
import { generateToken } from "../../utils/auth";

export async function POST(req: NextRequest) {
  try {
    await dbConnect(); // connection to db
    const body: userData = await req.json();
    // validation would be done here or the middleware
    const user = await UserController.createUser(body);

  
    const response = NextResponse.json(
      { message: "User Created", data: user },
      { status: 200 }
    );
    const token = await generateToken({
      isAuthenticated: true,
      initialSetUp: true,
    });
    response.cookies.set("auth", token, {
      httpOnly: true,
      path: "/",
    });
    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { Error: `${(error as Error).message}` },
      { status: 500 }
    );
  }
}
