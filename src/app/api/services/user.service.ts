import { User } from "@/model/db-model-in-use";
import bcrypt from "bcryptjs";

export interface userData {
  password: string;
  email: string;
  name: string;
  role: string;
}

// User CRUD Operations
export const UserController = {
  // Create new user
  async createUser(userData: userData) {
    try {
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      const user = await User.create({
        ...userData,
        password: hashedPassword,
      });
      return user;
    } catch (error) {
      throw new Error(`${(error as Error).message}`);
    }
  },

  async logIn(email: string, password: string) {
    try {
      const user: userData | undefined | null = await User.findOne({ email });

      if (!user) {
        throw new Error("User not found");
      }
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        throw new Error("Invalid password");
      }
      return user;
    } catch (error) {
      throw new Error(`${(error as Error).message}`);
    }
  },

  // Get user by ID
  async getUserById(userId: string) {
    try {
      const user = await User.findById(userId);
      if (!user) throw new Error("User not found");
      return user;
    } catch (error) {
      throw new Error(`Error fetching user: ${(error as Error).message}`);
    }
  },

  // Update user
  async updateUser(userId: string, updateData: userData) {
    try {
      if (updateData.password) {
        updateData.password = await bcrypt.hash(updateData.password, 10);
      }
      const user = await User.findByIdAndUpdate(userId, updateData, {
        new: true,
      });
      if (!user) throw new Error("User not found");
      return user;
    } catch (error) {
      throw new Error(`Error updating user: ${(error as Error).message}`);
    }
  },

  // Delete user
  async deleteUser(userId: string) {
    try {
      const user = await User.findByIdAndDelete(userId);
      if (!user) throw new Error("User not found");
      return user;
    } catch (error) {
      throw new Error(`Error deleting user: ${(error as Error).message}`);
    }
  },
};
