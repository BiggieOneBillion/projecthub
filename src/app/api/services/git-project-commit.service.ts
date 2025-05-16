import { GitProjectCommit } from "@/model/db-model-in-use";

export interface ICommit {
  sha: string;
  message: string;
  author: string;
  date: string;
  committer: string;
  project_name: string;
  branch: string;
}

export const GitProjectCommitController = {
  async createGitCommit(commitData: ICommit) {
    try {
      const commit = await GitProjectCommit.create(commitData);
      return commit;
    } catch (error) {
      throw new Error(
        `Error creating project commit: ${(error as Error).message}`
      );
    }
  },
};
