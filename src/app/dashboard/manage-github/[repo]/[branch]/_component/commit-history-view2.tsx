import type React from "react";
import { useState } from "react";
import { ICommitData } from "./branch-page-view";
import { useParams } from "next/navigation";
import { GitBranch } from "lucide-react";

interface CommitHistoryViewerProps {
  commits: ICommitData[];
}

const CommitHistoryViewer: React.FC<CommitHistoryViewerProps> = ({
  commits,
}) => {
  const [expandedCommit, setExpandedCommit] = useState<string | null>(null);

  const toggleCommit = (sha: string) => {
    setExpandedCommit(expandedCommit === sha ? null : sha);
  };

  const params = useParams();

  return (
    <div className="max-w-4xl mx-autoy p-2">
      <h1 className=" font-semibold mb-6 capitalize underline text-gray-400 flex items-center gap-2">
        <span>{params.branch} Branch</span>
        <GitBranch className="h-4 w-4" />
      </h1>
      <ul className="space-y-4">
        {commits.map((commit) => (
          <li
            key={commit.sha}
            className="border rounded-lg p-4 bg-white shadow-sm"
          >
            <div
              className="flex flex-col gap-2 items-start justify-between cursor-pointer w-full"
              onClick={() => toggleCommit(commit.sha)}
            >
              <div className="flex items-start space-x-4">
                <img
                  src={commit.author.avatar_url || "/placeholder.svg"}
                  alt={commit.author.login}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h2 className="font-semibold">{commit.commit.author.name}</h2>
                  <p className="text-sm text-gray-500">
                    {new Date(commit.commit.author.date).toLocaleString()}
                  </p>
                  <p className="mt-2 text-sm capitalize">
                    {commit.commit.message}
                  </p>
                </div>
              </div>
              <div className="text-right flex-shrink-0 w-full">
                <p className="text-sm font-mono">
                  {commit.sha.substring(0, 7)}
                </p>
                <p className="text-xs text-gray-500">
                  {commit.stats.additions} additions, {commit.stats.deletions}{" "}
                  deletions
                </p>
              </div>
            </div>
            {expandedCommit === commit.sha && (
              <div className="mt-4 pt-4 border-t">
                <h3 className="font-semibold mb-2">Files changed:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {commit.files?.map((file) => (
                    <li key={file.filename} className="text-sm">
                      {file.filename} ({file.additions} additions,{" "}
                      {file.deletions} deletions)
                    </li>
                  ))}
                </ul>
                <a
                  href={commit.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block text-blue-500 hover:underline"
                >
                  View on GitHub
                </a>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommitHistoryViewer;
