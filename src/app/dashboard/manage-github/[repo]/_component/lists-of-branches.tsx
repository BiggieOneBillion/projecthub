"use client";
import { useGetRepoBranches, useGetRepoCommits } from "@/lib/git-repo";
import { useAuthStore } from "@/store/user-store";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useParams } from "next/navigation";
import { v4 } from "uuid";
import Link from "next/link";

interface IBranch {
  name: string;
  commit: {
    sha: string;
    url: string;
  };
}

const ListOfBranches = () => {
  const params = useParams();
  const { details } = useAuthStore();

  const { data, isLoading } = useGetRepoBranches(
    details.gitName,
    params.repo! as string
  );

  if (isLoading) {
    return <p className="text-sm font-medium text-black">...Loading</p>;
  }

  // console.log("REPO BRANCHES", data);

  return (
    <Card className="xl:col-span-2">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Repo Branches</CardTitle>
          <CardDescription>Repository branch list</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        {data?.data.length === 0 ? (
          <p className="text-2xl font-extrabold text-black/20">No Branch Info</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Branch Name</TableHead>
                <TableHead>Latest Commit Sha</TableHead>
                <TableHead>Latest Commit Url</TableHead>
                <TableHead className="hidden xl:table-column">Date</TableHead>
                <TableHead className="hidden text-right">Assigned To</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data &&
                data.data.map((datum: IBranch) => (
                  <TableRow key={v4()}>
                    <TableCell>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Link
                              href={`/dashboard/manage-github/${params.repo}/${datum.name}`}
                              className="font-medium w-[100px] truncate"
                            >
                              {datum.name}
                            </Link>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{datum.name}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                    <TableCell>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <p className="font-medium w-[100px] truncate">
                              {datum.commit.sha}
                            </p>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{datum.commit.sha}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                    <TableCell>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <p className="font-medium w-[100px] truncate">
                              {datum.commit.url}
                            </p>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{datum.commit.url}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                    <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                      2023-06-23
                    </TableCell>
                    <TableCell className="text-right hidden">$250.00</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};
export default ListOfBranches;
