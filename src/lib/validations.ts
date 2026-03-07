import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "O nome deve ter pelo menos 2 caracteres")
    .max(100, "O nome deve ter no maximo 100 caracteres")
    .trim(),
  email: z
    .string()
    .email("Por favor, insira um email valido")
    .max(255, "O email deve ter no maximo 255 caracteres")
    .trim()
    .toLowerCase(),
  message: z
    .string()
    .min(10, "A mensagem deve ter pelo menos 10 caracteres")
    .max(5000, "A mensagem deve ter no maximo 5000 caracteres")
    .trim(),
});

export type ContactFormData = z.infer<typeof contactSchema>;
