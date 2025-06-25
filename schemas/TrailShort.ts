import { z } from "zod";

export const difficultyEnum = z.enum(["easy", "medium", "hard"]);

export const TrailShort = z.object({
  id: z.number(),
  name: z.string(),
  difficulty: difficultyEnum,
  duration: z.string(),
  difficultyLabel: z.string(),
  terrain: z.string(),
  distance: z.string(),
  image: z.string(),
  location: z.string(),
});

export type TrailShort = z.infer<typeof TrailShort>;
