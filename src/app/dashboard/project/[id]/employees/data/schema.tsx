// interface Employee {
//   _id: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   password: string;
//   projectRole: string;
//   projects: [
//     {
//       projectId: string;
//       role: string;
//       _id: string;
//     }
//   ];
//   createdAt: string;
//   updatedAt: string;
// }

import { z } from "zod";

export const employeeSchema = z.object({
  _id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  projectRole: z.string(),
});

export type Employee = z.infer<typeof employeeSchema>;
