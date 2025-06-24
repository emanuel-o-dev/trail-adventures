import { z } from "zod";

export const TrailSaved = z.object({
  id: z.number(),
  name: z.string(),
  location: z.string(),
  dateVisited: z
    .date()
    .default(() => new Date())
    .transform((date) => date.toISOString()),
});

export type TrailSaved = z.infer<typeof TrailSaved>;
