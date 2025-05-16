"use client";

// import { FolderGit, GitBranch, GitCommitVertical, GitFork } from "lucide-react";
import ListOfCommit from "./lists-of-commit";
import ListOfBranches from "./lists-of-branches";
import Header from "@/components/header";

interface Props {
  repo: string;
}

const RepoInfoView = ({ repo }: Props) => {

  return (
    <section>
      <header className="flex flex-col gap-5">
        <Header title="Git Repository Info" />
        <p className=" font-medium text-gray-600 flex items-center gap-2">
          <span>Repository Name:</span>
          <span className="font-semibold underline">{repo}</span>
        </p>
        {/* <section className="flex items-center gap-5">
          <div className="flex items-center gap-1">
            <FolderGit className="h-3 w-3 text-sm" />
            <span>-</span>
            <span className="text-sm font-semibold">29</span>
          </div>
          <div className="flex items-center gap-1">
            <GitFork className="h-3 w-3 text-sm" />
            <span>-</span>
            <span className="text-sm font-semibold">0</span>
          </div>
          <div className="flex items-center gap-1">
            <GitBranch className="h-3 w-3 text-sm" />
            <span>-</span>
            <span className="text-sm font-semibold">0</span>
          </div>
          <div className="flex items-center gap-1">
            <GitCommitVertical className="h-3 w-3 text-sm" />
            <span>-</span>
            <span className="text-sm font-semibold">0</span>
          </div>
        </section> */}
      </header>
      {/* main */}
      <main className="w-full overflow-auto grid md:grid-cols-4 gap-10 py-10">
        {/* list of commits */}
        <ListOfCommit />
        {/* list of branches */}
        <ListOfBranches />
      </main>
    </section>
  );
};
export default RepoInfoView;
