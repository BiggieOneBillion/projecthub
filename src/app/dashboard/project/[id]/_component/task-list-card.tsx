"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useParams } from "next/navigation";
import { v4 } from "uuid";
import { useGetProjectTask } from "@/lib/query";

export interface ITask {
  _id: string;
  name: string;
  taskId: string;
  status: string;
  priority: string;
  label: string;
  projectId: string;
  assignedTo: [
    {
      _id: string;
      firstName: string;
      lastName: string;
      email: string;
    }
  ];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export default function TaskListCard() {
  const params = useParams();

  const { data, isLoading, isError, refetch } = useGetProjectTask(
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
    <Card className="xl:col-span-2">
      <CardHeader className="flex flex-row items-center">
        <div className="grid lg:gap-2">
          <CardTitle className="text-xl md:text-2xl">Project Task</CardTitle>
          <CardDescription className="text-gray-500">List of task under this project</CardDescription>
        </div>
        <Button asChild size="sm" className="ml-auto gap-1">
          <Link href={`/dashboard/project/${params.id}/tasks`}>
            {" "}
            {/* link to all the task in the project */}
            View All
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        {data?.data.length === 0 ? (
          <p className="text-2xl font-extrabold text-black/20">No Task</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Task</TableHead>
                <TableHead className="hidden xl:table-column">Type</TableHead>
                <TableHead className="hidden xl:table-column">Status</TableHead>
                <TableHead className="hidden xl:table-column">Date</TableHead>
                <TableHead className="hidden text-right">Assigned To</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.data.map((datum: ITask) => (
                <TableRow key={v4()}>
                  <TableCell>
                    <div className="space-y-2">
                      <div className="font-medium w-full truncate">
                        {datum.name}
                      </div>
                      <div className="hidden text-sm text-muted-foreground md:flex items-center gap-1 flex-wrap">
                        <Badge variant="default" className="capitalize">
                          {datum.label}
                        </Badge>
                        <Badge variant="outline" className="capitalize">
                          {datum.priority}
                        </Badge>
                        <Badge variant="outline" className="capitalize">
                          {datum.status}
                        </Badge>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden xl:table-column">Sale</TableCell>
                  <TableCell className="hidden xl:table-column">
                    <Badge className="text-xs" variant="outline">
                      Approved
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                    2023-06-23
                  </TableCell>
                  <TableCell className="text-right hidden">$250.00</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
