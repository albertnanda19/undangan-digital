import { z } from "zod";

export const clientStep1Schema = z.object({
  groomName: z.string().min(2, "Nama mempelai pria minimal 2 karakter"),
  brideName: z.string().min(2, "Nama mempelai wanita minimal 2 karakter"),
  groomNickname: z.string().min(1, "Nama panggilan wajib diisi"),
  brideNickname: z.string().min(1, "Nama panggilan wajib diisi"),
  groomFather: z.string().min(2, "Nama ayah wajib diisi"),
  groomMother: z.string().min(2, "Nama ibu wajib diisi"),
  brideFather: z.string().min(2, "Nama ayah wajib diisi"),
  brideMother: z.string().min(2, "Nama ibu wajib diisi"),
  slug: z
    .string()
    .min(3, "Slug minimal 3 karakter")
    .max(60, "Slug maksimal 60 karakter")
    .regex(
      /^[a-z0-9-]+$/,
      "Slug hanya boleh huruf kecil, angka, dan tanda -"
    ),
});

export const clientStep2Schema = z.object({
  akadDate: z.string().min(1, "Tanggal akad wajib diisi"),
  akadTimeStart: z.string().min(1, "Jam mulai akad wajib diisi"),
  akadTimeEnd: z.string().min(1, "Jam selesai akad wajib diisi"),
  akadVenueName: z.string().min(2, "Nama venue akad wajib diisi"),
  akadVenueAddress: z.string().min(5, "Alamat venue akad wajib diisi"),
  akadMapsUrl: z
    .string()
    .url("URL Google Maps tidak valid")
    .optional()
    .or(z.literal("")),
  receptionDate: z.string().min(1, "Tanggal resepsi wajib diisi"),
  receptionTimeStart: z.string().min(1, "Jam mulai resepsi wajib diisi"),
  receptionTimeEnd: z.string().min(1, "Jam selesai resepsi wajib diisi"),
  receptionVenueName: z.string().min(2, "Nama venue resepsi wajib diisi"),
  receptionVenueAddress: z
    .string()
    .min(5, "Alamat venue resepsi wajib diisi"),
  receptionMapsUrl: z
    .string()
    .url("URL Google Maps tidak valid")
    .optional()
    .or(z.literal("")),
  dresscode: z.string().optional(),
  additionalNotes: z.string().optional(),
});

export const clientStep3Schema = z.object({
  loveStory: z.string().optional(),
  musicUrl: z.string().optional(),
  closingMessage: z.string().optional(),
});

export const clientStep4Schema = z.object({
  themeId: z.string().min(1, "Pilih tema terlebih dahulu"),
});

export const clientStep5Schema = z.object({
  showAmplopDigital: z.boolean(),
  bankAccounts: z.array(
    z.object({
      id: z.string(),
      bankName: z.string().min(1),
      accountNumber: z.string().min(5),
      accountHolder: z.string().min(2),
      isActive: z.boolean(),
    })
  ),
  isPasswordProtected: z.boolean(),
  password: z.string().optional(),
  expiresAt: z.string().optional(),
  lottieAnimationUrl: z.string().optional(),
  lottieAnimationPosition: z
    .enum(["hero", "couple_section", "both"])
    .optional(),
});
