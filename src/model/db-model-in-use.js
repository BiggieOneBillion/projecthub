import mongoose from "mongoose";

// User Schema
const UserSchema = {
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  // role: { type: String, default: "manager", enum: ["manager", "employee"] },
  role: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
};

// Project Schema
const ProjectSchema = {
  name: { type: String, required: true },
  description: { type: String },
  onGithub: { type: Boolean, default: false },
  isMonitored: { type: Boolean, default: false },
  managerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
};

// Employee Schema
const EmployeeSchema = {
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  projectRole: { type: String, required: true },
  projects: [
    {
      projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
      role: { type: String, required: true },
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
};

// Task Schema
const TaskSchema = {
  name: { type: String, required: true },
  taskId: { type: String, required: true, unique: true },
  status: {
    type: String,
    required: true,
    enum: ["todo", "backlog", "in-progress", "done"],
  },
  priority: {
    type: String,
    required: true,
    enum: ["low", "medium", "high"],
  },
  label: {
    type: String,
    required: true,
    enum: [
      "bug",
      "feature",
      "documentation",
      "hotfix",
      "refactor",
      "design",
      "test",
      "integration",
      "support",
    ],
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },
  assignedTo: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
    },
  ],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
};

// RepositorySchema to track GitHub repositories
const RepositorySchema = {
  githubId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  lastWebhookUpdate: {
    type: Date,
  },
  webhookId: {
    type: String,
  },
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
};

// git commit schema
const CommitSchema = {
  sha: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  committer: {
    type: String,
    required: true,
  },
  project_name: {
    type: String,
    required: true,
  },
  branch: {
    type: String,
    required: true,
  },
};

export const User = mongoose.models.User || mongoose.model("User", UserSchema);
export const Project =
  mongoose.models.Project || mongoose.model("Project", ProjectSchema);
export const Employee =
  mongoose.models.Employee || mongoose.model("Employee", EmployeeSchema);
export const Task = mongoose.models.Task || mongoose.model("Task", TaskSchema);
export const Repository =
  mongoose.models.Repository || mongoose.model("Repository", RepositorySchema);
export const GitProjectCommit =
  mongoose.models.GitProjectCommit ||
  mongoose.model("GitProjectCommit", CommitSchema);
