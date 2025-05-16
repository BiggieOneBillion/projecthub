"use client";

import {
  ArrowUpRight,
  ChevronLeft,
  ClipboardCheck,
  Loader2Icon,
  Users,
} from "lucide-react";
import InfoCard from "./info-card";
import { v4 } from "uuid";
import TaskListCard from "./task-list-card";
import ProjectEmployeeInfo from "./project-employee-info";
import { AddTaskDialog } from "./add-task-dialog";
import { AddEmployeeDialog } from "./add-employee-dialog";
import { useRouter } from "next/navigation";
import {
  useGetProject,
  useGetProjectEmployees,
  useGetProjectTask,
} from "@/lib/query";
import SetUpWebhooksBtn from "./set-up-webhooks-btn";
import InfoCardCommitCount from "./info-card-commit-count";
import Link from "next/link";

interface IProjectDetailsView {
  id: string;
}

const configStatistics = [
  {
    icon: <ClipboardCheck />,
    title: "Task",
    description: "Amount of task on the project",
  },
  {
    icon: <Users />,
    title: "Employees",
    description: "Number of employees on the project",
  },
];

const ProjectDetailsView = ({ id }: IProjectDetailsView) => {
  const router = useRouter();
  const { data, isLoading } = useGetProject(id);
  const isGitProject = data && data.data && data.data.onGithub;
  const repoName = data && data.data && data.data.name;
  const isMonitored = data && data.data && data.data.isMonitored;
  return (
    <main className="space-y-5 lg:p-10">
      <header className="flex flex-col md:flex-row md:items-center justify-start gap-5 md:gap-10">
        {/* header start */}
        <div className="flex items-center justify-start gap-5">
          <button onClick={() => router.back()} className=" border">
            <ChevronLeft size={20} />
          </button>
          <h2 className="font-semibold lg:text-2xl text-black max-w-[300px] truncate capitalize">
            {isLoading && (
              <p className="flex items-center gap-1 text-base">
                <Loader2Icon className="animate-spin" size={14} />
                Loading...
              </p>
            )}
            {repoName}
          </h2>
        </div>
        <p className="text-sm font-normal text-gray-500 md:hidden">This is the project details page, here you can view and manage your project</p>
        {/* actions */}
        <section className="grid grid-cols-2 md:flex md:flex-row items-start md:items-center justify-start gap-4">
          <AddTaskDialog />
          <AddEmployeeDialog />
          {isGitProject && (
            <>
              <SetUpWebhooksBtn isMonitored={isMonitored} repoName={repoName} />
              <Link
                href={`/dashboard/project/${id}/commits`}
                className="text-sm font-medium capitalize text-white bg-black rounded-md px-2 py-2 md:py-1 flex items-center gap-1"
              >
                see commits
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </>
          )}
        </section>
      </header>
      {/* tables and statics */}
      <section className="w-full space-y-10">
        {/* statistics */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-10">
          <InfoCard
            key={v4()}
            title={configStatistics[0].title}
            description={configStatistics[0].description}
            getData={useGetProjectTask}
          >
            {configStatistics[0].icon}
          </InfoCard>
          <InfoCard
            key={v4()}
            title={configStatistics[1].title}
            description={configStatistics[1].description}
            getData={useGetProjectEmployees}
          >
            {configStatistics[1].icon}
          </InfoCard>

          {isGitProject && (
            <InfoCardCommitCount
              key={v4()}
              title="Commits"
              description="Number of commits on the project"
              repoName={repoName}
            >
              <ClipboardCheck />
            </InfoCardCommitCount>
          )}
        </div>
        <section className="grid lg:grid-cols-2 gap-4">
          <div className="col-span-1">
            <TaskListCard />
          </div>
          <ProjectEmployeeInfo />
        </section>
      </section>
    </main>
  );
};
export default ProjectDetailsView;
