"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { LottieAnimation } from "@/components/invitation/LottieAnimation";
import { HeroCoupleAnimation } from "@/components/invitation/HeroCoupleAnimation";
import { MarawaFlags, RumahGadangRoof } from "@/components/invitation/MinangOrnaments";
import type { Tenant, ThemeConfig } from "@/types";

type Props = { tenant: Tenant; themeConfig: ThemeConfig; guestName?: string };

export function HeroSection({ tenant, themeConfig, guestName }: Props) {
  const isMinang = themeConfig.ornamentStyle === "minang";

  const showLottieInHero =
    !isMinang &&
    (tenant.lottieAutoSelect !== false ||
      tenant.lottieAnimationPosition === "hero" ||
      tenant.lottieAnimationPosition === "both");

  const handleScrollDown = () => {
    document.getElementById("opening")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-10 pb-28 md:pt-14 md:pb-36">
      {tenant.coverPhotoUrl ? (
        <>
          <Image src={tenant.coverPhotoUrl} alt="Cover" fill priority className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/70" />
          <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, transparent 40%, ${themeConfig.primaryColor}40 100%)` }} />
        </>
      ) : isMinang ? (
        <>
          {/* Layered Minang heritage backdrop */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(160deg, ${themeConfig.primaryColor} 0%, #6E1F1A 45%, ${themeConfig.primaryColor} 100%)`,
            }}
          />
          {/* Subtle warm overlay */}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              background: `radial-gradient(ellipse at 50% 30%, ${themeConfig.accentColor}55 0%, transparent 55%)`,
            }}
          />
          {/* Soft texture grid (heritage feel) */}
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.07] mix-blend-overlay"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, #fff 0 2px, transparent 2px 14px), repeating-linear-gradient(-45deg, #fff 0 2px, transparent 2px 14px)",
            }}
          />
        </>
      ) : (
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${themeConfig.backgroundColor} 0%, ${themeConfig.secondaryColor} 50%, ${themeConfig.backgroundColor} 100%)` }} />
      )}

      {/* Minang ornaments — only on minang theme */}
      {isMinang && (
        <>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="absolute top-0 left-2 md:left-6 z-10 w-16 md:w-24 origin-top"
            style={{ color: "#FFFFFF" }}
          >
            <MarawaFlags side="left" accent={themeConfig.accentColor} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="absolute top-0 right-2 md:right-6 z-10 w-16 md:w-24 origin-top"
            style={{ color: "#FFFFFF" }}
          >
            <MarawaFlags side="right" accent={themeConfig.accentColor} />
          </motion.div>
        </>
      )}

      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        {guestName && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3 }} className="mb-6">
            <div className="inline-block px-6 py-2 rounded-full text-sm backdrop-blur-sm border" style={{ backgroundColor: "rgba(255,255,255,0.15)", borderColor: "rgba(255,255,255,0.3)", color: "#fff" }}>
              Kepada Yth. <strong>{guestName}</strong>
            </div>
          </motion.div>
        )}

        {isMinang && (
          <HeroCoupleAnimation tenant={tenant} themeConfig={themeConfig} />
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
          <span className="text-white/70 text-sm tracking-widest uppercase">{isMinang ? "Baralek Gadang" : "Wedding"}</span>
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className={isMinang ? "mt-8 mb-14 md:mb-20" : "mt-8"}
        >
          <div
            className="inline-block px-8 py-3 rounded-full backdrop-blur-sm border"
            style={{
              backgroundColor: "rgba(255,255,255,0.15)",
              borderColor: isMinang ? `${themeConfig.accentColor}99` : "rgba(255,255,255,0.3)",
            }}
          >
            <p className="font-display text-white text-lg md:text-xl font-light tracking-wide">{formatDate(tenant.receptionDate, "d MMMM yyyy")}</p>
          </div>
        </motion.div>
      </div>

      {/* Rumah Gadang silhouette at the bottom of the hero */}
      {isMinang && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.6 }}
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-0 right-0 z-0 h-24 md:h-32"
          style={{ color: "#3B1F0E" }}
        >
          <RumahGadangRoof
            color="#3B1F0E"
            accent={themeConfig.accentColor}
            className="h-full w-full"
          />
        </motion.div>
      )}

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
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
