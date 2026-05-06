"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface Props {
  groomNickname: string;
  brideNickname: string;
  akadDate: string;
  coverPhotoUrl?: string;
  guestName?: string;
  themeConfig: Record<string, string>;
  onOpen: () => void;
}

export function OpeningCover({ groomNickname, brideNickname, akadDate, coverPhotoUrl, guestName, themeConfig, onOpen }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden">
      {/* Background */}
      {coverPhotoUrl ? (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${coverPhotoUrl})` }}
        />
      ) : (
        <div className="absolute inset-0" style={{ backgroundColor: themeConfig.backgroundColor }} />
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

      {/* Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center px-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {guestName && (
          <motion.div
            className="mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-white/70 text-sm">Kepada Yth.</p>
            <p className="text-white text-lg font-medium mt-1">{guestName}</p>
          </motion.div>
        )}

        <motion.p
          className="text-white/60 text-sm tracking-widest uppercase mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Undangan Pernikahan
        </motion.p>

        <motion.h1
          className="font-script text-4xl sm:text-6xl text-white mb-2"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          {groomNickname} & {brideNickname}
        </motion.h1>

        <motion.p
          className="font-display text-white/80 text-lg mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {formatDate(akadDate)}
        </motion.p>

        <motion.button
          onClick={onOpen}
          className="mt-10 flex items-center gap-3 rounded-full px-8 py-3 text-white font-medium transition-all"
          style={{ backgroundColor: themeConfig.primaryColor }}
          whileHover={{ scale: 1.05, boxShadow: `0 0 30px ${themeConfig.primaryColor}60` }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <Mail className="h-5 w-5" />
          Buka Undangan
        </motion.button>
      </motion.div>
    </div>
  );
}
