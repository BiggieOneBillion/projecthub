import { dbConnect } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { EmployeeController } from "../../services/employee.service";

export async function POST(req: NextRequest) {
  try {
    await dbConnect(); // connect to database

    const body: { email: string; password: string; code: string } =
      await req.json();

    const employee = await EmployeeController.logIn(body.email, body.password);

    if (!employee) {
      return NextResponse.json({ message: "Login In Failed" }, { status: 400 });
    }
    return NextResponse.json(
      { message: "Successfully Logged In" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { Error: `Error: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}
