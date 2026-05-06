"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { LottieAnimation } from "@/components/invitation/LottieAnimation";
import type { Tenant, ThemeConfig } from "@/types";

type Props = { tenant: Tenant; themeConfig: ThemeConfig; guestName?: string };

export function HeroSection({ tenant, themeConfig, guestName }: Props) {
  const showLottieInHero =
    tenant.lottieAutoSelect !== false ||
    tenant.lottieAnimationPosition === "hero" ||
    tenant.lottieAnimationPosition === "both";

  const handleScrollDown = () => {
    document.getElementById("opening")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {tenant.coverPhotoUrl ? (
        <>
          <Image src={tenant.coverPhotoUrl} alt="Cover" fill priority className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/70" />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, transparent 40%, ${themeConfig.primaryColor}40 100%)` }} />
        </>
      ) : (
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${themeConfig.backgroundColor} 0%, ${themeConfig.secondaryColor} 50%, ${themeConfig.backgroundColor} 100%)` }} />
      )}

      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        {guestName && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3 }} className="mb-6">
            <div className="inline-block px-6 py-2 rounded-full text-sm backdrop-blur-sm border" style={{ backgroundColor: "rgba(255,255,255,0.15)", borderColor: "rgba(255,255,255,0.3)", color: "#fff" }}>
              Kepada Yth. <strong>{guestName}</strong>
            </div>
          </motion.div>
        )}

        {showLottieInHero && (
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, delay: 0.5 }} className="mb-4">
            <LottieAnimation
              manualUrl={tenant.lottieAnimationUrl && !tenant.lottieAutoSelect ? tenant.lottieAnimationUrl : undefined}
              themeId={tenant.lottieAutoSelect !== false ? tenant.themeId : undefined}
              tenantSlug={tenant.lottieAutoSelect !== false ? tenant.slug : undefined}
              width={180}
              height={180}
              loop
            />
          </motion.div>
        )}

        <motion.div initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }} transition={{ duration: 1, delay: 0.6 }} className="flex items-center justify-center gap-4 mb-4">
          <div className="h-px w-16 bg-white/50" />
          <span className="text-white/70 text-sm tracking-widest uppercase">Wedding</span>
          <div className="h-px w-16 bg-white/50" />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.8 }}>
          <h1 className="font-script text-6xl md:text-8xl lg:text-9xl leading-tight drop-shadow-2xl" style={{ color: "#fff" }}>{tenant.groomNickname}</h1>
          <div className="flex items-center justify-center gap-4 my-2">
            <div className="h-px w-12 bg-white/40" />
            <span className="font-display text-white/80 text-2xl md:text-3xl">&</span>
            <div className="h-px w-12 bg-white/40" />
          </div>
          <h1 className="font-script text-6xl md:text-8xl lg:text-9xl leading-tight drop-shadow-2xl" style={{ color: "#fff" }}>{tenant.brideNickname}</h1>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1.2 }} className="mt-8">
          <div className="inline-block px-8 py-3 rounded-full backdrop-blur-sm border" style={{ backgroundColor: "rgba(255,255,255,0.15)", borderColor: "rgba(255,255,255,0.3)" }}>
            <p className="font-display text-white text-lg md:text-xl font-light tracking-wide">{formatDate(tenant.receptionDate, "d MMMM yyyy")}</p>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        onClick={handleScrollDown}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.8 }}
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
          <ChevronDown className="h-8 w-8 text-white/70" />
        </motion.div>
      </motion.div>
    </section>
  );
}
