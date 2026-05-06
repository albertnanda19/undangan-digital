import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[#FDF8F0] px-4 text-center">
      <h1 className="font-display text-6xl text-[#2D3748] mb-4">404</h1>
      <h2 className="font-display text-2xl text-[#2D3748] mb-3">Halaman Tidak Ditemukan</h2>
      <p className="text-[#2D3748]/60 max-w-sm mb-8">
        Undangan yang Anda cari mungkin sudah tidak aktif atau alamatnya salah.
      </p>
      <Link
        href="/"
        className="inline-flex items-center rounded-full px-6 py-2.5 text-sm font-medium text-white bg-[#E8748A] hover:opacity-90 transition-opacity"
      >
        Kembali ke Beranda
      </Link>
    </main>
  );
}
