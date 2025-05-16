import { NextRequest, NextResponse } from "next/server";
import { generateToken } from "../../utils/auth";
import { dbConnect } from "@/lib/db";
import { ProjectController } from "../../services/project.service";
import { EmployeeController } from "../../services/employee.service";

interface bodyData {
  userId: string;
  projectDetails: {
    name: string;
    description: string;
  };
  employeesDetails: {
    fullname: string;
    email: string;
    projectRole: string;
  }[];
}

export async function POST(req: NextRequest) {
  const body: bodyData = await req.json();

  let projectId: string;

  await dbConnect(); // connect to db

  try {
    // save project first
    const res = await ProjectController.createProject({
      name: body.projectDetails.name,
      description: body.projectDetails.description,
      managerId: body.userId,
      isMonitored: false,
      onGithub: false,
    });
    console.log("TRYING TO SAVE DATA", res);// debug
    projectId = res.id;
  } catch  {
    // console.error(error);
    return new Response("Failed to create set up project", { status: 500 });
  }

  for (let i = 0; i < body.employeesDetails.length; i++) {
    try {
       await EmployeeController.createEmployee({
        email: body.employeesDetails[i].email,
        firstName: body.employeesDetails[i].fullname.split(" ")[0] as string,
        lastName: body.employeesDetails[i].fullname.split(" ")[0] as string,
        projectRole: body.employeesDetails[i].projectRole,
        projects: [
          { projectId: projectId, role: body.employeesDetails[i].projectRole },
        ],
      });
    } catch {
      return NextResponse.json(
        { message: "Failed to create employee" },
        { status: 500 }
      );
    }
  }

  const response = NextResponse.json({ message: "set up successfully" });

  const token = await generateToken({
    isAuthenticated: true,
    initialSetUp: false,
  });
  response.cookies.set("auth", token, {
    httpOnly: true,
    path: "/",
  });

  return response;
}
