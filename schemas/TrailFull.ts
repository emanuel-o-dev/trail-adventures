import { z } from "zod";

export const TrailFull = z.object({
  id: z.number(),
  name: z.string(),
  difficulty: z
    .string()
    .refine((value) => ["easy", "medium", "hard"].includes(value), {
      message: "Invalid difficulty level",
    }),
  difficultyLabel: z.string(),
  duration: z.string(),
  terrain: z.string(),
  distance: z.string(),
  coordinates: z
    .object({
      latitude: z.number().default(0),
      longitude: z.number().default(0),
    })
    .optional(),
  image: z.string(),
  description: z.string(),
  location: z.string(),
  createdAt: z
    .date()
    .default(() => new Date())
    .transform((date) => date.toISOString()),
  updatedAt: z
    .date()
    .optional()
    .transform((date) => date?.toISOString()),
});

export type TrailFull = z.infer<typeof TrailFull>;
