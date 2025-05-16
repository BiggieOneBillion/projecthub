import axios from "axios";

// Interface for creating a new project
interface ICreateProject {
  name: string; // Name of the project
  description: string; // Description of the project
  managerId: string; // ID of the project manager
}

// Interface for creating a new task
export interface ICreateTask {
  name: string; // Name of the task
  taskId: string; // Unique identifier for the task
  status: "todo" | "backlog" | "in-progress" | "done"; // Current status of the task
  priority: "low" | "medium" | "high"; // Priority level of the task
  label: "bug" | "feature" | "documentation"; // Task label
  projectId: string; // ID of the project the task belongs to
  assignedTo: string[]; // Array of employee IDs assigned to this task
  createdBy: string; // ID of the user who created the task
}

// Interface for creating a new employee
export interface ICreateEmployee {
  firstName: string; // Employee's first name
  lastName: string; // Employee's last name
  email: string; // Employee's email address
  projectRole: string; // Employee's role in the project
  projects: { projectId: string; role: string }[]; // Array of projects the employee is associated with
}

/**
 * CREATE MUTATION FUNCTIONS
 * These functions send POST requests to create new resources.
 */

/**
 * Create a new project.
 * @param values - Object containing project details.
 * @returns Axios response for the created project.
 */
export async function createProject(values: ICreateProject) {
  return await axios.post("api/project", values);
}

/**
 * Create a new task for a project.
 * @param values - Object containing task details.
 * @returns Axios response for the created task.
 */
export async function createProjectTask(values: ICreateTask) {
  return await axios.post("/api/tasks", values);
}

/**
 * Create a new employee.
 * @param values - Object containing employee details.
 * @returns Axios response for the created employee.
 */
export async function createEmployee(values: ICreateEmployee) {
  return await axios.post("/api/employee", values);
}

/**
 * UPDATE MUTATION FUNCTIONS
 * These functions send PUT requests to update existing resources.
 */

/**
 * Update a project.
 * @param values - Object containing updated project details.
 * @param id - ID of the project to update.
 * @returns Axios response for the updated project.
 */
export async function updateProject(
  values: Partial<ICreateProject>, // Allows partial updates to project properties
  id: string
) {
  return await axios.put(`api/project/${id}`, values);
}

/**
 * Update a task for a project.
 * @param values - Object containing updated task details.
 * @param id - ID of the task to update.
 * @returns Axios response for the updated task.
 */
export async function updateProjectTask(
  values: Partial<ICreateTask>, // Allows partial updates to task properties
  id: string
) {
  return await axios.put(`/api/tasks/${id}`, values);
}

/**
 * Update an employee.
 * @param values - Object containing updated employee details.
 * @param id - ID of the employee to update.
 * @returns Axios response for the updated employee.
 */
export async function updateEmployee(
  values: Partial<ICreateEmployee>, // Allows partial updates to employee properties
  id: string
) {
  return await axios.put(`/api/employee/${id}`, values);
}

/**
 * DELETE MUTATION FUNCTIONS
 * These functions send GET requests to delete resources.
 * Note: Ideally, DELETE HTTP method should be used for deletions.
 */

/**
 * Delete a project.
 * @param id - ID of the project to delete.
 * @returns Axios response for the deletion.
 */
export async function deleteProject(id: string) {
  return await axios.get(`api/project/${id}`);
}

/**
 * Delete a task.
 * @param id - ID of the task to delete.
 * @returns Axios response for the deletion.
 */
export async function deleteProjectTask(id: string) {
  return await axios.get(`/api/tasks/${id}`);
}

/**
 * Delete an employee.
 * @param id - ID of the employee to delete.
 * @returns Axios response for the deletion.
 */
export async function deleteEmployee(id: string) {
  return await axios.get(`/api/employee/${id}`);
}

export async function deleteProjectFromGit(owner: string, repoName: string) {
  return await axios.post("/api/github-repo/delete-repo", { owner, repoName });
}

interface IUpdateGit {
  owner: string;
  repoName: string;
  updatedName: string;
  updatedDescription: string;
  updatedVisibility?: string;
  homepage?: string;
}

export async function updateGitProject({
  homepage = "",
  owner,
  repoName,
  updatedDescription,
  updatedName,
  updatedVisibility = "public",
}: IUpdateGit) {
  return axios.put("/api/github-repo/update-repo-info", {
    owner,
    repoName,
    updatedName,
    updatedDescription,
    updatedVisibility,
    homepage,
  });
}
