"use client";
import { DataTable } from "@/components/ui/data-table";
import { AddEmployeeDialog } from "../_component/add-employee-dialog";
import { useParams } from "next/navigation";
import { columns } from "./_components/columns";
import { useGetProjectEmployees } from "@/lib/query";

export default function Page() {
  const params = useParams();

  const { data, isLoading, isError, refetch } = useGetProjectEmployees(
    params.id as string
  );

  if (isLoading) {
    return <p className="text-lg text-black font-medium">...Loading</p>;
  }

  if (isError) {
    return (
      <div className="flex items-center gap-1">
        <p className="text-black font-medium">Error Fetching Data</p>
        <button
          className="border px-1 rounded-sm text-sm"
          onClick={() => refetch()}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-3 lg:py-10 lg:px-10 flex flex-col gap-10">
      <header className="flex flex-col gap-5 md:gap-0 md:flex-row md:items-center justify-between">
        <section className="space-y-3">
          <h1 className="text-2xl font-semibold">Employee List</h1>
          <p className="md:flex flex-col text-sm text-gray-500">
            <span className="md:hidden">
              This is a table containing all the employee in this project. Your
              can click the last column to edit or delete project
            </span>
            <span className="hidden md:inline">
              This is a table containing all the employee in this project
            </span>
            <span className="hidden md:inline">
              Your can click the last column to edit or delete project
            </span>
          </p>
        </section>
        <div>
          <AddEmployeeDialog />
        </div>
      </header>
      <DataTable columns={columns} data={data.data} />
    </div>
  );
}
