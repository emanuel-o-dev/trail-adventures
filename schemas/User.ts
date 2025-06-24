import { z } from "zod";
export const User = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  createdAt: z
    .date()
    .default(() => new Date())
    .transform((date) => date.toISOString()),
  updatedAt: z
    .date()
    .optional()
    .transform((date) => date?.toISOString()),
});
export type User = z.infer<typeof User>;
