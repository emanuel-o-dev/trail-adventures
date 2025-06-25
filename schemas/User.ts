import { z } from "zod";
export const User = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email("Deve ser um endereço de email válido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().optional(),
});
export const UserCreate = z.object({
  name: z.string(),
  email: z.string().email("Deve ser um endereço de email válido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});
export const UserUpdate = User.partial().omit({ id: true, createdAt: true });
export const UserLogin = z.object({
  email: z.string().email("Deve ser um endereço de email válido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});
export type User = z.infer<typeof User>;
export type UserCreate = z.infer<typeof UserCreate>;
