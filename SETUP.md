# Setup Guide — Undangan Digital

## 1. Setup Supabase

### 1.1 Buat Project Supabase
1. Buka https://supabase.com dan login
2. Klik "New Project"
3. Isi: Project Name, Database Password (simpan baik-baik), Region: Southeast Asia (Singapore)
4. Tunggu project selesai dibuat (~2 menit)

### 1.2 Jalankan Migration SQL
1. Buka project Supabase > Table Editor > SQL Editor
2. Copy-paste isi file `supabase/migrations/001_initial_schema.sql` → klik Run
3. Copy-paste isi file `supabase/migrations/002_storage_buckets.sql` → klik Run

### 1.3 Ambil Credentials
1. Buka Settings > API
2. Copy: Project URL → `NEXT_PUBLIC_SUPABASE_URL`
3. Copy: anon/public key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Copy: service_role key → `SUPABASE_SERVICE_ROLE_KEY`

### 1.4 Buat Akun Admin
1. Buka Authentication > Users > "Add User"
2. Isi email dan password operator
3. Akun ini digunakan untuk login ke /admin

## 2. Setup Cloudinary

1. Buka https://cloudinary.com dan daftar akun gratis
2. Buka Dashboard → ambil: Cloud Name, API Key, API Secret
3. Isi ke .env.local

## 3. Setup Resend

1. Buka https://resend.com dan daftar akun gratis
2. Buat API Key
3. Verifikasi domain (atau gunakan domain resend.dev untuk testing)
4. Isi ke .env.local

## 4. Jalankan Project

```bash
npm run dev
```

Buka: http://localhost:3000/admin/login

## 5. Deploy ke Vercel

1. Push code ke GitHub repository
2. Buka https://vercel.com → Import repository
3. Isi semua environment variables dari .env.local
4. Deploy!
