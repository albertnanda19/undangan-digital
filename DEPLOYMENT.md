# Panduan Deployment ke Vercel

## Environment Variables yang Harus Diisi di Vercel Dashboard

Buka: Vercel Dashboard → Project Settings → Environment Variables

| Variable | Value | Environment |
|---|---|---|
| NEXT_PUBLIC_SUPABASE_URL | URL project Supabase Anda | All |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | anon/public key Supabase | All |
| SUPABASE_SERVICE_ROLE_KEY | service_role key Supabase | All |
| NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME | Cloud name Cloudinary | All |
| CLOUDINARY_API_KEY | API Key Cloudinary | All |
| CLOUDINARY_API_SECRET | API Secret Cloudinary | All |
| RESEND_API_KEY | API Key Resend | All |
| RESEND_FROM_EMAIL | Email pengirim (verified di Resend) | All |
| NEXT_PUBLIC_APP_URL | https://domain-anda.vercel.app | All |
| NEXT_PUBLIC_APP_NAME | Undangan Digital | All |
| ADMIN_EMAIL | Email admin untuk notifikasi | All |

## Langkah Deploy

1. Push code ke GitHub repository
2. Buka https://vercel.com/new
3. Import repository: undangan-digital
4. Isi semua environment variables dari tabel di atas
5. Region: Singapore (sin1)
6. Klik Deploy

## Setelah Deploy

1. Buka https://domain-anda.vercel.app/admin/login
2. Login dengan email yang sudah dibuat di Supabase Auth
3. Tambah klien pertama!

## Custom Domain (Opsional)

1. Beli domain di Niagahoster/Domainesia (~Rp 150.000/tahun)
2. Di Vercel: Settings → Domains → Add Domain
3. Tambahkan DNS record sesuai instruksi Vercel
4. Update NEXT_PUBLIC_APP_URL ke domain baru
5. Redeploy

## Troubleshooting

- **Build error**: Jalankan `npm run build` lokal terlebih dahulu
- **Auth tidak bekerja**: Pastikan SUPABASE_URL dan keys sudah benar
- **Image tidak muncul**: Cek Cloudinary credentials
- **Email tidak terkirim**: Verifikasi domain di Resend dashboard
