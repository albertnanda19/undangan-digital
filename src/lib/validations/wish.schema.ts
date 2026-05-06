import { z } from "zod";

export const wishSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter"),
  message: z
    .string()
    .min(5, "Ucapan minimal 5 karakter")
    .max(500, "Ucapan maksimal 500 karakter"),
});

export type WishSchemaType = z.infer<typeof wishSchema>;
