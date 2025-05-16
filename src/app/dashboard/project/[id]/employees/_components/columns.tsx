"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DeleteEmployeeDialog } from "./delete-employee-dialog";
import { EditEmployee } from "./edit-employee";


export interface IColumnEmployee {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  projectRole: string;
}

export const columns: ColumnDef<IColumnEmployee>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "firstName",
    header: "First Name",
    cell: ({ row }) => (
      <span className="black capitalize">{row.original.firstName}</span>
    ),
  },
  {
    id: "lastName",
    header: "Last Name",
    cell: ({ row }) => (
      <span className="black capitalize">{row.original.lastName}</span>
    ),
  },
  {
    id: "email",
    header: "Email",
    cell: ({ row }) => <span className="black">{row.original.email}</span>,
  },
  {
    id: "projectRole",
    header: "Project Role",
    cell: ({ row }) => (
      <span className="black capitalize ">{row.original.projectRole}</span>
    ),
  },
  {
    id: "actions",
    // cell: ({ row }) => <DataTableRowActions row={row} />,
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <EditEmployee data={row.original} />
        <DeleteEmployeeDialog id={row.original._id} />
      </div>
    ),
  },
];
