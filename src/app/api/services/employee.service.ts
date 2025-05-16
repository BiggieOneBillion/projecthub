import { Employee, Task } from "@/model/db-model-in-use";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

export interface EmployeeSchemaFromDb {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  projectRole: string;
  projects: { projectId: string; role: string }[];
}

export interface EmployeeSchema {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  projectRole: string;
  projects: { projectId: string; role: string }[];
}

export interface ICreateEmployeeSchema {
  firstName: string;
  lastName: string;
  email: string;
  projectRole: string;
  projects: { projectId: string; role: string }[];
}

// Employee CRUD Operations
export const EmployeeController = {
  // Create new employee
  async createEmployee(employeeData: ICreateEmployeeSchema) {
    try {
      // Generate a random password
      const generatedPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(generatedPassword, 10);

      const employee = await Employee.create({
        ...employeeData,
        password: hashedPassword,
      });

      // Return employee data with the generated password (to be emailed to employee)
      return {
        employee,
        generatedPassword,
      };
    } catch (error) {
      throw new Error(`Error creating employee: ${(error as Error).message}`);
    }
  },

  async logIn(email: string, password: string) {
    try {
      const employee: EmployeeSchema | undefined | null =
        await Employee.findOne({ email: email });
      if (!employee) {
        throw new Error("Employee not found");
      }
      const isValidPassword = await bcrypt.compare(password, employee.password);
      if (!isValidPassword) {
        throw new Error("Invalid password");
      }
      return employee;
    } catch (error) {
      throw new Error(`Error logging in employee: ${(error as Error).message}`);
    }
  },

  async getEmployees() {
    // try {
    //   const employee: EmployeeSchema | undefined | null =
    //     await Employee.findOne({ email: email });
    //   if (!employee) {
    //     throw new Error("Employee not found");
    //   }
    //   const isValidPassword = await bcrypt.compare(password, employee.password);
    //   if (!isValidPassword) {
    //     throw new Error("Invalid password");
    //   }
    //   return employee;
    // } catch (error) {
    //   throw new Error(`Error logging in employee: ${(error as Error).message}`);
    // }
  },

  // Get employee by ID
  async getEmployeeById(employeeId: string) {
    try {
      const employee = await Employee.findById(employeeId).select("-password");
      if (!employee) throw new Error("Employee not found");
      return employee;
    } catch (error) {
      throw new Error(`Error fetching employee: ${(error as Error).message}`);
    }
  },

  async getEmployeesByProjectId(projectId: string) {
    try {
      const employees = await Employee.find({
        "projects.projectId": projectId,
      })
        .select("firstName lastName email projectRole") // Select specific fields
        .exec();

      // if (employees.length === 0)
      //   throw new Error(`No Employee under this project`);

      return employees;
    } catch (error) {
      throw new Error(`Error fetching employees: ${(error as Error).message}`);
    }
  },

  //! Update employee -----implementation not correct
  async updateEmployee(employeeId: string, updateData: EmployeeSchema) {
    try {
      if (updateData.password) {
        updateData.password = await bcrypt.hash(updateData.password, 10);
      }
      const employee = await Employee.findByIdAndUpdate(
        employeeId,
        updateData,
        { new: true }
      );
      if (!employee) throw new Error("Employee not found");
      return employee;
    } catch (error) {
      throw new Error(`Error updating employee: ${(error as Error).message}`);
    }
  },

  // Delete employee
  async deleteEmployee(employeeId: string) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Find the employee
      const employee = await Employee.findById(employeeId);
      if (!employee) throw new Error("Employee not found");

      // Remove employee from all assigned tasks
      await Task.updateMany(
        { assignedTo: employeeId },
        { $pull: { assignedTo: employeeId } },
        { session }
      );

      // Delete the employee
      await Employee.findByIdAndDelete(employeeId, { session });

      await session.commitTransaction();
      return { message: "Employee deleted successfully" };
    } catch (error) {
      await session.abortTransaction();
      throw new Error(`Error deleting employee: ${(error as Error).message}`);
    } finally {
      session.endSession();
    }
  },
};
