import { z } from "zod";

export const TrailFullSchema = z.object({
  id: z.number(),
  name: z.string().min(2, "Nome da trilha deve ter pelo menos 2 caracteres"),
  difficulty: z.enum(["easy", "medium", "hard"]),
  difficultyLabel: z.string().optional(),
  duration: z
    .string()
    .min(2, "Duração tem que a trilha é percorrida deve ser informada"),
  terrain: z.string().min(3, "Tipo de terreno deve ser informado"),
  distance: z.string().min(3, "Distância deve ser informada"),
  coordinates: z
    .object({
      latitude: z.number().default(0),
      longitude: z.number().default(0),
    })
    .optional(),
  image: z.string().min(1, "Imagem deve ser enviada"),
  description: z
    .string()
    .min(10, "Descrição deve ter pelo menos 10 caracteres"),
  location: z.string().min(2, "Localização deve ser informada"),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().optional(),
});
export type TrailFullSchema = z.infer<typeof TrailFullSchema>;
export const MarkersSchema = z.object({
  id: z.number(),
  name: z.string().min(2, "Nome do marcador deve ter pelo menos 2 caracteres"),
  coordinates: z.object({
    latitude: z.number().default(0),
    longitude: z.number().default(0),
  }),
});

export type MarkersSchema = z.infer<typeof MarkersSchema>;
