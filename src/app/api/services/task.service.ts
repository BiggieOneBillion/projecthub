import { Employee, Task } from "@/model/db-model-in-use";
import { EmployeeSchemaFromDb } from "./employee.service";

export interface ITask {
  name: string;
  taskId: string;
  status: "todo" | "backlog" | "in-progress" | "done";
  priority: "low" | "medium" | "high";
  label: "bug" | "feature" | "documentation";
  projectId: string;
  assignedTo: string[];
  createdBy: string;
}

export interface ICreateTask {
  name: string;
  taskId: string;
  status: "todo" | "backlog" | "in-progress" | "done";
  priority: "low" | "medium" | "high";
  label: "bug" | "feature" | "documentation";
  projectId: string;
  assignedTo: string[];
  createdBy: string;
}

// Task CRUD Operations
export const TaskController = {
  // Create new task
  async createTask(taskData: ICreateTask) {
    try {
      // Verify that assigned employees exist and are part of the project
      const employees: EmployeeSchemaFromDb[] = await Employee.find({
        // _id: { $in: taskData.assignedTo },
        "projects.projectId": taskData.projectId,
      });

      // console.log("FROM TASK SERVICES---", employees);
      // console.log("FROM TASK SERVICES nums---", taskData.assignedTo);

      const check = employees.find((el) => el._id.toString() === taskData.assignedTo[0]);

     

      if (!check) {
        throw new Error("Some assigned employees are not part of the project");
      }

      const task = await Task.create(taskData);
      return task;
    } catch (error) {
      throw new Error(`Error creating task: ${(error as Error).message}`);
    }
  },

  // Get task by ID
  async getTaskById(taskId: string) {
    try {
      const task = await Task.findById(taskId)
        .populate("assignedTo", "firstName lastName email")
        .populate("projectId", "name");
      if (!task) throw new Error("Task not found");
      return task;
    } catch (error) {
      throw new Error(`Error fetching task: ${(error as Error).message}`);
    }
  },

  // Update task
  async updateTask(taskId: string, updateData: ITask) {
    try {
      if (updateData.assignedTo) {
        // Verify new assigned employees are part of the project
        const task = await Task.findById(taskId);
        const employees = await Employee.find({
          _id: { $in: updateData.assignedTo },
          "projects.projectId": task!.projectId,
        });

        if (employees.length !== updateData.assignedTo.length) {
          throw new Error(
            "Some assigned employees are not part of the project"
          );
        }
      }

      const task = await Task.findByIdAndUpdate(taskId, updateData, {
        new: true,
      });
      if (!task) throw new Error("Task not found");
      return task;
    } catch (error) {
      throw new Error(`Error updating task: ${(error as Error).message}`);
    }
  },

  // Delete task
  async deleteTask(taskId: string) {
    try {
      const task = await Task.findByIdAndDelete(taskId);
      if (!task) throw new Error("Task not found");
      return task;
    } catch (error) {
      throw new Error(`Error deleting task: ${(error as Error).message}`);
    }
  },

  // Get tasks by project
  async getTasksByProject(projectId: string) {
    try {
      const tasks = await Task.find({ projectId })
        .populate("assignedTo", "firstName lastName email")
        .sort({ createdAt: -1 });
      return tasks;
    } catch (error) {
      throw new Error(
        `Error fetching project tasks: ${(error as Error).message}`
      );
    }
  },

  // Get tasks assigned to employee
  async getTasksByEmployee(employeeId: string) {
    try {
      const tasks = await Task.find({ assignedTo: employeeId })
        .populate("projectId", "name")
        .sort({ createdAt: -1 });
      return tasks;
    } catch (error) {
      throw new Error(
        `Error fetching employee tasks: ${(error as Error).message}`
      );
    }
  },
};
