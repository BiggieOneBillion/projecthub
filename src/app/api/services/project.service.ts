import { Employee, Project, Task } from "@/model/db-model-in-use";
import mongoose from "mongoose";
import { EmployeeSchema } from "./employee.service";

export interface ProjectData {
  name: string;
  description: string;
  managerId: string;
  isMonitored: boolean;
  onGithub: boolean;
}

// Project CRUD Operations
export const ProjectController = {
  // Create new project
  async createProject(projectData: ProjectData) {
    try {
      const project = await Project.create(projectData);
      return project;
    } catch (error) {
      throw new Error(`Error creating project: ${(error as Error).message}`);
    }
  },

  async getProjectsByManagerId(managerId: string) {
    try {
      // Validate ObjectId
      if (!mongoose.Types.ObjectId.isValid(managerId)) {
        throw new Error("Invalid manager ID format");
      }

      const projects = await Project.find({ managerId })
        .sort({ createdAt: -1 }) // Sort by newest first
        .select("name description isMonitored onGithub createdAt updatedAt"); // Select specific fields

      return projects;
    } catch (error) {
      throw new Error(`Error fetching projects: ${(error as Error).message}`);
    }
  },

  // Get project by ID
  async getProjectById(projectId: string) {
    try {
      const project = await Project.findById(projectId);
      if (!project) throw new Error("Project not found");
      return project;
    } catch (error) {
      throw new Error(`Error fetching project: ${(error as Error).message}`);
    }
  },

  // Update project
  async updateProject(projectId: string, updateData: Partial<ProjectData>) {
    try {
      const project = await Project.findByIdAndUpdate(projectId, updateData, {
        new: true,
      });
      if (!project) throw new Error("Project not found");
      return project;
    } catch (error) {
      throw new Error(`Error updating project: ${(error as Error).message}`);
    }
  },

  // Delete project with cascade
  async deleteProject(projectId: string) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Find the project
      const project = await Project.findById(projectId);
      if (!project) throw new Error("Project not found");

      // Find all tasks associated with the project
      await Task.find({ projectId });

      // Find all employees in the project
      const employees = await Employee.find({
        "projects.projectId": projectId,
      });

      // Delete all tasks under the project
      await Task.deleteMany({ projectId }, { session });

      // Remove project reference and associated tasks from employees
      const updatePromises = employees.map(
        (employee: EmployeeSchema & { _id: string }) => {
          // (employee: any) => {
          return Employee.updateOne(
            { _id: employee._id },
            {
              $pull: {
                projects: { projectId: projectId },
              },
            },
            { session }
          );
        }
      );

      await Promise.all(updatePromises);

      // Delete the project itself
      await Project.findByIdAndDelete(projectId, { session });

      await session.commitTransaction();
      return { message: "Project and related data deleted successfully" };
    } catch (error) {
      await session.abortTransaction();
      throw new Error(`Error in cascade delete: ${(error as Error).message}`);
    } finally {
      session.endSession();
    }
  },
};
