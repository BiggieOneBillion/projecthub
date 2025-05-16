"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthStore } from "@/store/user-store";
import { UseQueryResult } from "@tanstack/react-query";
import axios from "axios";
import { Loader2Icon } from "lucide-react";
import { useParams } from "next/navigation";
import { ReactNode, useEffect, useState, useTransition } from "react";

interface IinfoCard {
  title: string;
  children: ReactNode;
  description: string;
  repoName: string;
}

export default function InfoCardCommitCount({
  title,
  children,
  description,
  repoName,
}: IinfoCard) {
  const params = useParams();

  const [isPending, startTransition] = useTransition();
  const [data, setData] = useState<number | null>(null);

  const { details } = useAuthStore();

  useEffect(() => {
    startTransition(async () => {
      try {
        const res = await axios.get(
          `/api/github/commit-count?repoName=${repoName}&owner=${details.gitName}`
        );
        // // console.log"COMMIT COUNT", res.data);
        setData(res.data.data);
      } catch (_error) {
        // console.log"Error in getting Commits in a repos", _error);
      }
    });
  }, []);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <span className="h-4 w-4 text-muted-foreground">{children}</span>
      </CardHeader>
      <CardContent>
        <section className="flex items-center gap-1">
          {data ? (
            <div className="text-2xl font-bold">{data}</div>
          ) : (
            <div className="text-xl text-black/10 font-bold">
              No commits yet
            </div>
          )}
          {isPending && <Loader2Icon className="animate-spin text-xl" />}
        </section>
        <p className="text-xs text-muted-foreground">{description}</p>
        <p className="text-xs text-muted-foreground underline mt-2">
          Note that commits will not show except you setup monitoring.
        </p>
      </CardContent>
    </Card>
  );
}
