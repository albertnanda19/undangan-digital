"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Quote, SendHorizonal } from "lucide-react";
import axios from "axios";
import { timeAgo } from "@/lib/utils";

interface WishItem {
  id: string;
  name: string;
  message: string;
  created_at: string;
}

interface Props {
  tenantId: string;
  initialWishes: WishItem[];
  themeConfig: Record<string, string>;
}

export function WishesSection({ tenantId, initialWishes, themeConfig }: Props) {
  const [wishes] = useState(initialWishes);
  const [visibleCount, setVisibleCount] = useState(10);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [honeypot, setHoneypot] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    setLoading(true);
    try {
      await axios.post("/api/invitation/wishes", { tenantId, name, message, website: honeypot });
      setSubmitted(true);
      setName("");
      setMessage("");
    } catch {
      // silent fail
    } finally {
      setLoading(false);
    }
  };

  const visibleWishes = wishes.slice(0, visibleCount);

  return (
    <section id="wishes" className="invitation-section" style={{ backgroundColor: themeConfig.backgroundColor }}>
      <motion.div
        className="max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="section-title" style={{ color: themeConfig.textColor }}>Doa & Ucapan</h2>
        <p className="section-subtitle" style={{ color: themeConfig.primaryColor }}>Wishes</p>

        <div className="rounded-3xl border p-6 mb-10" style={{ borderColor: themeConfig.primaryColor + "30", backgroundColor: themeConfig.secondaryColor }}>
          {submitted ? (
            <p className="text-center text-sm py-4" style={{ color: themeConfig.textColor }}>
              Terima kasih! Ucapan Anda sedang menunggu persetujuan. 💌
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Nama Anda"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full border-b px-1 py-2.5 text-sm outline-none bg-transparent"
                style={{ borderColor: themeConfig.primaryColor + "40", color: themeConfig.textColor }}
              />
              <div className="relative">
                <textarea
                  placeholder="Tulis ucapan & doa untuk mempelai..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value.slice(0, 500))}
                  required
                  rows={3}
                  className="w-full border-b px-1 py-2.5 text-sm outline-none resize-none bg-transparent"
                  style={{ borderColor: themeConfig.primaryColor + "40", color: themeConfig.textColor }}
                />
                <span className="absolute bottom-2 right-3 text-xs opacity-50" style={{ color: themeConfig.textColor }}>
                  {message.length}/500
                </span>
              </div>
              <input
                type="text"
                name="website"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                style={{ display: "none" }}
                tabIndex={-1}
                autoComplete="off"
              />
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 rounded-full w-12 h-12 text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                style={{ backgroundColor: themeConfig.primaryColor }}
              >
                <SendHorizonal className="h-4 w-4" />
              </button>
            </form>
          )}
        </div>

        <div className="space-y-4">
          {visibleWishes.length === 0 && (
            <div className="text-center py-10 rounded-2xl border" style={{ borderColor: themeConfig.primaryColor + "20" }}>
              <p className="text-3xl mb-2">💌</p>
              <p style={{ color: themeConfig.textColor, opacity: 0.7 }}>Jadilah yang pertama memberikan doa</p>
            </div>
          )}
          {visibleWishes.map((wish, i) => (
            <motion.div
              key={wish.id}
              className="rounded-2xl border p-5 shadow-sm relative"
              style={{ borderColor: themeConfig.primaryColor + "15", backgroundColor: themeConfig.secondaryColor, boxShadow: `0 10px 25px ${themeConfig.primaryColor}15` }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              <Quote className="h-8 w-8 absolute -top-2 -left-2 opacity-20" style={{ color: themeConfig.primaryColor }} />
              <div className="flex gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm leading-relaxed" style={{ color: themeConfig.textColor }}>{wish.message}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs font-medium" style={{ color: themeConfig.primaryColor }}>{wish.name}</span>
                    <span className="text-xs opacity-50" style={{ color: themeConfig.textColor }}>
                      {timeAgo(wish.created_at)}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {wishes.length > visibleCount && (
          <div className="text-center mt-6">
            <button
              onClick={() => setVisibleCount((c) => c + 10)}
              className="text-sm font-medium underline underline-offset-4"
              style={{ color: themeConfig.primaryColor }}
            >
              Lihat Lebih Banyak
            </button>
          </div>
        )}
      </motion.div>
    </section>
  );
}
