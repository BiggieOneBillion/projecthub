"use client";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { useGetProjectCommits } from "@/lib/query";
import { useAuthStore } from "@/store/user-store";

export default function CommitTable({ projectId }: { projectId: string }) {
  const { details } = useAuthStore();
  // get the data about the commit and pass it as data to the data-table
  const { data, isLoading, isError } = useGetProjectCommits(
    projectId,
    details.gitName
  );
  if (isLoading) {
    return <div className="font-semibold text-black">Loading...</div>;
  }

  if (isError) {
    return <div className="font-semibold text-black">Error fetching data</div>;
  }

  if (!data) {
    return <div className="font-semibold text-black">Network Error</div>;
  }

  return (
    <DataTable columns={columns} data={data && data.data ? data.data : []} />
  );
}
