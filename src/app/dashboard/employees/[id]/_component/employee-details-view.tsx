"use client";
import { useGetEmployeeTask, useGetSingleEmployees } from "@/lib/query";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import EmployeeCard from "./employee-card";

const EmployeeDetailsView = ({ id }: { id: string }) => {
  const { data, isLoading } = useGetSingleEmployees(id);
  const { data: employeeTask, isLoading: employeeDataLoading } =
    useGetEmployeeTask(id);

  if (isLoading) {
    return <p>...Loading</p>;
  }
  return (
    <section className="space-y-5">
      {data && data.data && <EmployeeCard employee={data.data} />}

      {employeeDataLoading && <p>...Loading Table</p>}

      {employeeTask && employeeTask.data && (
        <div className="container mx-auto py-10">
          <DataTable
            columns={columns}
            data={employeeTask && employeeTask.data ? employeeTask.data : []}
          />
        </div>
      )}
    </section>
  );
};
export default EmployeeDetailsView;
