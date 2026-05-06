import Link from "next/link";
import { Heart } from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-wedding flex flex-col items-center justify-center px-4 text-center">
      <div className="max-w-lg mx-auto">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Heart className="h-8 w-8 text-wedding-rose fill-wedding-rose/20" />
        </div>

        <h1 className="font-display text-4xl sm:text-5xl text-wedding-charcoal mb-4">
          Undangan Digital
        </h1>
        <p className="font-body text-wedding-charcoal/70 text-lg mb-8">
          Buat undangan pernikahan digital yang indah dan berkesan untuk hari bahagia Anda
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/admin/login"
            className="inline-flex items-center rounded-full px-8 py-3 text-sm font-medium text-white bg-wedding-rose hover:opacity-90 transition-opacity shadow-md"
          >
            Admin Login
          </Link>
          <Link
            href="/admin"
            className="inline-flex items-center rounded-full px-8 py-3 text-sm font-medium text-wedding-rose border border-wedding-rose hover:bg-wedding-rose/5 transition-colors"
          >
            Dashboard
          </Link>
        </div>

        <div className="mt-16 space-y-4 text-sm text-wedding-charcoal/50">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="font-display text-2xl text-wedding-charcoal">10+</p>
              <p>Section</p>
            </div>
            <div>
              <p className="font-display text-2xl text-wedding-charcoal">5</p>
              <p>Tema</p>
            </div>
            <div>
              <p className="font-display text-2xl text-wedding-charcoal">RSVP</p>
              <p>Otomatis</p>
            </div>
          </div>
        </div>
      </div>

      <footer className="absolute bottom-6 text-xs text-wedding-charcoal/30">
        Dibuat dengan ❤️ untuk pasangan bahagia
      </footer>
    </main>
  );
}
