"use client";

import { ColumnDef } from "@tanstack/react-table";
import { TooltipContainer } from "@/components/tool-tip-container";

interface author {
  name: string;
  email: string;
  date: string;
}

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
interface ICommit {
  sha: string;
  node_id: string;
  commit: {
    author: author;
    committer: object[];
    message: string;
    tree: object[];
    url: string;
    comment_count: 0;
    verification: object[];
  };
  url: string;
  html_url: string;
  comments_url: string;
  author: {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    user_view_type: string;
    site_admin: boolean;
  };
  committer: {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    user_view_type: string;
    site_admin: boolean;
  };
  parents: object[][];
}

export const columns: ColumnDef<ICommit>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    id: "sha",
    accessorKey: "sha",
    header: "Commit SHA",
    cell: ({ row }) => {
      return (
        <TooltipContainer hoverText={row.original.sha}>
          <span className="truncate max-w-[100px] inline-block cursor-pointer">
            {row.original.sha}
          </span>
        </TooltipContainer>
      );
    },
  },
  {
    id: "committer",
    accessorKey: "committer",
    header: "Committer",
    cell: ({ row }) => {
      return <span>{row.original.committer.login}</span>;
    },
  },
  {
    id: "message",
    accessorKey: "message",
    header: "Commit msg",
    cell: ({ row }) => {
      return (
        <TooltipContainer hoverText={row.original.commit.message}>
          <span className="truncate max-w-[100px] inline-block cursor-pointer">
            {row.original.commit.message}
          </span>
        </TooltipContainer>
      );
    },
  },
  {
    id: "date",
    accessorKey: "commit.author.date",
    header: "Date",
    cell: ({ row }) => {
      const date = new Date(
        row.original.commit.author.date
      ).toLocaleDateString();
      return <span>{date}</span>;
    },
  },
  {
    id: "date-time",
    accessorKey: "commit.author.date",
    header: "Time-24hr",
    cell: ({ row }) => {
      const time = new Date(
        row.original.commit.author.date
      ).toLocaleTimeString();
      return <span>{time}</span>;
    },
  },
];
