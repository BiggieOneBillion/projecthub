import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "./queryKeys";
import axios from "axios";

export function useGetRepoInfo(owner: string, repoName: string) {
  return useQuery({
    queryKey: [`${QUERY_KEYS.get("repoInfo")!}-${repoName}`], // Use the query key from the Map
    queryFn: async () => {
      const res = await axios.get(
        `/api/github-repo/repo-info?repoName=${repoName}&owner=${owner}`
      );
      return res.data;
    },
    enabled: Boolean(owner),
  });
}

export function useGetRepoActivity(owner: string, repoName: string) {
  return useQuery({
    queryKey: [`${QUERY_KEYS.get("repoActivities")!}-${repoName}`], // Use the query key from the Map
    queryFn: async () => {
      const res = await axios.get(
        `/api/github-repo/repo-activities?repoName=${repoName}&owner=${owner}`
      );
      return res.data;
    },
    enabled: Boolean(owner),
  });
}

export function useGetRepoBranches(owner: string, repoName: string) {
  return useQuery({
    queryKey: [`${QUERY_KEYS.get("repoBranches")!}-${repoName}`], // Use the query key from the Map
    queryFn: async () => {
      const res = await axios.get(
        `/api/github-repo/repo-branches?repoName=${repoName}&owner=${owner}`
      );
      return res.data;
    },
    enabled: Boolean(owner),
  });
}

export function useGetRepoSingleBranch(
  owner: string,
  repoName: string,
  branch: string
) {
  return useQuery({
    queryKey: [
      `${QUERY_KEYS.get("repoSingleBranches")!}-${repoName}-${branch}`,
    ], // Use the query key from the Map
    queryFn: async () => {
      const res = await axios.get(
        `/api/github-repo/repo-single-branch?repoName=${repoName}&owner=${owner}&branch=${branch}`
      );
      return res.data;
    },
    enabled: Boolean(owner),
  });
}

export function useGetRepoCommits(owner: string, repoName: string) {
  return useQuery({
    queryKey: [`${QUERY_KEYS.get("repoCommits")!}-${repoName}`], // Use the query key from the Map
    queryFn: async () => {
      const res = await axios.get(
        `/api/github-repo/repo-commits?repoName=${repoName}&owner=${owner}`
      );
      return res.data;
    },
    enabled: Boolean(owner),
  });
}

export function useGetAllRepo() {
  return useQuery({
    queryKey: ["get-all-repo"],
    queryFn: async () => {
      const res = await axios.get("/api/github/get-repo");
      return res.data;
    },
  });
}
