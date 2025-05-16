// queries.ts
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { QUERY_KEYS } from "./queryKeys";
// import { ITask } from "@/app/api/services/task.service";

/**
 * Fetches the list of projects associated with a user.
 * @param userId - The ID of the user to fetch projects for.
 * @returns React Query object for managing the project data.
 */
export function useGetProject(projectId: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.get("project")!, projectId], // Use the query key from the Map
    queryFn: async () => {
      const res = await axios.get(`/api/project/${projectId}`);
      return res.data;
    },
  });
}

/**
 * Fetches the list of projects associated with a user.
 * @param userId - The ID of the user to fetch projects for.
 * @returns React Query object for managing the project data.
 */
export function useGetProjects(userId: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.get("projects")!], // Use the query key from the Map
    queryFn: async () => {
      const res = await axios.get(`/api/project?userId=${userId}`);
      return res.data;
    },
  });
}

/**
 * Fetches tasks for a specific project.
 * @param projectId - The ID of the project to fetch tasks for.
 * @returns React Query object for managing the task data.
 */
export function useGetProjectTask(
  projectId: string
  // ): UseQueryResult<{ data: ITask[] }, Error> {
) {
  return useQuery({
    queryKey: [QUERY_KEYS.get("projectTasks")!, projectId], // Use the query key from the Map
    queryFn: async () => {
      const res = await axios.get(`/api/project/${projectId}/task`);
      return res.data;
    },
  });
}

/**
 * Fetches employees associated with a specific project.
 * @param projectId - The ID of the project to fetch employees for.
 * @returns React Query object for managing the employee data.
 */
export function useGetProjectEmployees(projectId: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.get("projectEmployees")!, projectId],
    queryFn: async () => {
      const res = await axios.get(`/api/project/${projectId}/employees`);
      return res.data;
    },
  });
}

/**
 * Fetches a single task based on its ID.
 * @param taskId - The ID of the task to fetch.
 * @returns React Query object for managing the single task data.
 */
export function useGetSingleTask(taskId: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.get("task")!, taskId],
    queryFn: async () => {
      const res = await axios.get(`/api/tasks/${taskId}`);
      return res.data;
    },
  });
}

/**
 * Fetches details of a single employee based on their ID.
 * @param employeeId - The ID of the employee to fetch.
 * @returns React Query object for managing the employee data.
 */
export function useGetSingleEmployees(employeeId: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.get("employee")!, employeeId],
    queryFn: async () => {
      const res = await axios.get(`/api/employee/${employeeId}`);
      return res.data;
    },
  });
}

export function useGetProjectCommits(projectId: string, owner: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.get("projectCommits")!, projectId],
    queryFn: async () => {
      const res = await axios.get(
        `/api/github/project-commit?projectId=${projectId}&owner=${owner}`
      );
      return res.data;
    },
  });
}

export function useGetAllEmployees(userId: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.get("employee")!, userId],
    queryFn: async () => {
      const res = await axios.get(`/api/employee?userId=${userId}`);
      return res.data;
    },
    enabled: Boolean(userId),
  });
}

export function useGetEmployeeTask(employeeId: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.get("employee")!, employeeId, "task"],
    queryFn: async () => {
      const res = await axios.get(`/api/employee/${employeeId}/task`);
      return res.data;
    },
    enabled: Boolean(employeeId),
  });
}
