"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/app/dashboard/project/[id]/tasks/_components/data-table-column-header";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Task = {
  _id: string;
  name: string;
  taskId: string;
  status: "todo" | "in-progress" | "done";
  priority: "low" | "medium" | "high";
  label: string;
  projectId: {
    _id: string;
    name: string;
  };
  assignedTo: string[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
};

export const columns: ColumnDef<Task>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
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
    accessorKey: "taskId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Task ID" />
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Task" />
    ),
  },

  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return <Badge variant="outline">{status}</Badge>;
    },
  },
  {
    accessorKey: "priority",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Priority" />
    ),
  },
  {
    accessorKey: "label",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Label" />
    ),
  },
  {
    accessorKey: "projectId.name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Project" />
    ),
  },
//   {
//     accessorKey: "assignedTo",
//     header: ({ column }) => (
//       <DataTableColumnHeader column={column} title="Assigned To" />
//     ),
//     cell: ({ row }) => {
//       const assignedTo = row.getValue("assignedTo") as string[];
//       return <div>{assignedTo.length} assignee(s)</div>;
//     },
//   },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      return <div>{date.toLocaleDateString()}</div>;
    },
  },
];
