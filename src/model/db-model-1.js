// // RepositorySchema to track GitHub repositories
// const RepositorySchema = new mongoose.Schema({
//   githubId: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   name: {
//     type: String,
//     required: true,
//   },
//   owner: {
//     type: String,
//     required: true,
//   },
//   lastWebhookUpdate: {
//     type: Date,
//   },
//   webhookId: {
//     type: String,
//   },
//   tasks: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Task",
//     },
//   ],
// });

// // User Schema
// const UserSchema = new mongoose.Schema({
//   name: String,
//   email: { type: String, unique: true },
//   password: String,
//   role: { type: String, default: "manager" },
// });

// // Project Schema
// const ProjectSchema = new mongoose.Schema({
//   name: String,
//   description: String,
//   createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//   employees: [{ type: mongoose.Schema.Types.ObjectId, ref: "Employee" }],
//   tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
// });

// // Employee Schema
// const EmployeeSchema = new mongoose.Schema({
//   firstName: String,
//   lastName: String,
//   email: { type: String, unique: true },
//   password: String,
//   role: String,
//   projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
//   tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
// });

// // Task Schema
// const TaskSchema = new mongoose.Schema({
//   taskName: String,
//   status: { type: String, enum: ["todo", "backlog", "in-progress", "done"] },
//   priority: { type: String, enum: ["low", "medium", "high"] },
//   taskId: { type: String, unique: true },
//   label: { type: String, enum: ["bug", "feature", "documentation"] },
//   projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
//   assignedTo: [{ type: mongoose.Schema.Types.ObjectId, ref: "Employee" }],
// });

// export const User = mongoose.model("User", UserSchema);
// export const Project = mongoose.model("Project", ProjectSchema);
// export const Employee = mongoose.model("Employee", EmployeeSchema);
// export const Task = mongoose.model("Task", TaskSchema);
