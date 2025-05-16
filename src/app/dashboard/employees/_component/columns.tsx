"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
// import { Checkbox } from "@/components/ui/checkbox";
// import Link from "next/link";
// import { TooltipContainer } from "@/components/tool-tip-container";

interface IEmployees {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  projectRole: string;
}

export const columns: ColumnDef<IEmployees>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    id: "firstName",
    accessorKey: "firstName",
    header: "First Name",
    cell: ({ row }) => {
      return (
        <Link
          href={`/dashboard/employees/${row.original._id}`}
          className="capitalize"
        >
          {row.original.firstName}
        </Link>
      );
    },
  },
  {
    id: "lastName",
    accessorKey: "lastName",
    header: "Last Name",
    cell: ({ row }) => {
      return <span className="capitalize">{row.original.lastName}</span>;
    },
  },
  {
    id: "email",
    accessorKey: "email",
    header: "email",
  },
  {
    id: "projectRole",
    accessorKey: "projectRole",
    header: "Project Role",
  },
];
