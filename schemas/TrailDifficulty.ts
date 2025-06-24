import { z } from "zod";

export const TrailDifficulty = z.object({
  difficulty: z.string(),
  label: z.string(),
  seq: z.number(),
});
export type TrailDifficulty = z.infer<typeof TrailDifficulty>;
