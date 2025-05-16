import { dbConnect } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import {
  EmployeeController,
  ICreateEmployeeSchema,
} from "../services/employee.service";
import { ProjectController } from "../services/project.service";

export async function POST(req: NextRequest) {
  try {
    await dbConnect(); // connect to db

    const body: ICreateEmployeeSchema = await req.json(); // get data from body

    const employee = await EmployeeController.createEmployee(body);

    // console.log"EMPLOYEE RESPONSE", employee);

    if (!employee) {
      return NextResponse.json(
        { message: "Error Creating Employee" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Employee Created Successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { Error: `Error: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    await dbConnect(); // connect to db

    const searchParams = req.nextUrl.searchParams;
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { message: "Please provide user Id" },
        { status: 400 }
      );
    }

    // get all project under manager
    const projects = await ProjectController.getProjectsByManagerId(userId);
    // get just the id and name from the projects array
    const getId = projects.map((el) => {
      return {
        id: el._id.toString(),
        name: el.name,
      };
    });
    // this result array holds the returned response.
    const result = [];
    // get all employees under manager projects
    for (let i = 0; i < getId.length; i++) {
      try {
        const res = await EmployeeController.getEmployeesByProjectId(
          getId[i].id
        );
        if (!res) {
          return NextResponse.json(
            { message: "Error fetching employees-not avaliable" },
            { status: 400 }
          );
        }
        const data = {
          projectName: getId[i].name,
          employees: res,
        };
        result.push(data);
      } catch {
        return NextResponse.json(
          { message: "Error fetching employees" },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      { message: "Employee Fetched Successfully", data: result },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { Error: `Error: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}
