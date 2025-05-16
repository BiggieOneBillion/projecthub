"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetProjectEmployees } from "@/lib/query";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { v4 } from "uuid";

interface IDatum {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  projectRole: string;
}

export default function ProjectEmployeeInfo() {
  const params = useParams();

  const { data, isLoading, isError, refetch } = useGetProjectEmployees(
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
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="w-full flex items-center justify-between gap-10">
            <p className="flex flex-col">
              <span className="text-xl md:text-2xl">Project Employee</span>
              <span className="text-gray-400 text-sm font-light">
                List of employees assigned to the project
              </span>
            </p>
            <Button asChild size="sm" className="ml-auto gap-1">
              <Link href={`/dashboard/project/${params.id}/employees`}>
                {" "}
                {/* link to all the task in the project */}
                View All
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-8">
        {data.data.length === 0 && (
          <p className="text-2xl font-extrabold text-black/20">
            No Employee Under This Project
          </p>
        )}
        {data.data.length > 0 &&
          data.data.map((datum: IDatum) => (
            <div key={v4()} className="flex items-center gap-4">
              <Avatar className="hidden h-9 w-9 sm:flex">
                <AvatarImage src="/avatars/01.png" alt="Avatar" />
                <AvatarFallback className="uppercase">{`${datum.firstName.slice(
                  0,
                  1
                )}${datum.lastName.slice(0, 1)}`}</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">{`${datum.firstName} ${datum.lastName}`}</p>
                <p className="text-sm text-muted-foreground">{datum.email}</p>
              </div>
              <div className="ml-auto font-medium capitalize">
                {datum.projectRole}
              </div>
            </div>
          ))}
      </CardContent>
    </Card>
  );
}
