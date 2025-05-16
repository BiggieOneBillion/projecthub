import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Custom error messages
const errorMessages = {
  required: "This field is required",
  email: "Please provide a valid email address",
  minLength: (field: string, length: number) =>
    `${field} must be at least ${length} characters long`,
  maxLength: (field: string, length: number) =>
    `${field} cannot exceed ${length} characters`,
  pattern: {
    name: "Can only contain letters and spaces",
    objectId: "Invalid ID format",
    taskId: "Task ID must be in format PROJ-123",
  },
};

// Helper for ObjectId validation
const objectIdRegex = /^[0-9a-fA-F]{24}$/;
const nameRegex = /^[a-zA-Z\s]+$/;
const taskIdRegex = /^[A-Z]+-\d+$/;

const ObjectIdSchema = z
  .string()
  .regex(objectIdRegex, errorMessages.pattern.objectId);

// User Validation Rules
export const UserValidation = {
  createSchema: z.object({
    email: z.string().email(errorMessages.email).min(1, errorMessages.required),

    name: z
      .string()
      .min(2, errorMessages.minLength("Name", 2))
      .max(50, errorMessages.maxLength("Name", 50))
      .regex(nameRegex, errorMessages.pattern.name),

    role: z.enum(["manager"]).default("manager"),

    password: z
      .string()
      .min(8, errorMessages.minLength("Password", 8))
      .max(30, errorMessages.maxLength("Password", 30))
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
  }),

  updateSchema: z.object({
    email: z.string().email(errorMessages.email).optional(),
    name: z
      .string()
      .min(2, errorMessages.minLength("Name", 2))
      .max(50, errorMessages.maxLength("Name", 50))
      .regex(nameRegex, errorMessages.pattern.name)
      .optional(),
    password: z
      .string()
      .min(8, errorMessages.minLength("Password", 8))
      .max(30, errorMessages.maxLength("Password", 30))
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      )
      .optional(),
  }),
};

// Project Validation Rules
export const ProjectValidation = {
  createSchema: z.object({
    name: z
      .string()
      .min(3, errorMessages.minLength("Project name", 3))
      .max(100, errorMessages.maxLength("Project name", 100)),

    description: z
      .string()
      .max(500, errorMessages.maxLength("Description", 500))
      .optional(),

    managerId: ObjectIdSchema,
  }),

  updateSchema: z.object({
    name: z
      .string()
      .min(3, errorMessages.minLength("Project name", 3))
      .max(100, errorMessages.maxLength("Project name", 100))
      .optional(),

    description: z
      .string()
      .max(500, errorMessages.maxLength("Description", 500))
      .optional(),
  }),
};

// Employee Validation Rules
export const EmployeeValidation = {
  createSchema: z.object({
    firstName: z
      .string()
      .min(2, errorMessages.minLength("First name", 2))
      .max(50, errorMessages.maxLength("First name", 50))
      .regex(nameRegex, errorMessages.pattern.name),

    lastName: z
      .string()
      .min(2, errorMessages.minLength("Last name", 2))
      .max(50, errorMessages.maxLength("Last name", 50))
      .regex(nameRegex, errorMessages.pattern.name),

    email: z.string().email(errorMessages.email),

    projectRole: z
      .string()
      .min(2, errorMessages.minLength("Project role", 2))
      .max(50, errorMessages.maxLength("Project role", 50)),

    projects: z.array(
      z.object({
        projectId: ObjectIdSchema,
        role: z.string(),
      })
    ),
  }),

  updateSchema: z.object({
    firstName: z
      .string()
      .min(2, errorMessages.minLength("First name", 2))
      .max(50, errorMessages.maxLength("First name", 50))
      .regex(nameRegex, errorMessages.pattern.name)
      .optional(),

    lastName: z
      .string()
      .min(2, errorMessages.minLength("Last name", 2))
      .max(50, errorMessages.maxLength("Last name", 50))
      .regex(nameRegex, errorMessages.pattern.name)
      .optional(),

    projectRole: z
      .string()
      .min(2, errorMessages.minLength("Project role", 2))
      .max(50, errorMessages.maxLength("Project role", 50))
      .optional(),

    projects: z
      .array(
        z.object({
          projectId: ObjectIdSchema,
          role: z.string(),
        })
      )
      .optional(),
  }),
};

// Task Validation Rules
export const TaskValidation = {
  createSchema: z.object({
    name: z
      .string()
      .min(3, errorMessages.minLength("Task name", 3))
      .max(100, errorMessages.maxLength("Task name", 100)),

    taskId: z.string().regex(taskIdRegex, errorMessages.pattern.taskId),

    status: z.enum(["todo", "backlog", "in-progress", "done"]),

    priority: z.enum(["low", "medium", "high"]),

    label: z.enum(["bug", "feature", "documentation"]),

    projectId: ObjectIdSchema,

    assignedTo: z
      .array(ObjectIdSchema)
      .min(1, "Task must be assigned to at least one employee"),

    createdBy: ObjectIdSchema,
  }),

  updateSchema: z.object({
    name: z
      .string()
      .min(3, errorMessages.minLength("Task name", 3))
      .max(100, errorMessages.maxLength("Task name", 100))
      .optional(),

    status: z.enum(["todo", "backlog", "in-progress", "done"]).optional(),

    priority: z.enum(["low", "medium", "high"]).optional(),

    label: z.enum(["bug", "feature", "documentation"]).optional(),

    assignedTo: z
      .array(ObjectIdSchema)
      .min(1, "Task must be assigned to at least one employee")
      .optional(),
  }),
};

// Validation middleware
export const validateRequest = (schema: z.ZodSchema) => {
  return async (req: NextRequest) => {
    try {
      const validatedData = await schema.parseAsync(await req.json());
      //   req.body. = validatedData;
      // Check if the request body exists
      const requestBody = validatedData;

      // Modify the request body (this creates a clone with added data)
      const modifiedBody = {
        ...requestBody,
        addedData: "Modified in middleware",
      };

      // Create a new request with modified body
      const modifiedRequest = new Request(req.url, {
        method: req.method,
        headers: req.headers,
        body: JSON.stringify(modifiedBody),
      });

      // Continue the request with the modified body
      return NextResponse.next({
        request: modifiedRequest,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return NextResponse.json(
          {
            status: "error",
            errors: error.errors.map((err) => ({
              field: err.path.join("."),
              message: err.message,
            })),
          },
          { status: 400 }
        );
      }
      NextResponse.json(
        { message: "Error in validating data" },
        { status: 400 }
      );
    }
  };
};

// Type inference
export type CreateUserInput = z.infer<typeof UserValidation.createSchema>;
export type UpdateUserInput = z.infer<typeof UserValidation.updateSchema>;
export type CreateProjectInput = z.infer<typeof ProjectValidation.createSchema>;
export type UpdateProjectInput = z.infer<typeof ProjectValidation.updateSchema>;
export type CreateEmployeeInput = z.infer<
  typeof EmployeeValidation.createSchema
>;
export type UpdateEmployeeInput = z.infer<
  typeof EmployeeValidation.updateSchema
>;
export type CreateTaskInput = z.infer<typeof TaskValidation.createSchema>;
export type UpdateTaskInput = z.infer<typeof TaskValidation.updateSchema>;
