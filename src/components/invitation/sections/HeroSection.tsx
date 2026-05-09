"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { LottieAnimation } from "@/components/invitation/LottieAnimation";
import { HeroCoupleAnimation } from "@/components/invitation/HeroCoupleAnimation";
import { MarawaFlags, RumahGadangRoof } from "@/components/invitation/MinangOrnaments";
import type { Tenant, ThemeConfig } from "@/types";
import { isBrideFirst } from "@/config/tenant-display";

type Props = { tenant: Tenant; themeConfig: ThemeConfig; guestName?: string };

export function HeroSection({ tenant, themeConfig, guestName }: Props) {
  const isMinang = themeConfig.ornamentStyle === "minang";
  const isIslam = tenant.religion === "islam";
  const brideFirst = isBrideFirst(tenant.slug);
  const firstName = brideFirst ? tenant.brideNickname : tenant.groomNickname;
  const secondName = brideFirst ? tenant.groomNickname : tenant.brideNickname;
  const showIslamicDecor = !tenant.coverPhotoUrl && !isMinang && isIslam;

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

      {/* Islamic hero decorations (non-minang, no cover image) */}
      {showIslamicDecor && (
        <>
          {/* Contrast overlay so text stays readable */}
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 50% 30%, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.45) 60%, rgba(0,0,0,0.62) 100%)",
            }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.08] mix-blend-multiply"
            style={{
              backgroundImage:
                `radial-gradient(circle at 1px 1px, ${themeConfig.primaryColor} 1px, transparent 0)`,
              backgroundSize: "26px 26px",
            }}
          />
          <motion.div
            aria-hidden="true"
            className="absolute -top-24 left-1/2 h-[22rem] w-[22rem] -translate-x-1/2 rounded-full blur-3xl opacity-30"
            style={{ backgroundColor: themeConfig.accentColor }}
            animate={{ scale: [1, 1.05, 1], opacity: [0.22, 0.34, 0.22] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden="true"
            className="absolute -bottom-28 left-[-6rem] h-[22rem] w-[22rem] rounded-full blur-3xl opacity-25"
            style={{ backgroundColor: themeConfig.primaryColor }}
            animate={{ x: [0, 18, 0], y: [0, -10, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden="true"
            className="absolute -bottom-28 right-[-6rem] h-[22rem] w-[22rem] rounded-full blur-3xl opacity-20"
            style={{ backgroundColor: themeConfig.secondaryColor }}
            animate={{ x: [0, -18, 0], y: [0, -10, 0] }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Crescent + star (top) */}
          <motion.div
            aria-hidden="true"
            className="absolute top-10 left-1/2 z-0 -translate-x-1/2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2 }}
          >
            <svg width="160" height="70" viewBox="0 0 160 70" fill="none">
              <path
                d="M86 10c-14.4 0-26 11.6-26 26s11.6 26 26 26c5.5 0 10.6-1.7 14.8-4.7C95.7 61.2 88.7 65 81 65 61.7 65 46 49.3 46 30S61.7-5 81-5c7.7 0 14.7 3.8 19.8 9.7C96.6 11.7 91.5 10 86 10Z"
                fill={`${themeConfig.primaryColor}66`}
              />
              <path
                d="M118 22.5l3.2 6.6 7.3 1.1-5.3 5.1 1.2 7.2-6.4-3.4-6.4 3.4 1.2-7.2-5.3-5.1 7.3-1.1 3.2-6.6Z"
                fill={`${themeConfig.accentColor}88`}
              />
            </svg>
          </motion.div>

          {/* Mosque silhouette (bottom) */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 left-0 right-0 z-0 h-28 md:h-36 opacity-30"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 0.32, y: 0 }}
            transition={{ duration: 1.4, delay: 0.25 }}
          >
            <svg viewBox="0 0 1200 220" className="h-full w-full" preserveAspectRatio="none">
              <path
                d="M0 220V158h70v-26c0-16 10-30 24-35v-8h22v8c14 5 24 19 24 35v26h50v-36c0-34 22-63 52-73v-12h34v12c30 10 52 39 52 73v36h64v-22c0-24 16-45 38-52V70h24v14c22 7 38 28 38 52v22h78v-44c0-50 34-93 80-107V0h40v7c46 14 80 57 80 107v44h78v-22c0-24 16-45 38-52V70h24v14c22 7 38 28 38 52v22h64v-36c0-34 22-63 52-73v-12h34v12c30 10 52 39 52 73v36h50v-26c0-16 10-30 24-35v-8h22v8c14 5 24 19 24 35v26h70v62H0Z"
                fill={themeConfig.primaryColor}
              />
              <path
                d="M0 220V190h1200v30H0Z"
                fill={themeConfig.accentColor}
                opacity="0.35"
              />
            </svg>
          </motion.div>

          {/* Subtle arabesque corners */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.28]">
            <div className="absolute left-6 top-10 h-16 w-16 md:left-10 md:top-12 md:h-20 md:w-20">
              <svg viewBox="0 0 80 80" fill="none" className="h-full w-full">
                <path d="M8 64c18-2 28-12 30-30 2 18 12 28 30 30-18 2-28 12-30 30-2-18-12-28-30-30Z" fill={`${themeConfig.accentColor}55`} />
                <path d="M6 44c10-1 16-7 17-17 1 10 7 16 17 17-10 1-16 7-17 17-1-10-7-16-17-17Z" fill={`${themeConfig.primaryColor}4D`} />
              </svg>
            </div>
            <div className="absolute right-6 top-10 h-16 w-16 md:right-10 md:top-12 md:h-20 md:w-20 rotate-90">
              <svg viewBox="0 0 80 80" fill="none" className="h-full w-full">
                <path d="M8 64c18-2 28-12 30-30 2 18 12 28 30 30-18 2-28 12-30 30-2-18-12-28-30-30Z" fill={`${themeConfig.accentColor}55`} />
                <path d="M6 44c10-1 16-7 17-17 1 10 7 16 17 17-10 1-16 7-17 17-1-10-7-16-17-17Z" fill={`${themeConfig.primaryColor}4D`} />
              </svg>
            </div>
          </div>
        </>
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
        {/* Glass panel behind text (Islamic, no cover) */}
        {showIslamicDecor && (
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-14 -z-10 w-[min(34rem,92vw)] -translate-x-1/2 rounded-[2.25rem] border backdrop-blur-md"
            style={{
              background: "linear-gradient(180deg, rgba(255,255,255,0.10) 0%, rgba(0,0,0,0.18) 55%, rgba(0,0,0,0.28) 100%)",
              borderColor: `${themeConfig.accentColor}55`,
              boxShadow: "0 30px 80px rgba(0,0,0,0.35)",
            }}
          />
        )}
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
          <div className="h-px w-16 bg-white/60" />
          <span className="text-white/70 text-sm tracking-widest uppercase">
            {isMinang ? "Baralek Gadang" : isIslam ? "Undangan Pernikahan" : "Wedding"}
          </span>
          <div className="h-px w-16 bg-white/60" />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.8 }}>
          <h1
            className="font-script text-6xl md:text-8xl lg:text-9xl leading-tight drop-shadow-2xl"
            style={{ color: "#fff", textShadow: "0 10px 28px rgba(0,0,0,0.55)" }}
          >
            {firstName}
          </h1>
          <div className="flex items-center justify-center gap-4 my-2">
            <div className="h-px w-12 bg-white/55" />
            <span className="font-display text-white/90 text-2xl md:text-3xl" style={{ textShadow: "0 8px 18px rgba(0,0,0,0.45)" }}>&</span>
            <div className="h-px w-12 bg-white/55" />
          </div>
          <h1
            className="font-script text-6xl md:text-8xl lg:text-9xl leading-tight drop-shadow-2xl"
            style={{ color: "#fff", textShadow: "0 10px 28px rgba(0,0,0,0.55)" }}
          >
            {secondName}
          </h1>
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
