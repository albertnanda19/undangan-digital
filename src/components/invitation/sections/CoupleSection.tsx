"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { LottieAnimation } from "../LottieAnimation";

interface Props {
  groomName: string;
  brideName: string;
  groomNickname: string;
  brideNickname: string;
  groomFather: string;
  groomMother: string;
  brideFather: string;
  brideMother: string;
  groomPhotoUrl?: string;
  bridePhotoUrl?: string;
  themeConfig: Record<string, string>;
  lottieUrl?: string;
}

export function CoupleSection({
  groomName, brideName, groomFather, groomMother, brideFather, brideMother,
  groomPhotoUrl, bridePhotoUrl, themeConfig, lottieUrl,
}: Props) {
  return (
    <section id="couple" className="invitation-section" style={{ backgroundColor: themeConfig.secondaryColor }}>
      <motion.div
        className="max-w-4xl mx-auto text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="section-title" style={{ color: themeConfig.textColor }}>Mempelai</h2>
        <p className="section-subtitle" style={{ color: themeConfig.primaryColor }}>Insya Allah</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Groom */}
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="w-40 h-40 rounded-full overflow-hidden border-4 mb-4" style={{ borderColor: themeConfig.primaryColor }}>
              {groomPhotoUrl ? (
                <Image src={groomPhotoUrl} alt={groomName} width={160} height={160} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: themeConfig.primaryColor + "20" }}>
                  <span className="font-script text-3xl" style={{ color: themeConfig.primaryColor }}>M</span>
                </div>
              )}
            </div>
            <h3 className="font-display text-2xl font-semibold" style={{ color: themeConfig.textColor }}>{groomName}</h3>
            <p className="text-sm mt-2 opacity-70" style={{ color: themeConfig.textColor }}>
              Putra dari {groomFather} & {groomMother}
            </p>
          </motion.div>

          {/* Divider / Lottie */}
          <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center">
            {lottieUrl ? (
              <LottieAnimation url={lottieUrl} width={100} height={100} />
            ) : (
              <span className="font-script text-5xl" style={{ color: themeConfig.primaryColor }}>&amp;</span>
            )}
          </div>
          <div className="md:hidden flex justify-center my-4">
            {lottieUrl ? (
              <LottieAnimation url={lottieUrl} width={80} height={80} />
            ) : (
              <span className="font-script text-4xl" style={{ color: themeConfig.primaryColor }}>&amp;</span>
            )}
          </div>

          {/* Bride */}
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="w-40 h-40 rounded-full overflow-hidden border-4 mb-4" style={{ borderColor: themeConfig.primaryColor }}>
              {bridePhotoUrl ? (
                <Image src={bridePhotoUrl} alt={brideName} width={160} height={160} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: themeConfig.primaryColor + "20" }}>
                  <span className="font-script text-3xl" style={{ color: themeConfig.primaryColor }}>W</span>
                </div>
              )}
            </div>
            <h3 className="font-display text-2xl font-semibold" style={{ color: themeConfig.textColor }}>{brideName}</h3>
            <p className="text-sm mt-2 opacity-70" style={{ color: themeConfig.textColor }}>
              Putri dari {brideFather} & {brideMother}
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
