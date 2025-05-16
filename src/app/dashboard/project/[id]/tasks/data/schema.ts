// import { z } from "zod"

// // We're keeping a simple non-relational schema here.
// // IRL, you will have a schema for your data models.
// export const taskSchema = z.object({
//   id: z.string(),
//   title: z.string(),
//   status: z.string(),
//   label: z.string(),
//   priority: z.string(),
// })

// export type Task = z.infer<typeof taskSchema>

import { z } from "zod";

export const taskSchema = z.object({
  id: z.string(),
  taskId: z.string(),
  title: z.string(),
  status: z.string(),
  label: z.string(),
  priority: z.string(),
  employeeDetails: z.object({
    firstName: z.string(),
    lastName: z.string(),
  }),
});

export type Task = z.infer<typeof taskSchema>;
