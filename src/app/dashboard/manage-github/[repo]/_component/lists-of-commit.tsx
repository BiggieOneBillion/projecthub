"use client";
import { useGetRepoCommits } from "@/lib/git-repo";
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

interface ICommit {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
    };
    committer: {
      name: string;
      email: string;
      date: string;
    };
  };
}

const ListOfCommit = () => {
  const params = useParams();
  const { details } = useAuthStore();

  const { data, isLoading, isError } = useGetRepoCommits(
    details.gitName,
    params.repo! as string
  );

  if (isLoading) {
    return <p className="text-sm font-medium text-black">...Loading</p>;
  }

  // console.log("LOADING REPO COMMITS", data);

  return (
    <Card className="xl:col-span-2">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Repo Commit</CardTitle>
          <CardDescription>Commit List</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        {data &&
          (data.message as string).includes("Git Repository is empty") && (
            <p className="font-extrabold text-2xl text-black/10">
              No data available
            </p>
          )}
        {data && data.data && data.data.length > 0 && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sha</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Committer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="hidden text-right">Assigned To</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data &&
                data.data &&
                data.data.map((datum: ICommit) => (
                  <TableRow key={v4()}>
                    <TableCell>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <p className="font-medium w-[100px] truncate">
                              {datum.sha}
                            </p>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{datum.sha}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                    <TableCell>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <p className="font-medium w-[100px] truncate">
                              {datum.commit.message}
                            </p>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{datum.commit.message}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                    <TableCell>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <p className="font-medium w-[100px] truncate">
                              {datum.commit.author.name}
                            </p>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{datum.commit.author.name}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                    <TableCell>
                      {new Date(
                        datum.commit.committer.date
                      ).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                      2023-06-23
                    </TableCell>
                    <TableCell className="text-right hidden">$250.00</TableCell>
                  </TableRow>
                ))}
              {data && data.data && data.data.length === 0 && (
                <p className="font-extrabold text-xl text-black/10">
                  No data available
                </p>
              )}
              {isError && (
                <p className="font-extrabold text-xl text-black/10">
                  Error Loading Data
                </p>
              )}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};
export default ListOfCommit;
