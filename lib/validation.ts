import { z } from "zod";

export const LoginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type LoginValueProps = z.infer<typeof LoginFormSchema>;