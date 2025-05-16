import { columns, Project } from "./_component/columns";
import { DataTable } from "@/components/ui/data-table";
import { AddTaskDialog } from "../_component/add-task-dialog";

async function getData(): Promise<Project[]> {
  // Fetch data from your API here.
  return [
    {
      id: "1",
      name: "john boe",
      description: "e no easy to be coder or manchi",
      createdAt: "24/03/2024",
    },
    // ...
  ];
}

export default async function Page() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10 flex flex-col gap-10">
      <header className="flex items-end justify-between">
        <section className="space-y-3">
          <h1 className="text-2xl font-semibold">Project List</h1>
          <p className="flex flex-col text-sm text-gray-500">
            <span>This is a table containing all of your projects</span>
            <span>
              Your can click the last column to edit or delete project
            </span>
          </p>
        </section>
       <AddTaskDialog />
      </header>
      <DataTable columns={columns} data={data} />
    </div>
  );
}