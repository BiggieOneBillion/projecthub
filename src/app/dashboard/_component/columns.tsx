"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { EditProject } from "./edit-project";
import { DeleteProjectDialog } from "./delete-project-dialog";
import Link from "next/link";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Project = {
  _id: string;
  name: string;
  description: string;
  isMonitored: boolean;
  onGithub: boolean;
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
    id: "name",
    accessorKey: "name",
    header: "Project name",
    cell: ({ row }) => {
      return (
        <Link href={`/dashboard/project/${row.original._id}`}>
          {row.original.name}
        </Link>
      );
    },
  },
  {
    id: "description",
    accessorKey: "description",
    header: "Description",
  },
  {
    id: "createdAt",
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt).toLocaleDateString();
      return <span>{date}</span>;
    },
  },
  {
    id: "onGithub",
    accessorKey: "onGithub",
    header: "Github",
    cell: ({ row }) => {
      // alert(row.original.onGithub);
      return (
        <span
          className={`px-2 py-1 rounded-md ${
            row.original.onGithub ? "bg-green-700" : "bg-red-700"
          } font-medium text-sm text-white`}
        >
          {row.original.onGithub.toString()}
        </span>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const data = row.original; // used to get the details of the project and use the id to carryout delete and edit request.
      return (
        <div className="flex items-center justify-start gap-3">
          <EditProject
            data={{
              description: data.description,
              projectName: data.name,
              id: data._id,
            }}
          />
          <DeleteProjectDialog
            id={data._id}
            projectName={data.name}
            onGitHub={data.onGithub}
          />
        </div>
      );
    },
  },
];
