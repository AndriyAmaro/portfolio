import { z } from "zod";

// Zod v4 · use `{ error: "..." }` instead of string-as-2nd-arg
// to avoid internal `?? {}` fallback that triggers esbuild warnings.
export const contactSchema = z.object({
  name: z
    .string()
    .min(2, { error: "O nome deve ter pelo menos 2 caracteres" })
    .max(100, { error: "O nome deve ter no maximo 100 caracteres" })
    .trim(),
  email: z
    .email({ error: "Por favor, insira um email valido" })
    .max(255, { error: "O email deve ter no maximo 255 caracteres" })
    .trim()
    .toLowerCase(),
  message: z
    .string()
    .min(10, { error: "A mensagem deve ter pelo menos 10 caracteres" })
    .max(5000, { error: "A mensagem deve ter no maximo 5000 caracteres" })
    .trim(),
});

export type ContactFormData = z.infer<typeof contactSchema>;
