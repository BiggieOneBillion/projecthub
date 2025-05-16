"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
// import { EditProject } from "./edit-project";
// import { DeleteProjectDialog } from "./delete-project-dialog";
import Link from "next/link";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Project = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
};

export const columns: ColumnDef<Project>[] = [
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
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Project name",
    cell: ({ row }) => {
      return (
        <Link href={`/dashboard/project/${row.original.id}`}>
          {row.original.name}
        </Link>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  // {
  //   id: "actions",
  //   cell: ({ row }) => {
  //     const payment = row.original; // used to get the details of the project and use the id to carryout delete and edit request.

  //     return (
  //       <div className="flex items-center justify-start gap-3">
  //         <EditProject />
  //         <DeleteProjectDialog />
  //       </div>
  //     );
  //   },
  // },
];
