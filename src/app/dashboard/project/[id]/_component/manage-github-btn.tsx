"use client";

import { useAuthStore } from "@/store/user-store";
import { ArrowUpRight } from "lucide-react";
import { useRouter } from "next/navigation";

const ManageGitHubBtn = () => {

  const router = useRouter();

  const handleManageGitHub = () => {
    router.push("dashboard/manage-github");
  };

  const { details } = useAuthStore();

  return (
    <button
      className={`text-sm font-semibold text-white bg-black rounded-md px-2 py-1 flex items-center gap-2 disabled:bg-black/40 disabled:cursor-none`}
      onClick={handleManageGitHub}
      disabled={!details.gitName} // disabled if user has not connected their GitHub account
    >
      Manage GitHub
      <ArrowUpRight className="h-3 w-3" />
    </button>
  );
};
export default ManageGitHubBtn;
