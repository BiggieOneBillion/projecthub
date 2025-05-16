import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";

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

type Props = {
  data: DataType;
};

const EmployeeDataTable = ({ data }: Props) => {
  return (
    <>
      {data && data.employees && data.employees.length !== 0 ? (
        <section className="space-y-4">
          <section className="flex items-center gap-2 text-sm">
            <span>Project Name:</span>
            <h2 className=" px-2 py-1 rounded-md bg-black text-white font-semibold text-blacky capitalize">
              {data.projectName}
            </h2>
          </section>
          <DataTable columns={columns} data={data.employees} />
        </section>
      ) 
      : 
      null // return nothing
      }
    </>
  );
};
export default EmployeeDataTable;
