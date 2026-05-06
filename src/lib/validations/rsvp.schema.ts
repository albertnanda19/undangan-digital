import { z } from "zod";

export const rsvpSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter"),
  phone: z.string().optional(),
  attendance: z.enum(["hadir", "tidak_hadir", "mungkin"]),
  guestCount: z.number().min(1).max(10),
  eventType: z.enum(["akad", "resepsi", "keduanya"]),
  message: z.string().max(500, "Pesan maksimal 500 karakter").optional(),
});

export const wishSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter"),
  message: z
    .string()
    .min(5, "Ucapan minimal 5 karakter")
    .max(500, "Ucapan maksimal 500 karakter"),
});
