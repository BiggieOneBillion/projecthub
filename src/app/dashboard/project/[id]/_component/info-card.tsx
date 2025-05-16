"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UseQueryResult } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import { useParams } from "next/navigation";
import { ReactNode } from "react";

interface IinfoCard {
  title: string;
  children: ReactNode;
  description: string;
  getData<T>(projectId: string): UseQueryResult<T, Error>;
}

export default function InfoCard({
  title,
  children,
  description,
  getData,
}: IinfoCard) {
  const params = useParams();

  const { data, isLoading } =
    getData(params.id as string);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <span className="h-4 w-4 text-muted-foreground">{children}</span>
      </CardHeader>
      <CardContent>
        {data && data.data && (
          <div className="text-2xl font-bold">{data.data?.length}</div>
        )}
        {isLoading && <Loader2Icon className="animate-spin" />}
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
