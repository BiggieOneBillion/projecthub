import type React from "react"
import { format } from "date-fns"
import { GitCommit, FileText, Plus, Minus } from "lucide-react"
import { ICommitData } from "./branch-page-view"
import Image from "next/image"

interface CommitHistoryProps {
  commits: ICommitData[]
}

const CommitHistory: React.FC<CommitHistoryProps> = ({ commits }) => {
  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Commit History</h1>
      <div className="max-w-4xl mx-auto">
        {commits.map((commit) => (
          <div key={commit.sha} className="bg-white rounded-lg shadow-md mb-6 p-6">
            <div className="flex items-center mb-4">
              <Image
                src={commit.author.avatar_url || "/placeholder.svg"}
                alt={commit.author.login}
                className="w-10 h-10 rounded-full mr-4"
              />
              <div>
                <h2 className="text-xl font-semibold text-gray-800">{commit.commit.author.name}</h2>
                <p className="text-sm text-gray-600">{format(new Date(commit.commit.author.date), "PPpp")}</p>
              </div>
            </div>
            <p className="text-gray-700 mb-4">{commit.commit.message}</p>
            <div className="flex items-center text-sm text-gray-600 mb-4">
              <GitCommit className="mr-2" size={16} />
              <a href={commit.html_url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                {commit.sha.substring(0, 7)}
              </a>
            </div>
            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Files Changed</h3>
              {commit.files.map((file) => (
                <div key={file.filename} className="flex items-center justify-between py-2">
                  <div className="flex items-center">
                    <FileText className="mr-2" size={16} />
                    <span className="text-sm text-gray-700">{file.filename}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-green-600 mr-2">
                      <Plus size={14} className="inline mr-1" />
                      {file.additions}
                    </span>
                    <span className="text-sm text-red-600">
                      <Minus size={14} className="inline mr-1" />
                      {file.deletions}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CommitHistory

