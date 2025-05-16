"use client";

import { useGetAllEmployees } from "@/lib/query";
import { useAuthStore } from "@/store/user-store";
import EmployeeDataTable from "./employees-data-table";
import { v4 } from "uuid";
import { Table } from "lucide-react";

export interface DataType {
  projectName: string;
  employees: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    projectRole: string;
  }[];
}

const EmployeeView = () => {
  const { details } = useAuthStore();
  const { data, isLoading } = useGetAllEmployees(details.id);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <section className="space-y-10">
      {data &&
        data.data &&
        data.data.map((el: DataType) => (
          <EmployeeDataTable key={v4()} data={el} />
        ))}
      {data && data.data && data.data.length === 0 && (
        <p className="text-lg font-bold text-black/10">No Employee</p>
      )}
    </section>
  );
};
export default EmployeeView;
