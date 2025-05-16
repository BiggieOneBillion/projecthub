"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";

interface Props {
  repoName: string;
  isMonitored: boolean;
}

const SetUpWebhooksBtn = ({ repoName, isMonitored }: Props) => {
  const [isPending, startTransition] = useTransition();
  const [btnText, setBtnText] = useState("Set Up Monitoring");
  const params = useParams();

  const handleConnect = () => {
    startTransition(async () => {
      try {
        // set up montoring hook
        await axios.post("/api/github/set-up-webhooks", {
          repoName,
          owner: "BiggieOneBillion",
        });
        // update the project info, that is update the isMonitored value to true.
        await axios.put(`/api/project/${params.id}`, {
          isMonitored: true,
        });
        toast.success("Monitoring Set Up Successfully");
        setBtnText("Monitoring!!");
      } catch (error) {
        toast.error("Error Setting Up Monitoring");
        console.error("Error Setting Up Monitoring", error);
        setBtnText("Try again!!");
      }
    });
  };

  useEffect(() => {
    if (isMonitored) {
      setBtnText("Monitored");
    }
  }, [isMonitored]);

  //! Also set up useEffect to check the project properties and check if monitoring is set up on a project,
  //! if set up then disable the button and change the btn text to the text "monitored"

  return (
    <>
      <button
        onClick={handleConnect}
        disabled={isPending || isMonitored}
        className="text-sm font-medium text-white bg-black rounded-md px-2 py-2 md:py-1 disabled:bg-black/70 disabled:cursor-not-allowed"
      >
        {isPending ? "..Loading" : btnText}
      </button>
    </>
  );
};
export default SetUpWebhooksBtn;
