import { Metadata } from "next";
import Image from "next/image";
import { z } from "zod";

import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { taskSchema } from "./data/schema";
import axios from "axios";
import { AddTaskDialog } from "../_component/add-task-dialog";
import { ITask } from "../_component/task-list-card";

export const metadata: Metadata = {
  title: "Tasks",
  description: "A task and issue tracker build using Tanstack Table.",
};

// interface Idata {
//   // data return type from the server
//   id: string;
//   title: string;
//   status: string;
//   label: string;
//   priority: string;
// }

// Simulate a database read for tasks.
async function getTasks(id: string) {
  //! fetch your data here
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/project/${id}/task`
    );
    if (response.status === 200) {
      const refinedData = response.data.data.map((task: ITask) => ({
        id: task.taskId,
        taskId: task._id,
        title: task.name,
        status: task.status,
        label: task.label,
        priority: task.priority,
        employeeDetails: {
          firstName: task.assignedTo[0].firstName,
          lastName: task.assignedTo[0].lastName,
        },
      }));
      // return response.data.data;
      return z.array(taskSchema).parse(refinedData);
    }
  } catch {
    // console.logerror);
  }
}

export default async function TaskPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const tasks = await getTasks(id);

  return (
    <>
      <div className="hidden">
        <Image
          src="/examples/tasks-light.png"
          width={1280}
          height={998}
          alt="Playground"
          className="block dark:hidden"
        />
        <Image
          src="/examples/tasks-dark.png"
          width={1280}
          height={998}
          alt="Playground"
          className="hidden dark:block"
        />
      </div>
      <div className="hiddeny h-full flex-1 flex-col gap-8 mt-5 lg:p-8 md:flex">
        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Task List!</h2>
            <p className="text-muted-foreground text-sm text-gray-500">
              Here&apos;s a list of your tasks for this project
            </p>
          </div>
          <div>
            <AddTaskDialog />
          </div>
        </div>
        <div className="mt-10 md:mt-0">
          <DataTable data={tasks!} columns={columns} />
        </div>
      </div>
    </>
  );
}
