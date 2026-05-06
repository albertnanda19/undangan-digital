# Product Requirements Document (PRD)
## Platform Undangan Pernikahan Digital — Multi-Tenant

---

| Field | Detail |
|---|---|
| **Versi Dokumen** | 1.1.0 |
| **Tanggal** | Mei 2025 |
| **Status** | Draft |
| **Pemilik Produk** | Software Engineer / Founder |
| **Target Rilis** | Q3 2025 |

---

## Daftar Isi

1. [Executive Summary](#1-executive-summary)
2. [Latar Belakang & Konteks Bisnis](#2-latar-belakang--konteks-bisnis)
3. [Tujuan & Sasaran](#3-tujuan--sasaran)
4. [Pengguna & Stakeholder](#4-pengguna--stakeholder)
5. [Arsitektur Sistem & Stack Teknologi](#5-arsitektur-sistem--stack-teknologi)
6. [Fitur — Admin Panel](#6-fitur--admin-panel)
7. [Fitur — Halaman Undangan Tamu](#7-fitur--halaman-undangan-tamu)
8. [Fitur — Manajemen Tamu & RSVP](#8-fitur--manajemen-tamu--rsvp)
9. [Fitur — Multimedia & Galeri](#9-fitur--multimedia--galeri)
10. [Fitur — Amplop Digital & Gift Registry](#10-fitur--amplop-digital--gift-registry)
11. [Fitur — Notifikasi & Komunikasi](#11-fitur--notifikasi--komunikasi)
12. [Fitur — Analitik & Laporan](#12-fitur--analitik--laporan)
13. [Non-Functional Requirements](#13-non-functional-requirements)
14. [Monetisasi & Model Bisnis](#14-monetisasi--model-bisnis)
15. [Desain UI/UX](#15-desain-uiux)
16. [Keamanan & Privasi](#16-keamanan--privasi)
17. [Roadmap & Prioritas Fitur](#17-roadmap--prioritas-fitur)
18. [Asumsi & Ketergantungan](#18-asumsi--ketergantungan)
19. [Risiko & Mitigasi](#19-risiko--mitigasi)
20. [Glossary](#20-glossary)

---

## 1. Executive Summary

Platform ini adalah **sistem manajemen undangan pernikahan digital berbasis web multi-tenant** yang dibangun dan dioperasikan oleh seorang software engineer independen untuk melayani klien-kliennya. Satu platform tunggal menampung banyak pasangan (tenant), di mana setiap pasangan mendapatkan halaman undangan pernikahan digital yang unik, cantik, dan fungsional dengan URL pribadi mereka sendiri.

Platform ini dirancang dengan filosofi **zero-cost infrastructure** — seluruh infrastruktur memanfaatkan layanan gratis (free tier) dari cloud provider, sehingga biaya operasional mendekati nol, dan seluruh fee dari klien menjadi keuntungan bersih operator.

---

## 2. Latar Belakang & Konteks Bisnis

### 2.1 Masalah yang Diselesaikan

Undangan pernikahan fisik memiliki banyak kelemahan:
- Biaya cetak yang mahal dan tidak ramah lingkungan
- Tidak bisa diperbarui setelah dicetak (perubahan jadwal, venue, dsb.)
- Sulit melacak siapa yang sudah konfirmasi kehadiran
- Tidak ada interaksi digital (ucapan, doa, foto bersama)

### 2.2 Solusi

Undangan pernikahan digital yang:
- Bisa diakses kapan saja, di mana saja via smartphone
- Dapat diperbarui secara real-time
- Memiliki fitur RSVP online, pesan ucapan, galeri foto, dan amplop digital
- Terlihat premium dan aesthetic sehingga meningkatkan kesan profesional

### 2.3 Model Bisnis Operator

- Operator (software engineer) mengelola **satu platform terpusat**
- Setiap klien (pasangan pengantin) membayar **fee satu kali** di awal
- Operator menginput data klien lewat **Admin Panel** dan menghasilkan halaman undangan unik
- Klien menerima **link undangan** yang bisa langsung dibagikan ke tamu

---

## 3. Tujuan & Sasaran

### 3.1 Tujuan Utama

| # | Tujuan | Indikator Keberhasilan |
|---|---|---|
| 1 | Memungkinkan operator melayani banyak klien dari satu platform | Berhasil mengelola 50+ klien aktif serentak |
| 2 | Biaya infrastruktur = Rp 0 | Total monthly infra cost ≤ $0 (free tier) |
| 3 | Halaman undangan estetik dan responsif | Lighthouse score ≥ 90 pada mobile |
| 4 | Pengalaman tamu yang mudah dan menyenangkan | Bounce rate halaman undangan < 20% |
| 5 | Proses onboarding klien baru < 30 menit | Dari input data hingga link siap dibagikan |

### 3.2 Tujuan Sekunder

- Membangun portofolio dan reputasi operator sebagai penyedia undangan digital premium
- Menciptakan aset digital yang dapat dijual atau di-scale di masa depan
- Menyediakan data dan insight kepada klien tentang keterlibatan tamu

---

## 4. Pengguna & Stakeholder

### 4.1 Pengguna Utama

#### 4.1.1 Operator (Admin)
> Software engineer pemilik platform

- Mengelola semua tenant (klien)
- Membuat, mengedit, menonaktifkan undangan
- Melihat laporan dari semua klien
- Mengatur template dan tema yang tersedia

#### 4.1.2 Klien (Pasangan Pengantin)
> Membeli layanan dari operator

- Mengakses dashboard pasangan (opsional, bisa dikelola penuh oleh operator)
- Melihat statistik RSVP dan ucapan masuk
- Mengunduh daftar tamu yang konfirmasi hadir
- Mengelola data undangan mereka sendiri

#### 4.1.3 Tamu Undangan
> Orang-orang yang menerima link undangan

- Mengakses halaman undangan
- Mengisi RSVP (konfirmasi kehadiran)
- Meninggalkan ucapan dan doa
- Mengirim amplop digital
- Melihat galeri foto pasangan

### 4.2 Stakeholder Non-Pengguna

- **Payment Gateway Provider** (Midtrans / Xendit): mitra untuk amplop digital
- **Cloud Providers** (Vercel, Supabase, Cloudinary): mitra infrastruktur

---

## 5. Arsitektur Sistem & Stack Teknologi

### 5.1 Gambaran Umum Arsitektur

```
┌─────────────────────────────────────────────┐
│              DOMAIN UTAMA                   │
│         undanganku.id (contoh)              │
├───────────────────┬─────────────────────────┤
│   /admin          │   /{slug-pasangan}      │
│   Admin Panel     │   Halaman Undangan Tamu │
│   (Operator only) │   (Publik)              │
└───────────────────┴─────────────────────────┘
             │                    │
     ┌───────▼────────┐  ┌────────▼────────┐
     │   Next.js App  │  │  Next.js App    │
     │   (Admin UI)   │  │  (Guest Pages)  │
     └───────┬────────┘  └────────┬────────┘
             └────────────────────┘
                        │
              ┌─────────▼──────────┐
              │    Supabase        │
              │  (PostgreSQL DB +  │
              │   Auth + Storage)  │
              └─────────┬──────────┘
                        │
          ┌─────────────┴────────────┐
          │                          │
  ┌───────▼──────┐         ┌────────▼───────┐
  │  Cloudinary  │         │  Resend / SMTP │
  │ (Foto/Video) │         │  (Email notif) │
  └──────────────┘         └────────────────┘
```

### 5.2 Stack Teknologi

| Layer | Teknologi | Alasan | Biaya |
|---|---|---|---|
| **Frontend Framework** | Next.js Latest Version (App Router) | SSR/SSG, SEO optimal, gratis di Vercel | $0 |
| **Hosting** | Vercel (Hobby Plan) | 100GB bandwidth/bulan, custom domain | $0 |
| **Database** | Supabase (Free Tier) | PostgreSQL 500MB, Auth, Realtime | $0 |
| **File Storage** | Supabase Storage | 1GB storage bawaan + integrasi mudah | $0 |
| **CDN Gambar** | Cloudinary (Free) | 25GB storage, transformasi gambar otomatis | $0 |
| **Email** | Resend (Free Tier) | 3.000 email/bulan | $0 |
| **Styling** | Tailwind CSS | Utility-first, cepat, fleksibel | $0 |
| **Animasi UI** | Framer Motion | Animasi halus dan profesional | $0 |
| **Animasi Vektor** | Lottie React (`lottie-react`) | Render file animasi JSON dari LottieFiles, ringan & tema-aware | $0 |
| **State Management** | Zustand | Ringan, sederhana | $0 |
| **Font** | Google Fonts | Ribuan font gratis | $0 |
| **Ikon** | Lucide React | Open source, konsisten | $0 |

### 5.3 Struktur Database (Skema Utama)

#### Tabel `tenants` (Data Klien/Pasangan)
```sql
- id (uuid, PK)
- slug (varchar, UNIQUE) -- URL identifier: /andi-dan-sari
- groom_name (varchar)
- bride_name (varchar)
- groom_nickname (varchar)
- bride_nickname (varchar)
- groom_father (varchar)
- groom_mother (varchar)
- bride_father (varchar)
- bride_mother (varchar)
- akad_date (timestamp)
- akad_time_start (time)
- akad_time_end (time)
- akad_venue_name (varchar)
- akad_venue_address (text)
- akad_maps_url (varchar)
- reception_date (timestamp)
- reception_time_start (time)
- reception_time_end (time)
- reception_venue_name (varchar)
- reception_venue_address (text)
- reception_maps_url (varchar)
- theme_id (uuid, FK → themes)
- cover_photo_url (varchar)
- love_story (text)
- music_url (varchar)
- is_active (boolean)
- is_password_protected (boolean)
- password_hash (varchar)
- show_amplop_digital (boolean)
- bank_accounts (jsonb)
- lottie_animation_url (varchar, nullable) -- URL file .json dari LottieFiles untuk animasi pasangan
- lottie_animation_position (enum: 'hero', 'couple_section', 'both', nullable) -- posisi tampil animasi
- expires_at (timestamp)
- created_at (timestamp)
- updated_at (timestamp)
```

#### Tabel `guests` (Data Tamu per Undangan)
```sql
- id (uuid, PK)
- tenant_id (uuid, FK → tenants)
- name (varchar)
- phone (varchar)
- invitation_code (varchar, UNIQUE) -- kode unik per tamu
- category (enum: 'family', 'friend', 'colleague', 'other')
- is_vip (boolean)
- seat_number (varchar)
- notes (text)
- created_at (timestamp)
```

#### Tabel `rsvp_responses` (Konfirmasi Kehadiran)
```sql
- id (uuid, PK)
- tenant_id (uuid, FK → tenants)
- guest_id (uuid, FK → guests, nullable) -- null jika tamu tidak terdaftar
- name (varchar) -- nama yang diisi sendiri
- phone (varchar)
- attendance (enum: 'hadir', 'tidak_hadir', 'mungkin')
- guest_count (integer) -- jumlah orang yang akan hadir
- event_type (enum: 'akad', 'resepsi', 'keduanya')
- message (text)
- submitted_at (timestamp)
```

#### Tabel `wishes` (Ucapan & Doa)
```sql
- id (uuid, PK)
- tenant_id (uuid, FK → tenants)
- name (varchar)
- message (text)
- is_approved (boolean) -- moderasi ucapan
- created_at (timestamp)
```

#### Tabel `amplop_transactions` (Amplop Digital)
```sql
- id (uuid, PK)
- tenant_id (uuid, FK → tenants)
- sender_name (varchar)
- sender_phone (varchar)
- amount (integer)
- bank_destination (varchar)
- payment_method (varchar)
- transaction_id (varchar)
- status (enum: 'pending', 'success', 'failed')
- message (varchar)
- created_at (timestamp)
```

#### Tabel `photos` (Galeri Foto)
```sql
- id (uuid, PK)
- tenant_id (uuid, FK → tenants)
- url (varchar)
- caption (varchar)
- sort_order (integer)
- created_at (timestamp)
```

#### Tabel `themes` (Template Desain)
```sql
- id (uuid, PK)
- name (varchar)
- thumbnail_url (varchar)
- config (jsonb) -- warna, font, layout, dll.
- is_premium (boolean)
- is_active (boolean)
```

---

## 6. Fitur — Admin Panel

> Hanya dapat diakses oleh operator (software engineer). URL: `/admin`

### 6.1 Autentikasi Admin

- Login dengan email + password yang aman (Supabase Auth)
- Session persisten dengan auto-logout setelah tidak aktif 24 jam
- Proteksi route: semua halaman `/admin/*` redirect ke login jika tidak terautentikasi
- **Tidak ada fitur registrasi publik** — akun admin hanya dibuat manual oleh operator

### 6.2 Dashboard Utama Admin

**Tampilan Overview berisi:**
- Total klien aktif saat ini
- Total klien yang akan habis masa berlakunya dalam 30 hari
- Total RSVP hari ini (dari semua tenant)
- Total ucapan baru yang belum dimoderasi
- Grafik: jumlah undangan baru per bulan (12 bulan terakhir)
- Daftar 5 undangan terbaru yang dibuat
- Quick action: tombol "Tambah Klien Baru"

### 6.3 Manajemen Klien (Tenant Management)

#### 6.3.1 Daftar Semua Klien

- Tabel berisi: Nama Pasangan | Slug URL | Tanggal Pernikahan | Status | Tanggal Dibuat | Aksi
- Filter berdasarkan: status (aktif/nonaktif), bulan pernikahan
- Pencarian berdasarkan nama pasangan atau slug
- Pagination (20 klien per halaman)
- Sort berdasarkan tanggal dibuat, tanggal pernikahan, atau nama

#### 6.3.2 Tambah Klien Baru

Form multi-step wizard dengan tab:

**Step 1: Identitas Pasangan**
- Nama lengkap mempelai pria
- Nama panggilan mempelai pria
- Nama ayah & ibu mempelai pria
- Foto mempelai pria
- Nama lengkap mempelai wanita
- Nama panggilan mempelai wanita
- Nama ayah & ibu mempelai wanita
- Foto mempelai wanita
- Slug URL (auto-generate dari nama, bisa diedit manual)

**Step 2: Detail Acara**
- Tanggal & waktu akad nikah (jam mulai - jam selesai)
- Nama venue akad
- Alamat lengkap venue akad
- Link Google Maps venue akad
- Tanggal & waktu resepsi (jam mulai - jam selesai)
- Nama venue resepsi
- Alamat lengkap venue resepsi
- Link Google Maps venue resepsi
- Catatan tambahan acara (dress code, tema, dll.)

**Step 3: Konten & Cerita**
- Foto cover utama (hero section)
- Foto couple (wajib min. 1)
- Cerita cinta / how we met (rich text editor sederhana)
- Link musik latar (YouTube atau Spotify embed)

**Step 4: Tema & Tampilan**
- Pilihan tema/template (grid dengan preview thumbnail)
- Preview live sebelum disimpan

**Step 5: Konfigurasi Lanjutan**
- Aktifkan/nonaktifkan amplop digital
- Input nomor rekening (bisa lebih dari 1: BCA, Mandiri, BNI, GoPay, OVO, dll.)
- Password proteksi halaman (opsional)
- Tanggal kadaluarsa undangan
- Tombol simpan & generate link

#### 6.3.3 Edit Klien

- Semua field yang sama dengan form tambah klien
- Tampilkan preview perubahan sebelum simpan
- History perubahan (changelog sederhana: field apa yang diubah, kapan)

#### 6.3.4 Detail Klien

Halaman ringkasan per klien berisi:
- Ringkasan data pasangan dan acara
- Statistik: total tamu RSVP, total hadir, total tidak hadir
- Statistik: total ucapan, total amplop digital masuk
- Link undangan + tombol copy + QR code untuk dibagikan
- Tombol akses cepat ke: daftar RSVP, daftar ucapan, galeri foto

#### 6.3.5 Nonaktifkan / Hapus Klien

- Nonaktifkan: halaman undangan tampilkan pesan "Undangan ini sudah tidak aktif"
- Hapus: soft delete (data tetap ada di database, tidak bisa diakses publik)
- Konfirmasi dua langkah sebelum hapus

### 6.4 Manajemen Template/Tema

- Daftar semua tema yang tersedia
- Tambah tema baru (upload file konfigurasi JSON + thumbnail)
- Edit konfigurasi tema (warna primer, sekunder, font heading, font body, layout)
- Aktifkan/nonaktifkan tema
- Preview tema dengan data dummy

### 6.5 Manajemen Ucapan (Moderasi Global)

- Daftar semua ucapan dari semua tenant (bisa difilter per tenant)
- Approve / reject ucapan
- Tandai ucapan sebagai spam
- Filter: belum dimoderasi, disetujui, ditolak

---

## 7. Fitur — Halaman Undangan Tamu

> URL Publik: `/{slug-pasangan}` atau `/{slug-pasangan}?to={kode-tamu}`

### 7.1 Akses & Keamanan Halaman

- Jika undangan di-password-protect: tampilkan layar password sebelum konten
- Parameter `?to=KODE_TAMU` untuk personalisasi nama tamu di pembuka ("Kepada Yth. Bapak/Ibu Ahmad...")
- Jika undangan sudah kadaluarsa: tampilkan halaman "Acara telah berlangsung, terima kasih atas doa dan dukungan Anda"
- Jika undangan nonaktif: halaman 404 custom yang elegan

### 7.2 Struktur Halaman (Sections)

Seluruh halaman adalah **single-page scrolling** dengan animasi masuk per section.

#### Section 1: Cover / Hero
- Foto pasangan sebagai background full-screen
- Nama mempelai pria dan wanita dalam tipografi besar dan elegan
- Tanggal pernikahan
- Tombol "Buka Undangan" (dengan animasi amplop terbuka atau serupa)
- Jika ada parameter `?to=NAMA_TAMU`: tampilkan "Kepada Yth. [Nama Tamu]" di atas nama pasangan
- Musik latar otomatis play (dengan indikator dan tombol mute/unmute) — berupa ikon floating

#### Section 2: Bismillah / Opening
- Ayat Al-Quran tentang pernikahan (default surah Ar-Rum 21) atau kalimat pembuka sesuai agama
- Kaligrafi atau ornamen sesuai tema

#### Section 3: Identitas Mempelai
- Foto mempelai pria dengan data lengkap (nama, nama orang tua)
- Foto mempelai wanita dengan data lengkap (nama, nama orang tua)
- Desain kartu atau layout split yang aesthetic

#### Section 4: Detail Acara
- Card acara akad nikah: tanggal, waktu, nama venue, alamat, tombol "Lihat Peta" (buka Google Maps)
- Card acara resepsi: informasi serupa
- Countdown timer: hitung mundur hari, jam, menit, detik menuju acara terdekat
  - Jika akad sudah lewat tapi resepsi belum: countdown ke resepsi
  - Jika keduanya sudah lewat: tampilkan "Acara telah berlangsung"
- Tombol "Simpan ke Kalender" (generate file .ics untuk Google Calendar / iCal)

#### Section 5: Cerita Cinta (Love Story)
- Timeline atau narasi cerita bagaimana pasangan bertemu
- Disertai foto-foto (opsional per milestone cerita)
- Desain timeline yang interaktif dan dapat di-scroll horizontal atau vertikal

#### Section 6: Galeri Foto
- Grid atau carousel foto pasangan
- Klik foto → lightbox / modal zoom
- Minimum tampil 4 foto, maksimum 20 foto
- Lazy loading untuk performa

#### Section 7: RSVP
- Form konfirmasi kehadiran:
  - Nama lengkap (pre-fill jika ada parameter `?to=`)
  - Nomor WhatsApp / telepon
  - Konfirmasi kehadiran: Hadir / Tidak Hadir / Belum Tahu
  - Jika hadir: pilih acara (Akad / Resepsi / Keduanya) + jumlah orang yang hadir
  - Pesan opsional
- Tombol submit dengan feedback loading & sukses
- Setelah submit: tampilkan ucapan terima kasih dan ringkasan respon
- Mencegah submit duplikat dari nomor HP yang sama

#### Section 8: Ucapan & Doa
- Form kirim ucapan:
  - Nama
  - Pesan ucapan (textarea, max 500 karakter)
  - Tombol kirim
- Daftar ucapan yang sudah disetujui operator
  - Tampil dalam card atau chat-bubble style
  - Animasi masuk (slide up) saat ucapan baru tampil
  - Pagination atau infinite scroll
  - Hanya tampilkan ucapan yang status `is_approved = true`

#### Section 9: Amplop Digital (Opsional, bisa dinonaktifkan)
- Pengantar sopan tentang amplop digital
- Daftar nomor rekening / e-wallet pasangan:
  - Logo bank/e-wallet
  - Nomor rekening
  - Nama pemilik rekening
  - Tombol "Salin Nomor Rekening" (copy to clipboard)
- Form konfirmasi transfer (nama pengirim, jumlah, pesan — untuk pencatatan)

#### Section 10: Footer / Penutup
- Ucapan penutup dari pasangan
- Nama pasangan
- Logo atau watermark platform (dapat dinonaktifkan jika dikonfigurasi operator)
- Tombol "Bagikan Undangan" (native share API atau WhatsApp share)

### 7.3 Fitur Teknis Halaman Undangan

- **Fully Responsive**: optimal di smartphone (375px+), tablet, dan desktop
- **Progressive Web App (PWA)**: bisa "Add to Home Screen"
- **SEO Optimized**: meta tags dinamis per tenant (og:title, og:image, og:description)
- **Page Speed**: First Contentful Paint < 2 detik di jaringan 4G
- **Offline Support**: Service worker untuk caching aset statis
- **Aksesibilitas**: ARIA labels, keyboard navigation, kontras warna memadai

---

## 8. Fitur — Manajemen Tamu & RSVP

### 8.1 Import Daftar Tamu (Admin)

- Upload file CSV atau Excel dengan kolom: Nama, Nomor HP, Kategori (keluarga/teman/kolega), Catatan
- Sistem parse dan validasi file sebelum import
- Preview data sebelum konfirmasi import
- Laporan hasil import: berhasil / gagal / duplikat
- Template file CSV/Excel tersedia untuk diunduh

### 8.2 Input Tamu Manual (Admin)

- Form tambah tamu satu per satu
- Field: Nama, Nomor HP, Kategori, VIP (ya/tidak), Nomor Meja (opsional), Catatan

### 8.3 Generate Kode Unik Tamu

- Sistem otomatis generate kode unik (`invitation_code`) per tamu
- Kode digunakan sebagai parameter URL: `?to=KODE_TAMU`
- Kode bersifat case-insensitive

### 8.4 Kirim Undangan via WhatsApp

- Tombol "Salin Pesan WhatsApp" per tamu di admin:
  - Menghasilkan teks pesan siap kirim yang berisi link undangan personal tamu
- Bulk action: pilih banyak tamu → generate pesan WhatsApp batch
- Template pesan dapat dikustomisasi per tenant

### 8.5 Daftar & Filter RSVP (Admin)

- Tabel RSVP dengan kolom: Nama | Nomor HP | Status | Jumlah Tamu | Acara yang Dihadiri | Waktu Submit
- Filter: status kehadiran, acara yang dipilih, tanggal submit
- Pencarian berdasarkan nama atau nomor HP
- Export ke CSV/Excel untuk kebutuhan koordinasi hari H

### 8.6 Ringkasan Statistik RSVP (Admin & Klien)

- Jumlah total yang konfirmasi hadir (dan perkiraan jumlah orang)
- Jumlah total yang konfirmasi tidak hadir
- Jumlah yang belum konfirmasi (dari daftar tamu yang sudah di-input)
- Breakdown per acara: akad vs resepsi

---

## 9. Fitur — Multimedia & Galeri

### 9.1 Upload Foto (Admin)

- Drag-and-drop atau pilih file foto
- Format yang didukung: JPG, PNG, WebP
- Ukuran maksimal per foto: 10MB
- Sistem otomatis kompres dan resize via Cloudinary
- Urutan foto dapat diatur (drag-and-drop sorting)
- Input caption per foto (opsional)

### 9.2 Optimasi Gambar Otomatis

- Cloudinary menerapkan: auto-quality, auto-format (WebP untuk browser modern), responsive sizing
- Cover photo dioptimasi sebagai OG Image untuk social media preview

### 9.3 Musik Latar

- Input URL YouTube atau Spotify
- Sistem embed audio yang ringan (tidak load full YouTube player)
- Untuk YouTube: ambil audio via embed minimal
- Fallback: upload file MP3 langsung (max 5MB) ke Supabase Storage
- Autoplay dengan volume default 30%, dengan tombol mute/unmute yang mudah ditemukan

---

## 9b. Fitur — Lottie Animation Pasangan *(Add-on)*

> **Status**: Aktif untuk 1 klien spesifik (permintaan khusus). Direncanakan sebagai add-on berbayar untuk klien lain mulai Phase 3.

### 9b.1 Latar Belakang & Keputusan Teknis

Seorang klien meminta agar halaman undangannya menampilkan **animasi pasangan** sebagai pengganti atau pelengkap foto statis. Setelah evaluasi beberapa opsi, solusi yang dipilih adalah **Lottie Animation** dengan pertimbangan:

| Opsi | Keputusan | Alasan |
|---|---|---|
| Lottie Animation (JSON) | ✅ **Dipilih** | Ringan (~50-200KB), bisa dikustomisasi warna sesuai tema, gratis dari LottieFiles, render mulus di semua device |
| Illustrated Avatar / Kartun | ❌ Ditolak | Membutuhkan jasa illustrator manual per klien, biaya tinggi, tidak scalable |
| Cinemagraph (foto bergerak) | ❌ Ditolak | File besar (>5MB), butuh keahlian editing video khusus, berat di bandwidth |
| Animasi CSS pada foto | ❌ Ditolak | Efek terlalu sederhana, tidak cukup differensiatif sebagai add-on berbayar |

### 9b.2 Cara Kerja (Alur Operator)

1. Operator browsing animasi bertema pasangan/pernikahan di **[LottieFiles.com](https://lottiefiles.com)** (free library)
2. Pilih animasi yang cocok dengan **tema undangan klien** (misal: tema Sakura → pilih animasi pasangan dengan warna pink; tema Celestial Dark → animasi dengan warna navy/gold)
3. Salin URL CDN file `.json` dari LottieFiles
4. Input URL tersebut ke field `lottie_animation_url` di Admin Panel pada halaman edit klien
5. Pilih posisi tampil animasi: Hero, Section Pasangan, atau keduanya
6. Simpan — animasi langsung tampil di halaman undangan tanpa deploy ulang

### 9b.3 Konfigurasi Admin Panel

Pada halaman **Edit Klien**, tambahkan sub-section "Animasi Pasangan (Add-on)":

- Toggle aktifkan/nonaktifkan animasi
- Input field: URL Lottie JSON (dari LottieFiles CDN)
- Pilih posisi tampil:
  - `Hero Section` — ditampilkan di bawah nama pasangan pada cover
  - `Section Identitas Pasangan` — ditampilkan di antara kartu mempelai pria dan wanita
  - `Keduanya` — tampil di dua posisi sekaligus
- Preview langsung di admin setelah URL diinput
- Pilih ukuran animasi: Kecil (200px) / Sedang (300px) / Besar (400px)
- Toggle loop: animasi berulang terus / hanya sekali

### 9b.4 Tampilan di Halaman Undangan Tamu

- Animasi di-render menggunakan library `lottie-react` (client-side)
- Muncul dengan efek **fade-in** saat section masuk viewport (intersection observer)
- Jika file Lottie gagal load (timeout / URL rusak): **graceful fallback** ke foto statis pasangan, tanpa error yang terlihat tamu
- Animasi tidak autoplay hingga viewport terdeteksi → menghemat CPU/baterai device tamu
- Pada device dengan `prefers-reduced-motion`: animasi diganti foto statis otomatis

### 9b.5 Panduan Pemilihan Animasi per Tema

| Tema Undangan | Kata Kunci Pencarian di LottieFiles | Warna yang Dikustomisasi |
|---|---|---|
| Sakura | `couple romantic`, `wedding love`, `hearts` | Pink #F9A8D4, Putih |
| Ivory Elegance | `wedding elegant`, `couple silhouette` | Krem #F5F0E8, Emas #C9A96E |
| Botanical | `nature couple`, `floral wedding` | Hijau Sage #84A98C, Krem |
| Celestial Dark | `starry night couple`, `galaxy love` | Navy #1E3A5F, Emas #F4D03F |
| Batik Heritage | `traditional couple`, `cultural wedding` | Coklat #8B4513, Oranye #D2691E |

### 9b.6 Monetisasi Add-on Ini

- **Klien saat ini**: disertakan tanpa biaya tambahan (custom request pertama)
- **Klien masa depan**: ditawarkan sebagai add-on berbayar
  - Harga rekomendasi: **Rp 75.000 - Rp 100.000** (one-time, per undangan)
  - Termasuk: kurasi animasi oleh operator sesuai tema + setup

### 9b.7 Ketergantungan Teknis

| Dependency | Detail |
|---|---|
| Library | `lottie-react` (npm, gratis, open source) |
| Sumber Animasi | LottieFiles.com (free tier: unlimited browse & use) |
| Ukuran File Animasi | Target < 200KB per file untuk performa optimal |
| Kompatibilitas | Semua browser modern (Chrome, Safari, Firefox, Samsung Internet) |



### 10.1 Konfigurasi Rekening (Admin)

- Tambah multiple rekening bank / e-wallet:
  - Bank: BCA, Mandiri, BNI, BRI, CIMB, BSI, dll.
  - E-wallet: GoPay, OVO, DANA, ShopeePay, LinkAja
- Field per rekening: nama bank/e-wallet, nomor rekening, nama pemilik, opsional foto QR code
- Urutan tampilan dapat diatur
- Rekening tertentu dapat dinonaktifkan tanpa dihapus

### 10.2 Tampilan Amplop Digital (Halaman Tamu)

- Desain yang elegan dan tidak terasa seperti "minta uang"
- Setiap rekening ditampilkan sebagai card dengan logo bank
- Tombol salin nomor rekening → konfirmasi visual "Tersalin!"
- Jika ada QR code: tombol tampilkan QR code (modal/popup)

### 10.3 Konfirmasi Transfer (Opsional)

- Form sederhana: nama pengirim, nominal transfer, pesan
- Data tersimpan di database untuk rekap operator/pasangan
- Pasangan dapat melihat daftar konfirmasi transfer di dashboard mereka
- **Catatan**: Platform TIDAK memproses uang secara langsung; tamu transfer manual ke rekening pasangan

---

## 11. Fitur — Notifikasi & Komunikasi

### 11.1 Notifikasi Email ke Operator

- Email terkirim setiap ada RSVP baru yang masuk
- Email digest harian: ringkasan aktivitas semua tenant (bisa dinonaktifkan)
- Email alert: jika ada ucapan baru yang menunggu moderasi

### 11.2 Notifikasi Email ke Klien (Pasangan)

- Email sambutan saat undangan pertama kali dibuat (berisi link undangan dan panduan)
- Email mingguan: statistik RSVP (jumlah hadir, tidak hadir, total ucapan)
- Email hari H-7 sebelum pernikahan: ringkasan final daftar tamu yang konfirmasi hadir
- Semua email dari domain custom (misal: noreply@undanganku.id) via Resend

### 11.3 Notifikasi Real-time di Admin Panel

- Badge notifikasi di header admin: jumlah ucapan yang menunggu moderasi
- Notifikasi in-app: RSVP baru masuk (update otomatis tanpa refresh)

---

## 12. Fitur — Analitik & Laporan

### 12.1 Dashboard Statistik per Undangan

Tersedia untuk Admin dan Klien (jika diberikan akses):
- **Visitor Count**: total pengunjung halaman undangan (unik per hari)
- **RSVP Rate**: persentase tamu yang sudah RSVP dari total daftar tamu
- **Grafik RSVP over time**: bar chart RSVP per hari
- **Breakdown kehadiran**: pie chart Hadir vs Tidak Hadir vs Belum Konfirmasi
- **Top referrer**: dari mana tamu mengakses (WhatsApp, Instagram, langsung)

### 12.2 Export Data

- Export daftar tamu + status RSVP → CSV/Excel
- Export semua ucapan → PDF atau CSV
- Export konfirmasi amplop digital → CSV

### 12.3 QR Code Undangan

- Generate QR code dinamis per undangan
- QR code dapat diunduh sebagai PNG untuk dicetak di:
  - Kartu undangan fisik
  - Spanduk / backdrop foto
  - Story Instagram
- Ukuran QR: tersedia dalam 3 ukuran (kecil, sedang, besar)

---

## 13. Non-Functional Requirements

### 13.1 Performa

| Metrik | Target |
|---|---|
| First Contentful Paint | < 2 detik (4G) |
| Largest Contentful Paint | < 3.5 detik (4G) |
| Time to Interactive | < 4 detik (4G) |
| Lighthouse Performance Score | ≥ 85 (mobile) |
| Lighthouse SEO Score | ≥ 95 |
| Uptime | ≥ 99.5% |

### 13.2 Skalabilitas

- Platform harus mampu menangani 100 tenant aktif serentak tanpa degradasi performa
- Setiap halaman undangan harus bisa melayani 500 concurrent visitors
- Database queries dioptimasi dengan indexing yang tepat

### 13.3 Kompatibilitas Browser & Device

| Platform | Versi Minimum |
|---|---|
| Chrome (Android) | v90+ |
| Safari (iOS) | iOS 14+ |
| Chrome (Desktop) | v90+ |
| Firefox (Desktop) | v88+ |
| Samsung Internet | v14+ |
| Resolusi Minimum | 375px wide |

### 13.4 Aksesibilitas

- WCAG 2.1 Level AA compliance
- Semua gambar memiliki alt text
- Kontras warna minimum 4.5:1 untuk teks
- Semua form dapat dioperasikan dengan keyboard

---

## 14. Monetisasi & Model Bisnis

### 14.1 Paket Layanan (Rekomendasi)

| Paket | Harga (Contoh) | Fitur | Durasi Aktif |
|---|---|---|---|
| **Basic** | Rp 150.000 | 1 tema, hingga 100 tamu, galeri 10 foto, RSVP | 3 bulan |
| **Standard** | Rp 250.000 | 3 tema, hingga 300 tamu, galeri 20 foto, RSVP + Amplop Digital, musik | 6 bulan |
| **Premium** | Rp 400.000 | Semua tema, unlimited tamu, galeri 20 foto, semua fitur + analitik | 12 bulan |

### 14.2 Add-on (Opsional di Masa Depan)

- Perpanjangan masa aktif: Rp 50.000 per 3 bulan
- Domain custom (misal: andi-sari.com): Rp 150.000/tahun
- **Animasi Pasangan (Lottie)**: Rp 75.000 - Rp 100.000 per undangan *(lihat Fitur 9b)*
- Cetak QR code dalam kartu fisik (jika operator menambah layanan ini)

### 14.3 Struktur Biaya Operator

| Item | Estimasi Biaya |
|---|---|
| Vercel Hobby Hosting | $0/bulan |
| Supabase Free Tier | $0/bulan |
| Cloudinary Free Tier | $0/bulan |
| Resend Free Tier | $0/bulan |
| Domain .id / .com | ~Rp 150.000/tahun |
| **Total** | **~Rp 12.500/bulan** |

---

## 15. Desain UI/UX

### 15.1 Prinsip Desain

1. **Elegance First**: Setiap elemen harus terasa premium dan mewah, sesuai konteks pernikahan
2. **Mobile-First**: Desain dimulai dari tampilan mobile (mayoritas tamu membuka via WhatsApp → HP)
3. **Emosional**: Desain harus membangkitkan perasaan bahagia dan sentimental
4. **Cepat**: Animasi tidak boleh mengorbankan kecepatan loading
5. **Intuitif**: Tamu tidak memerlukan panduan untuk menggunakan halaman undangan

### 15.2 Sistem Desain (Design System)

- **Color System**: Setiap tema memiliki: primary color, secondary color, accent color, background, text
- **Typography Scale**: H1 (display), H2, H3, Body, Caption, Label — masing-masing dengan font-weight yang konsisten
- **Spacing System**: Berbasis kelipatan 4px (4, 8, 12, 16, 24, 32, 48, 64, 96)
- **Border Radius**: Soft (rounded-lg) sebagai default tema romantis; sharp untuk tema modern/minimalis
- **Shadow System**: Subtle shadows untuk kedalaman, tidak berlebihan

### 15.3 Tema yang Tersedia (Minimum V1)

| Nama Tema | Karakteristik | Target Pasangan |
|---|---|---|
| **Sakura** | Pink pastel, font kursif, bunga sakura | Romantis, feminin |
| **Ivory Elegance** | Krem & emas, serif mewah, minimalis | Klasik, formal |
| **Botanical** | Hijau sage, elemen daun, earthy | Natural, outdoor |
| **Celestial Dark** | Navy & gold, bintang, moody | Modern, dramatis |
| **Batik Heritage** | Motif batik, coklat-oranye, tradisional | Adat, budaya |

### 15.4 Admin Panel UI

- Dark mode sebagai default (nuansa profesional)
- Sidebar navigasi dengan ikon
- Data table yang clean dan mudah dibaca
- Form yang informatif dengan validasi inline
- Loading state dan empty state yang jelas

---

## 16. Keamanan & Privasi

### 16.1 Autentikasi & Otorisasi

- Admin: Supabase Auth dengan JWT, session timeout 24 jam
- Row Level Security (RLS) di Supabase: setiap query tenant hanya bisa mengakses data tenant-nya sendiri
- Semua endpoint API dilindungi autentikasi

### 16.2 Proteksi Data Tamu

- Nomor HP tamu tidak ditampilkan publik di halaman undangan
- Data RSVP hanya dapat dilihat oleh admin dan klien pemilik undangan
- Tidak ada data tamu yang dijual atau dibagikan ke pihak ketiga
- Compliance dengan UU PDP (Perlindungan Data Pribadi) Indonesia

### 16.3 Keamanan Aplikasi

- HTTPS wajib di semua endpoint (otomatis via Vercel)
- Input sanitization untuk mencegah XSS pada form ucapan dan RSVP
- Rate limiting pada form publik (RSVP, ucapan) untuk mencegah spam
- CSRF protection pada semua form
- Environment variables untuk semua credentials (tidak di-hardcode)

### 16.4 Backup Data

- Supabase melakukan backup otomatis harian (free tier: 7 hari)
- Operator disarankan melakukan export manual data bulanan

---

## 17. Roadmap & Prioritas Fitur

### Phase 1 — MVP (Bulan 1-2)

> **Tujuan**: Platform bisa digunakan untuk klien pertama

- [ ] Setup infrastruktur (Next.js, Supabase, Vercel, Cloudinary)
- [ ] Admin Panel: login, tambah klien, edit klien
- [ ] Halaman undangan: Hero, Identitas Mempelai, Detail Acara, RSVP, Ucapan
- [ ] 2 tema dasar (Sakura + Ivory Elegance)
- [ ] Import tamu via CSV
- [ ] Export RSVP ke CSV
- [ ] Countdown timer
- [ ] Galeri foto

### Phase 2 — Core Features (Bulan 3-4)

> **Tujuan**: Fitur lengkap untuk layanan premium

- [ ] Amplop digital (tampilan rekening + konfirmasi transfer)
- [ ] Musik latar
- [ ] Personalisasi nama tamu via URL parameter
- [ ] Generate & download QR code
- [ ] Notifikasi email via Resend
- [ ] Dashboard statistik per undangan
- [ ] 3 tema tambahan
- [ ] Password proteksi halaman
- [ ] **Lottie Animation pasangan** — implementasi untuk klien pertama (custom request), install `lottie-react`, tambah field di admin & halaman undangan

### Phase 3 — Polish & Scale (Bulan 5-6)

> **Tujuan**: Pengalaman premium dan siap scale

- [ ] PWA support
- [ ] Dashboard klien (pasangan bisa login sendiri)
- [ ] Love story / timeline section
- [ ] Real-time ucapan (tanpa refresh)
- [ ] SEO optimization per tenant
- [ ] Moderasi ucapan di admin
- [ ] Analitik visitor (page views)
- [ ] Simpan ke kalender (.ics)
- [ ] Bulk WhatsApp message generator
- [ ] **Lottie Animation dijadikan add-on resmi berbayar** — UI kurasi animasi di admin, panduan per tema, harga add-on ditetapkan

### Phase 4 — Future (Bulan 7+)

> **Tujuan**: Diferensiasi dan pertumbuhan

- [ ] Custom domain per klien
- [ ] Video highlight pernikahan (embed YouTube)
- [ ] Livestream embed
- [ ] Guest book digital dengan fitur foto
- [ ] AI-generated love story berdasarkan input pasangan
- [ ] Multi-bahasa (Indonesia + Inggris)

---

## 18. Asumsi & Ketergantungan

### 18.1 Asumsi

- Operator memiliki pengetahuan teknis untuk setup dan deploy infrastruktur
- Klien menggunakan WhatsApp sebagai media utama menyebarkan undangan
- Mayoritas tamu mengakses undangan melalui smartphone Android
- Pasangan menyerahkan semua aset (foto, data) kepada operator sebelum undangan dibuat
- Operator memiliki waktu onboarding klien baru maksimal 30-60 menit per klien

### 18.2 Ketergantungan Eksternal

| Layanan | Ketergantungan | Risiko Jika Gagal |
|---|---|---|
| Vercel | Hosting frontend | Semua halaman tidak dapat diakses |
| Supabase | Database & auth | Data tidak dapat diambil |
| Cloudinary | CDN foto | Foto tidak tampil |
| Resend | Email notifikasi | Notifikasi tidak terkirim |
| Google Maps | Embed peta venue | Peta tidak tampil (degraded gracefully) |
| Google Fonts | Tipografi | Fallback ke font sistem |
| LottieFiles CDN | Sumber file animasi Lottie | Animasi tidak tampil, fallback ke foto statis |

---

## 19. Risiko & Mitigasi

| Risiko | Probabilitas | Dampak | Mitigasi |
|---|---|---|---|
| Vercel free tier melebihi bandwidth | Sedang | Tinggi | Monitor penggunaan; upgrade ke Pro ($20/bln) jika perlu |
| Supabase free tier melebihi storage 500MB | Rendah | Sedang | Kompres foto via Cloudinary, arsip data lama |
| Spam pada form RSVP / ucapan | Tinggi | Sedang | Rate limiting + honeypot field + moderasi ucapan |
| Klien minta fitur di luar scope | Tinggi | Rendah | Buat scope perjanjian layanan yang jelas di awal |
| Data tamu bocor | Rendah | Sangat Tinggi | RLS Supabase + enkripsi + tidak simpan data sensitif berlebihan |
| Halaman lambat karena foto besar | Sedang | Sedang | Wajibkan upload via admin → Cloudinary otomatis kompres |
| Pasangan cerai / pembatalan pernikahan | Rendah | Rendah | Nonaktifkan undangan; kebijakan refund diserahkan operator |

---

## 20. Glossary

| Istilah | Definisi |
|---|---|
| **Tenant** | Satu klien (pasangan pengantin) dalam sistem multi-tenant |
| **Slug** | Identifier URL-friendly untuk setiap undangan, misal: `andi-dan-sari` |
| **RSVP** | Répondez S'il Vous Plaît — konfirmasi kehadiran tamu |
| **Amplop Digital** | Fitur pengiriman hadiah uang secara digital melalui transfer bank / e-wallet |
| **Admin Panel** | Antarmuka pengelolaan platform yang hanya bisa diakses operator |
| **Free Tier** | Level layanan gratis yang disediakan cloud provider |
| **RLS** | Row Level Security — mekanisme keamanan database Supabase |
| **PWA** | Progressive Web App — web app yang bisa diinstall seperti aplikasi native |
| **CDN** | Content Delivery Network — jaringan distribusi aset statis |
| **OG Image** | Open Graph Image — gambar preview saat link dibagikan di media sosial |
| **Soft Delete** | Menghapus data secara logis (tandai sebagai deleted) tanpa menghapus dari database |
| **Countdown Timer** | Penghitung mundur waktu menuju tanggal pernikahan |
| **Lottie Animation** | Format animasi berbasis JSON yang ringan, dirender oleh library `lottie-react`; sumber animasi dari LottieFiles.com |
| **Add-on** | Fitur tambahan di luar paket utama yang ditawarkan dengan biaya terpisah |

---

*Dokumen ini bersifat living document dan akan diperbarui seiring perkembangan produk.*

*Versi 1.1.0 — Mei 2025 | Changelog: Tambah Fitur 9b Lottie Animation Pasangan (custom request klien + rencana add-on)*
