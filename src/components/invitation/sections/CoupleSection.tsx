"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { LottieAnimation } from "@/components/invitation/LottieAnimation";
import type { Tenant, ThemeConfig } from "@/types";

type Props = {
  tenant: Tenant;
  themeConfig: ThemeConfig;
};

function CouplePhotoPlaceholder({
  name,
  themeConfig,
}: {
  name: string;
  themeConfig: ThemeConfig;
}) {
  const initial = (name || "?").trim().charAt(0).toUpperCase();
  return (
    <div
      className="relative w-full h-full flex items-center justify-center"
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
    </div>
  );
}

export function CoupleSection({ tenant, themeConfig }: Props) {
  const useAutoLottie = tenant.lottieAutoSelect !== false;
  const useLottie = useAutoLottie || !!tenant.lottieAnimationUrl;
  const isMinangTheme = themeConfig.ornamentStyle === "minang";
  const showLottieInSection =
    !tenant.lottieAnimationUrl ||
    tenant.lottieAnimationPosition === "couple_section" ||
    tenant.lottieAnimationPosition === "both";

  return (
    <section id="couple" className="invitation-section relative overflow-hidden" style={{ backgroundColor: themeConfig.backgroundColor }}>
      <div className="absolute top-0 left-0 w-64 h-64 rounded-full blur-3xl opacity-10 pointer-events-none" style={{ backgroundColor: themeConfig.primaryColor, transform: "translate(-50%, -50%)" }} />
      <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-10 pointer-events-none" style={{ backgroundColor: themeConfig.accentColor, transform: "translate(50%, 50%)" }} />
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-16">
          <p className="font-script text-2xl mb-2" style={{ color: themeConfig.primaryColor }}>In The Name of Love</p>
          <h2 className="section-title font-display" style={{ color: themeConfig.textColor }}>Mempelai</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center text-center"
          >
            <div className="relative mb-6">
              <div className="w-52 h-52 md:w-60 md:h-60 rounded-full overflow-hidden border-4 shadow-2xl" style={{ borderColor: themeConfig.primaryColor }}>
                {tenant.groomPhotoUrl ? (
                  <Image src={tenant.groomPhotoUrl} alt={tenant.groomName} fill className="object-cover" />
                ) : isMinangTheme ? (
                  <Image src="/images/minang-groom-real.png" alt="Ilustrasi mempelai pria Minang" fill className="object-cover" />
                ) : (
                  <CouplePhotoPlaceholder
                    name={tenant.groomNickname || tenant.groomName}
                    themeConfig={themeConfig}
                  />
                )}
              </div>
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

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center text-center"
          >
            <div className="relative mb-6">
              <div className="w-52 h-52 md:w-60 md:h-60 rounded-full overflow-hidden border-4 shadow-2xl" style={{ borderColor: themeConfig.primaryColor }}>
                {tenant.bridePhotoUrl ? (
                  <Image src={tenant.bridePhotoUrl} alt={tenant.brideName} fill className="object-cover" />
                ) : isMinangTheme ? (
                  <Image src="/images/minang-bride-real.png" alt="Ilustrasi mempelai wanita Minang" fill className="object-cover" />
                ) : (
                  <CouplePhotoPlaceholder
                    name={tenant.brideNickname || tenant.brideName}
                    themeConfig={themeConfig}
                  />
                )}
              </div>
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
        </div>
      </div>
    </section>
  );
}
