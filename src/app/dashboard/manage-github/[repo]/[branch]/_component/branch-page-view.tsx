"use client";

import { useGetRepoSingleBranch } from "@/lib/git-repo";
import { useAuthStore } from "@/store/user-store";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import CommitHistory from "./commit-history";
import CommitHistoryViewer from "./commit-history-view2";
import { ArrowBigLeft, ArrowBigLeftIcon, ChevronLeft } from "lucide-react";
import Header from "@/components/header";

interface Props {
  branch: string;
}

interface IBranch {
  name: string;
}

interface commit {
  author: {
    name: string;
    email: string;
    date: string;
  };
  committer: {
    name: string;
    email: string;
    date: string;
  };
  message: string;
  tree: {
    sha: string;
    url: string;
  };
  url: string;
  comment_count: number;
  verification: {
    verified: boolean;
    reason: string;
    signature: null;
    payload: null;
    verified_at: null;
  };
}

interface author {
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
  site_admin: boolean;
}

interface committer {
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
}

interface parent {
  sha: string;
  url: string;
  html_url: string;
}

interface stats {
  total: number;
  additions: number;
  deletions: number;
}

interface files {
  sha: string;
  filename: string;
  status: string;
  additions: number;
  deletions: number;
  changes: number;
  blob_url: string;
  raw_url: string;
  contents_url: string;
  patch: string;
}
export interface ICommitData {
  sha: string;
  commit: commit;
  url: string;
  author: author;
  committer: committer;
  parents: parent[];
  stats: stats;
  files: files[];
  html_url: string;
}

const BranchPageView = ({ branch }: Props) => {
  const { details } = useAuthStore();

  const params = useParams();

  const [isPending, startTransition] = useTransition();

  const [displayedData, setDisplayedData] = useState<ICommitData[] | null>();

  console.log(params);

  const { data, isLoading } = useGetRepoSingleBranch(
    details.gitName!,
    params.repo! as string,
    branch
  );

  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const handleFetch = async (
    sha: string,
    depth = 0,
    maxDepth = 10
  ): Promise<any[]> => {
    console.log("SHA", sha);
    try {
      // Add authorization header for higher rate limits
      const res = await axios.get(
        `/api/github-repo/repo-branch-commits?owner=${
          details.gitName
        }&repoName=${params.repo! as string}&sha=${sha}`
      );

      // console.log("RESPONSE FROM AXIOS", res.data);
      // Create commit history array
      const commitHistory = [res.data.data];

      // Check depth and parents before recursing
      if (depth < maxDepth && res.data.data.parents.length > 0) {
        const parentCommits = await handleFetch(
          res.data.data.parents[0].sha,
          depth + 1,
          maxDepth
        );
        return [...commitHistory, ...parentCommits];
      }

      return commitHistory;
    } catch (error) {
      console.error("Error fetching commit:", error);
      return [];
    }
  };

  // Update useEffect to handle the returned data
  useEffect(() => {
    const fetchCommitHistory = async () => {
      if (data?.data) {
        try {
          startTransition(async () => {
            const history = await handleFetch(data.data.commit.sha);
            console.log("Complete commit history:", history);

            setDisplayedData(history);
            // Do something with the history array
          });
        } catch (error) {
          console.error("Error in commit history fetch:", error);
        }
      }
    };

    fetchCommitHistory();
  }, [data]);

  return (
    <section className="space-y-5">
      <Header title="Branch Commit History" />
      {isPending && <p className="font-medium text-black">...Loading</p>}
      {/* display info */}
      {displayedData && <CommitHistoryViewer commits={displayedData || []} />}
    </section>
  );
};
export default BranchPageView;
