"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DataTable } from "@/components/ui/data-table";
import { columns, GitCommit } from "./column";
import Header from "@/components/header";
import { useGetAllRepo } from "@/lib/git-repo";

export default function ManageGithubView() {
  const { data, isLoading, isError, refetch } = useGetAllRepo();

  const sortDatesDescending = (dates: GitCommit[]): GitCommit[] => {
    return dates.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  };

  if (isError) {
    return (
      <p className="flex items-center gap-1">
        <span>Error Loading data</span>
        <button onClick={() => refetch()}>Retry</button>
      </p>
    );
  }

  return (
    <section className="space-y-5">
      <header className="flex items-center justify-between">
        <Header title="GitHub Repos" />
        <section className="flex items-center gap-2">
          <p className="text-sm font-medium text-gray-500">BiggieOneBillion</p>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </section>
      </header>
      {isLoading && <p>....Loading</p>}

      {data && data.data && (
        <DataTable
          columns={columns}
          data={data.data.length > 0 ? sortDatesDescending(data.data) : []}
        />
      )}
    </section>
  );
}
