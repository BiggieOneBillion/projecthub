"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DataTableColumnHeader } from "../../project/[id]/tasks/_components/data-table-column-header";
import Link from "next/link";
// import { DeleteTaskDialog } from "./delete-task-dialog";
// import { EditTask } from "./edit-task";

export interface GitCommit {
  name: string;
  id: number;
  private: boolean;
  url: string;
  created_at: string;
  clone_url: string;
  homepage: string;
}

export const columns: ColumnDef<GitCommit>[] = [
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
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href={`/dashboard/manage-github/${data.name}`} className="truncate max-w-[200px] inline-block">
                {data.name}
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>{`${data.name}`}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
  {
    accessorKey: "clone_url",
    header: "Clone URL",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="truncate max-w-[300px] inline-block">
                {data.clone_url}
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>{`${data.clone_url}`}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
  {
    accessorKey: "homepage",
    header: "Homepage",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <a
                href={data.homepage}
                target="_blank"
                className="truncate max-w-[100px]"
              >
                {data.homepage || "N/A"}
              </a>
            </TooltipTrigger>
            <TooltipContent>
              <p>{`${data.homepage || "N/A"}`}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => {
      const data = row.original;
      const date = new Date(data.created_at).toLocaleDateString();
      return <span>{date}</span>;
    },
  },
  {
    accessorKey: "private",
    header: "Private",
    cell: ({ row }) => {
      const data = row.original;

      return (
        <span
          className={`px-2 py-1 font-medium text-white ${
            data.private ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {data.private.toString()}
        </span>
      );
    },
  },

  //   {
  //     id: "actions",
  //     // cell: ({ row }) => <DataTableRowActions row={row} />,
  //     cell: ({ row }) => (
  //       <div className="flex items-center gap-3">
  //         <EditTask id={row.original.taskId} />
  //         <DeleteTaskDialog id={row.original.taskId} />
  //       </div>
  //     ),
  //   },
];
