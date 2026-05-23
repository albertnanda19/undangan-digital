"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { LottieAnimation } from "@/components/invitation/LottieAnimation";
import type { Tenant, ThemeConfig } from "@/types";
import { getReligionContent } from "@/lib/religionContent";
import { isBrideFirst } from "@/config/tenant-display";

type Props = {
  tenant: Tenant;
  themeConfig: ThemeConfig;
};

const COUPLE_PORTRAIT_SIZES = "(max-width: 768px) 140px, 162px";

function PortraitCircle({
  themeConfig,
  children,
}: {
  themeConfig: ThemeConfig;
  children: ReactNode;
}) {
  return (
    <div
      className="relative size-[13rem] shrink-0 overflow-hidden rounded-full border-4 shadow-2xl md:size-[15rem]"
      style={{
        borderColor: themeConfig.primaryColor,
        isolation: "isolate",
        background: `radial-gradient(circle at 50% 55%, ${themeConfig.secondaryColor} 0%, ${themeConfig.backgroundColor} 72%)`,
      }}
    >
      <div className="relative size-full">
        {children}
      </div>
    </div>
  );
}

function CouplePhotoPlaceholder({
  name,
  themeConfig,
  isIslam,
}: {
  name: string;
  themeConfig: ThemeConfig;
  isIslam: boolean;
}) {
  const initial = (name || "?").trim().charAt(0).toUpperCase();
  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      style={{
        background: `radial-gradient(circle at 30% 30%, ${themeConfig.secondaryColor} 0%, ${themeConfig.backgroundColor} 70%)`,
      }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent 0 10px, ${themeConfig.accentColor}22 10px 12px, transparent 12px 22px)`,
        }}
      />
      <div
        className="relative z-10 w-24 h-24 md:w-28 md:h-28 rounded-full flex items-center justify-center border shadow-lg"
        style={{
          backgroundColor: `${themeConfig.primaryColor}18`,
          borderColor: `${themeConfig.primaryColor}66`,
          color: themeConfig.primaryColor,
        }}
      >
        <span className="font-display text-4xl md:text-5xl">{initial}</span>
      </div>

      {isIslam && (
        <svg
          aria-hidden="true"
          className="absolute right-5 top-5 h-10 w-10 opacity-40"
          viewBox="0 0 64 64"
          fill="none"
        >
          <path
            d="M38.5 12.5c-9.4 0-17 7.6-17 17s7.6 17 17 17c3.2 0 6.2-.9 8.8-2.4C43.7 48.6 38.7 52 33 52 22 52 13 43 13 32S22 12 33 12c5.7 0 10.7 3.4 14.3 7.9-2.6-1.5-5.6-2.4-8.8-2.4Z"
            fill={themeConfig.primaryColor}
          />
          <path
            d="M48.5 24.2l2.1 4.3 4.8.7-3.4 3.3.8 4.7-4.3-2.3-4.3 2.3.8-4.7-3.4-3.3 4.8-.7 2.1-4.3Z"
            fill={themeConfig.accentColor}
          />
        </svg>
      )}
    </div>
  );
}

export function CoupleSection({ tenant, themeConfig }: Props) {
  const useAutoLottie = tenant.lottieAutoSelect !== false;
  const useLottie = useAutoLottie || !!tenant.lottieAnimationUrl;
  const isMinangTheme = themeConfig.ornamentStyle === "minang";
  const isJawa = themeConfig.ornamentStyle === "jawa";
  const isIslam = tenant.religion === "islam";
  const content = getReligionContent(tenant.religion);
  const brideFirst = isBrideFirst(tenant.slug);
  const showLottieInSection =
    !tenant.lottieAnimationUrl ||
    tenant.lottieAnimationPosition === "couple_section" ||
    tenant.lottieAnimationPosition === "both";

  const groomCard = (
    <motion.div
      initial={{ opacity: 0, x: brideFirst ? 30 : -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="flex min-w-0 flex-col items-center text-center"
    >
      <div className="mb-6 flex w-full justify-center">
        <PortraitCircle themeConfig={themeConfig}>
          {tenant.groomPhotoUrl ? (
            <Image
              src={tenant.groomPhotoUrl}
              alt={tenant.groomName}
              fill
              sizes={COUPLE_PORTRAIT_SIZES}
              className="object-contain object-center"
            />
          ) : isMinangTheme ? (
            <Image
              src="/images/minang-groom-real.png"
              alt="Ilustrasi mempelai pria Minang"
              fill
              sizes={COUPLE_PORTRAIT_SIZES}
              className="object-contain object-center"
            />
          ) : isJawa ? (
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <svg viewBox="0 0 100 180" className="w-[85%] h-[85%]" fill="none" aria-hidden="true">
                <path d="M50 4C38 4 28 12 28 24c0 10 8 18 22 18s22-8 22-18c0-12-10-20-22-20Z" fill={themeConfig.primaryColor} opacity="0.85" />
                <path d="M50 42c-16 0-28 6-34 16s-8 26-4 40c4 14 8 26 12 32-2 8-4 18-4 28 0 16 4 30 12 40 8 10 18 14 30 14s22-4 30-14c8-10 12-24 12-40 0-10-2-20-4-28 4-6 8-18 12-32 4-14 2-28-4-40-6-10-18-16-34-16Z" fill={themeConfig.primaryColor} opacity="0.8" />
                <rect x="46" y="76" width="8" height="28" rx="4" fill={themeConfig.accentColor} opacity="0.5" />
                <circle cx="50" cy="140" r="4" fill={themeConfig.accentColor} opacity="0.4" />
                <path d="M34 72c4-6 8-14 12-20" stroke={themeConfig.accentColor} strokeWidth="1.5" opacity="0.3" />
                <path d="M66 72c-4-6-8-14-12-20" stroke={themeConfig.accentColor} strokeWidth="1.5" opacity="0.3" />
              </svg>
            </motion.div>
          ) : isIslam ? (
            <Image
              src="/images/muslim-groom-real.png"
              alt="Ilustrasi mempelai pria"
              fill
              sizes={COUPLE_PORTRAIT_SIZES}
              className="object-contain object-center"
            />
          ) : (
            <CouplePhotoPlaceholder
              name={tenant.groomNickname || tenant.groomName}
              themeConfig={themeConfig}
              isIslam={isIslam}
            />
          )}
        </PortraitCircle>
      </div>
      <h3 className="font-script text-4xl md:text-5xl mb-2" style={{ color: themeConfig.primaryColor }}>{tenant.groomNickname}</h3>
      <p className="font-display text-xl font-semibold mb-3" style={{ color: themeConfig.textColor }}>{tenant.groomName}</p>
      <div className="text-sm mt-1 leading-relaxed" style={{ color: themeConfig.textColor, opacity: 0.78 }}>
        <p>
          {(tenant.groomBirthOrder ? `${tenant.groomBirthOrder} dari ` : "Putra dari ")}
          Bapak {tenant.groomFather} dan Ibu {tenant.groomMother}
        </p>
      </div>
    </motion.div>
  );

  const brideCard = (
    <motion.div
      initial={{ opacity: 0, x: brideFirst ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="flex min-w-0 flex-col items-center text-center"
    >
      <div className="mb-6 flex w-full justify-center">
        <PortraitCircle themeConfig={themeConfig}>
          {tenant.bridePhotoUrl ? (
            <Image
              src={tenant.bridePhotoUrl}
              alt={tenant.brideName}
              fill
              sizes={COUPLE_PORTRAIT_SIZES}
              className="object-contain object-center"
            />
          ) : isMinangTheme ? (
            <Image
              src="/images/minang-bride-real.png"
              alt="Ilustrasi mempelai wanita Minang"
              fill
              sizes={COUPLE_PORTRAIT_SIZES}
              className="object-contain object-center"
            />
          ) : isJawa ? (
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
            >
              <svg viewBox="0 0 100 180" className="w-[85%] h-[85%]" fill="none" aria-hidden="true">
                <path d="M50 4c-8 0-12 6-12 12s4 12 12 12 12-6 12-12-4-12-12-12Z" fill={themeConfig.primaryColor} opacity="0.85" />
                <path d="M50 28c-16 0-28 6-34 16s-8 26-4 40c4 14 8 26 12 32-2 8-4 18-4 28 0 16 4 30 12 40 8 10 18 14 30 14s22-4 30-14c8-10 12-24 12-40 0-10-2-20-4-28 4-6 8-18 12-32 4-14 2-28-4-40-6-10-18-16-34-16Z" fill={themeConfig.primaryColor} opacity="0.8" />
                <rect x="46" y="76" width="8" height="28" rx="4" fill={themeConfig.accentColor} opacity="0.5" />
                <circle cx="50" cy="140" r="4" fill={themeConfig.accentColor} opacity="0.4" />
                <path d="M34 72c4-6 8-14 12-20" stroke={themeConfig.accentColor} strokeWidth="1.5" opacity="0.3" />
                <path d="M66 72c-4-6-8-14-12-20" stroke={themeConfig.accentColor} strokeWidth="1.5" opacity="0.3" />
                <path d="M38 14c4-2 8-2 12 0" stroke={themeConfig.accentColor} strokeWidth="1" opacity="0.4" />
                <circle cx="50" cy="10" r="2" fill={themeConfig.accentColor} opacity="0.4" />
              </svg>
            </motion.div>
          ) : isIslam ? (
            <Image
              src="/images/muslim-bride-real.png"
              alt="Ilustrasi mempelai wanita"
              fill
              sizes={COUPLE_PORTRAIT_SIZES}
              className="object-contain object-center"
            />
          ) : (
            <CouplePhotoPlaceholder
              name={tenant.brideNickname || tenant.brideName}
              themeConfig={themeConfig}
              isIslam={isIslam}
            />
          )}
        </PortraitCircle>
      </div>
      <h3 className="font-script text-4xl md:text-5xl mb-2" style={{ color: themeConfig.primaryColor }}>{tenant.brideNickname}</h3>
      <p className="font-display text-xl font-semibold mb-3" style={{ color: themeConfig.textColor }}>{tenant.brideName}</p>
      <div className="text-sm mt-1 leading-relaxed" style={{ color: themeConfig.textColor, opacity: 0.78 }}>
        <p>
          {(tenant.brideBirthOrder ? `${tenant.brideBirthOrder} dari ` : "Putri dari ")}
          Bapak {tenant.brideFather} dan Ibu {tenant.brideMother}
        </p>
      </div>
    </motion.div>
  );

  return (
    <section id="couple" className="invitation-section relative overflow-hidden" style={{ backgroundColor: themeConfig.backgroundColor }}>
      <div className="absolute top-0 left-0 w-64 h-64 rounded-full blur-3xl opacity-10 pointer-events-none" style={{ backgroundColor: themeConfig.primaryColor, transform: "translate(-50%, -50%)" }} />
      <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-10 pointer-events-none" style={{ backgroundColor: themeConfig.accentColor, transform: "translate(50%, 50%)" }} />
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-16 scroll-mt-6">
          <p className="font-script text-2xl mb-2" style={{ color: themeConfig.primaryColor }}>
            {isJawa ? "Pandhan Arum" : isIslam ? content.openingGreeting : "In The Name of Love"}
          </p>
          <h2 className="section-title font-display" style={{ color: themeConfig.textColor }}>
            {isJawa ? "Kekalih Panganten" : "Mempelai"}
          </h2>
        </motion.div>
        <div className="grid min-w-0 grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 items-center">
          {brideFirst ? brideCard : groomCard}

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex flex-col items-center justify-center py-8 md:py-0"
          >
            {useLottie && showLottieInSection ? (
              <LottieAnimation
                manualUrl={!useAutoLottie ? tenant.lottieAnimationUrl : undefined}
                themeId={useAutoLottie ? tenant.themeId : undefined}
                tenantSlug={useAutoLottie ? tenant.slug : undefined}
                width={220}
                height={220}
                loop
                fallback={<span className="font-script text-6xl" style={{ color: themeConfig.primaryColor }}>&amp;</span>}
              />
            ) : (
              <span className="font-script text-6xl" style={{ color: themeConfig.primaryColor }}>&amp;</span>
            )}
          </motion.div>

          {brideFirst ? groomCard : brideCard}
        </div>
      </div>
    </section>
  );
}
