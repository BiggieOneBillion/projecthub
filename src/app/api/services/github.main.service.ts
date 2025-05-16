import { Octokit } from "@octokit/rest";
import axios, { AxiosError } from "axios";

export const GitHubController = {
  // get users information
  async getUserInfo(accessToken: string): Promise<any> {
    const url = "https://api.github.com/user";
    const headers = {
      Authorization: `token ${accessToken}`,
      Accept: "application/vnd.github.v3+json",
    };

    try {
      const response = await axios.get(url, { headers });
      return response.data;
    } catch (error) {
      console.error("Failed to fetch user details:", error);
      throw new Error(`Error fetching user details:
        ${(error as AxiosError).response?.data || error}`);
    }
  },
  // fetching repos
  async fetchUserRepos(accessToken: string) {
    try {
      const response = await axios.get("https://api.github.com/user/repos", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/vnd.github.v3+json",
        },
      });

      // console.log"Repositories:", response.data);
      return response.data;
    } catch (error) {
      console.error(
        "Error fetching repositories:",
        (error as AxiosError).response?.data || error
      );
      throw new Error(`Error fetching repositories:
        ${(error as AxiosError).response?.data || error}`);
    }
  },
  //   creating repos
  async createRepository(
    accessToken: string,
    repoName: string,
    description = "",
    isPrivate = false
  ) {
    try {
      const octokit = new Octokit({
        auth: accessToken,
      });

      const response = await octokit.request("POST /user/repos", {
        name: repoName,
        description: description,
        homepage: "https://github.com",
        private: isPrivate,
        is_template: true,
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      });

      // // console.log"Repository Created:", response.data);

      return response.data;
    } catch (error) {
      console.error(
        "Error creating repository:",
        (error as AxiosError).response?.data || error
      );
      throw new Error(`Error creating repository: ${(error as Error).message}`);
    }
  },
  // set up monitoring
  async monitorRepository(accessCode: string, owner: string, repoName: string) {
    try {
      const octokit = new Octokit({
        auth: accessCode,
      });
      // console.log"MONITORING PROJECT", owner, repoName.replace(/ /g, "-"));
      const response = await octokit.request(
        "POST /repos/{owner}/{repo}/hooks",
        {
          owner: owner,
          repo: repoName.replace(/ /g, "-"),
          name: "web",
          active: true,
          events: ["push", "pull_request", "create"],
          config: {
            // url: `${process.env.BASE_URL}/api/webhook-handler`,
            // url: "https://9c00-197-211-52-161.ngrok-free.app/api/webhook-handler", // use ngrok for local development
            url: "https://d883-102-90-102-252.ngrok-free.app/api/webhook-handler", // use ngrok for local development
            content_type: "json",
            insecure_ssl: "0",
          },
          headers: {
            "X-GitHub-Api-Version": "2022-11-28",
            accept: "application/vnd.github+json",
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error(
        "Error creating repository:",
        (error as AxiosError).response?.data || error
      );
      throw new Error(`Error creating repository: ${(error as Error).message}`);
    }
  },
  async repoCommits(accessCode: string, owner: string, repoName: string) {
    try {
      const octokit = new Octokit({
        auth: accessCode,
      });

      const formattedRepoName = (repoName as string).replace(/ /g, "-");

      // console.log"Fetching commits for:", owner, formattedRepoName);

      // Fetch the total number of commits
      const commitsResponse = await octokit.request(
        "GET /repos/{owner}/{repo}/commits",
        {
          owner: owner, // Replace with the repository owner's username
          repo: repoName, // Replace with the repository name
          // per_page: 1, // Limit the response to one commit to check the total
          headers: {
            "X-GitHub-Api-Version": "2022-11-28",
            accept: "application/vnd.github+json",
          },
        }
      );

      // console.log"Commits:", commitsResponse.data[0].commit);

      return commitsResponse.data;
    } catch (error) {
      console.error(
        "Error fetching repository commits:",
        (error as AxiosError).response?.data || error
      );
      throw new Error(
        `Error fetching repository commits: ${(error as Error).message}`
      );
    }
  },
  async repoBranchCommits(accessCode: string, owner: string, repoName: string, sha:string) {
    try {
      const octokit = new Octokit({
        auth: accessCode,
      });

      const formattedRepoName = (repoName as string).replace(/ /g, "-");

      // console.log"Fetching commits for:", owner, formattedRepoName);

      // Fetch the total number of commits
      const commitsResponse = await octokit.request(
        "GET /repos/{owner}/{repo}/commits",
        {
          owner: owner, // Replace with the repository owner's username
          repo: repoName, // Replace with the repository name
          // per_page: 1, // Limit the response to one commit to check the total
          headers: {
            "X-GitHub-Api-Version": "2022-11-28",
            accept: "application/vnd.github+json",
          },
        }
      );

      // console.log"Commits:", commitsResponse.data[0].commit);

      return commitsResponse.data;
    } catch (error) {
      console.error(
        "Error fetching repository commits:",
        (error as AxiosError).response?.data || error
      );
      throw new Error(
        `Error fetching repository commits: ${(error as Error).message}`
      );
    }
  },
  async repoCommitCount(accessCode: string, owner: string, repoName: string) {
    try {
      const octokit = new Octokit({
        auth: accessCode,
      });

      const formattedRepoName = (repoName as string).replace(/ /g, "-");

      // Fetch the total number of commits
      const commitsResponse = await octokit.request(
        "GET /repos/{owner}/{repo}/commits",
        {
          owner: owner, // Replace with the repository owner's username
          repo: formattedRepoName, // Replace with the repository name
          // per_page: 1, // Limit the response to one commit to check the total
          headers: {
            "X-GitHub-Api-Version": "2022-11-28",
            accept: "application/vnd.github+json",
          },
        }
      );

      return commitsResponse.data.length;
    } catch (error) {
      console.error(
        "Error fetching repository commits:",
        (error as AxiosError).response?.data || error
      );
      throw new Error(
        `Error fetching repository commits: ${(error as Error).message}`
      );
    }
  },
  async getRepositoryInfo(accessCode: string, owner: string, repoName: string) {
    try {
      const octokit = new Octokit({
        auth: accessCode,
      });

      const formattedRepoName = (repoName as string).replace(/ /g, "-");

      const response = await octokit.request("GET /repos/{owner}/{repo}", {
        owner: owner,
        repo: formattedRepoName,
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
          accept: "application/vnd.github+json",
        },
      });

      return response.data;
    } catch (error) {
      console.error(
        "Error fetching repository info:",
        (error as AxiosError).response?.data || error
      );
      throw new Error(
        `Error fetching repository info: ${(error as Error).message}`
      );
    }
  },
  async getRepositoryActivities(
    accessCode: string,
    owner: string,
    repoName: string
  ) {
    try {
      const octokit = new Octokit({
        auth: accessCode,
      });

      const formattedRepoName = (repoName as string).replace(/ /g, "-");

      const response = await octokit.request(
        "GET /repos/{owner}/{repo}/activity",
        {
          owner: owner,
          repo: formattedRepoName,
          headers: {
            "X-GitHub-Api-Version": "2022-11-28",
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error(
        "Error fetching repository activites:",
        (error as AxiosError).response?.data || error
      );
      throw new Error(
        `Error fetching repository activites: ${(error as Error).message}`
      );
    }
  },
  async getRepositoryBranches(
    accessCode: string,
    owner: string,
    repoName: string
  ) {
    try {
      const octokit = new Octokit({
        auth: accessCode,
      });

      const formattedRepoName = (repoName as string).replace(/ /g, "-");

      // Fetch the total number of commits
      const response = await octokit.request(
        "GET /repos/{owner}/{repo}/branches",
        {
          owner: owner, // Replace with the repository owner's username
          repo: formattedRepoName, // Replace with the repository name
          headers: {
            "X-GitHub-Api-Version": "2022-11-28",
            accept: "application/vnd.github+json",
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error(
        "Error fetching repository branches:",
        (error as AxiosError).response?.data || error
      );
      throw new Error(
        `Error fetching repository branches: ${(error as Error).message}`
      );
    }
  },
  async getRepositorySingleBranch(
    accessCode: string,
    owner: string,
    repoName: string,
    branch: string
  ) {
    try {
      const octokit = new Octokit({
        auth: accessCode,
      });

      const formattedRepoName = (repoName as string).replace(/ /g, "-");

      // Fetch the total number of commits
      const response = await octokit.request(
        "GET /repos/{owner}/{repo}/branches/{branch}",
        {
          owner: owner,
          repo: formattedRepoName,
          branch: branch,
          headers: {
            "X-GitHub-Api-Version": "2022-11-28",
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error(
        "Error fetching repository branch:",
        (error as AxiosError).response?.data || error
      );
      throw new Error(
        `Error fetching repository branch: ${(error as Error).message}`
      );
    }
  },
  async updateRepositoryInfo(
    accessCode: string,
    owner: string,
    repoName: string,
    updatedName: string,
    updatedDescription: string,
    updatedVisibility: boolean,
    homepage?: string
  ) {
    try {
      const octokit = new Octokit({
        auth: accessCode,
      });

      const formattedRepoName = (repoName as string).replace(/ /g, "-");

      // Fetch the total number of commits
      const response = await octokit.request("PATCH /repos/{owner}/{repo}", {
        owner: owner,
        repo: formattedRepoName,
        name: updatedName,
        description: updatedDescription,
        homepage: homepage || "",
        private: updatedVisibility,
        has_issues: true,
        has_projects: true,
        has_wiki: true,
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      });

      return response.data;
    } catch (error) {
      console.error(
        "Error updating repository:",
        (error as AxiosError).response?.data || error
      );
      throw new Error(`Error updating repository: ${(error as Error).message}`);
    }
  },
  async deleteRepository(accessCode: string, owner: string, repoName: string) {
    try {
      const octokit = new Octokit({
        auth: accessCode,
      });

      const formattedRepoName = (repoName as string).replace(/ /g, "-");

      // Fetch the total number of commits
      const response = await octokit.request("DELETE /repos/{owner}/{repo}", {
        owner: owner,
        repo: formattedRepoName,
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      });

      return response;
    } catch (error) {
      console.error(
        "Error deleting repository:",
        (error as AxiosError).response?.data || error
      );
      throw new Error(`Error deleting repository: ${(error as Error).message}`);
    }
  },
};
