"use client";
import { columns } from "./_component/columns";
import { DataTable } from "@/components/ui/data-table";
import { AddNewProject } from "./_component/add-new-project";
import { useAuthStore } from "@/store/user-store";
import { useGetProjects } from "@/lib/query";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Checking from "./_component/checking";
import ConnectToGitBtn from "./_component/connect-to-git-button";
import ManageGitHubBtn from "./project/[id]/_component/manage-github-btn";

export default function Page() {
  const { details } = useAuthStore();

  const searchParams = useSearchParams();

  const [modal, setModal] = useState(false);

  const [btnText, setBtnText] = useState("Connect with github");

  const { data, isLoading, isError, refetch } = useGetProjects(details.id);

  useEffect(() => {
    if (searchParams.get("t")) {
      setModal(true);
    }
  }, [searchParams]);

  if (isLoading) {
    return <p className="text-lg text-black font-medium">Loading..</p>;
  }

  if (isError) {
    return (
      <div className="flex items-center gap-1">
        <p className="font-medium">Error fetching data</p>
        <button
          onClick={() => refetch()}
          className="px-2 py-1 border text-sm font-medium"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-2 md:py-10 flex flex-col gap-10">
      <header className="flex flex-col gap-2 md:gap-0 md:flex-row  md:items-end justify-between">
        <section className="space-y-3">
          <h1 className="text-2xl font-semibold">Project List</h1>
          <p className="flex flex-col text-sm text-gray-500">
            <span>This is a table containing all of your projects</span>
            <span>
              Your can click the last column to edit or delete project
            </span>
          </p>
          <div className="flex items-center gap-3">
            <ConnectToGitBtn btnText={btnText} updateText={setBtnText} />
            <ManageGitHubBtn />
          </div>
        </section>
        <section>
          <AddNewProject />
        </section>
      </header>
      <section className="lg:w-full max-w-full">
        <div className="overflow-x-auto w-full">
          <DataTable
            columns={columns}
            data={data && data.data ? data.data : []}
          />
        </div>
      </section>
      {modal && (
        <Checking close={() => setModal(false)} updateText={setBtnText} />
      )}
    </div>
  );
}
