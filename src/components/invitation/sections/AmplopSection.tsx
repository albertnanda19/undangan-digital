"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Copy, Check, Package, QrCode } from "lucide-react";
import type { Tenant, ThemeConfig } from "@/types";
import { copyToClipboard } from "@/lib/utils";

type Props = { tenant: Tenant; themeConfig: ThemeConfig };

export function AmplopSection({ tenant, themeConfig }: Props) {
  const showAmplop = tenant.showAmplopDigital && tenant.bankAccounts?.length > 0;
  const showQris = tenant.showQris && tenant.qrisImageUrl;
  const showGift = tenant.showGiftAddress && tenant.giftAddress;
  const isJawa = themeConfig.ornamentStyle === "jawa";
  if (!showAmplop && !showQris && !showGift) return null;

  return (
    <section id="amplop" className="invitation-section relative overflow-hidden" style={{ backgroundColor: themeConfig.secondaryColor }}>
      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-12">
          <p className="font-script text-2xl mb-2" style={{ color: themeConfig.primaryColor }}>
            {isJawa ? "Sakderengipun" : "dengan segala kerendahan hati"}
          </p>
          <h2 className="section-title font-display" style={{ color: themeConfig.textColor }}>
            {isJawa ? "Seserahan" : "Hadiah & Doa"}
          </h2>
        </motion.div>

        {showAmplop && (
          <div className="mb-8 space-y-4">
            {tenant.bankAccounts.filter((b) => b.isActive).map((account, index) => (
              <BankCard key={account.id} account={account} themeConfig={themeConfig} delay={index * 0.1} />
            ))}
          </div>
        )}

        {showQris && (
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="mb-8">
            <div className="rounded-3xl p-8 text-center shadow-lg" style={{ backgroundColor: themeConfig.backgroundColor }}>
              <div className="flex items-center justify-center gap-2 mb-4">
                <QrCode size={20} style={{ color: themeConfig.primaryColor }} />
                <p className="text-sm font-semibold" style={{ color: themeConfig.primaryColor }}>Scan QRIS</p>
              </div>
              <div className="relative w-48 h-48 mx-auto rounded-2xl overflow-hidden border-4" style={{ borderColor: themeConfig.primaryColor }}>
                <Image src={tenant.qrisImageUrl!} alt="QRIS Code" fill className="object-contain p-2" />
              </div>
            </div>
          </motion.div>
        )}

        {showGift && (
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}>
            <div className="rounded-3xl p-8 shadow-lg" style={{ backgroundColor: themeConfig.backgroundColor }}>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${themeConfig.primaryColor}20` }}>
                  <Package size={20} style={{ color: themeConfig.primaryColor }} />
                </div>
                <div className="flex-1">
                  <p className="text-sm uppercase tracking-wider font-semibold mb-2" style={{ color: themeConfig.primaryColor }}>Alamat Pengiriman</p>
                  <p className="font-display text-base leading-relaxed mb-3" style={{ color: themeConfig.textColor }}>{tenant.giftAddress}</p>
                  {tenant.giftNotes && <p className="text-sm italic" style={{ color: themeConfig.textColor, opacity: 0.7 }}>Catatan: {tenant.giftNotes}</p>}
                  <button
                    onClick={() => copyToClipboard(tenant.giftAddress!)}
                    className="mt-4 flex items-center gap-2 text-sm px-4 py-2 rounded-lg"
                    style={{ backgroundColor: `${themeConfig.primaryColor}15`, color: themeConfig.primaryColor }}
                  >
                    <Copy size={14} />
                    Salin Alamat
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

function BankCard({
  account,
  themeConfig,
  delay,
}: {
  account: { bankName: string; accountNumber: string; accountHolder: string; qrCodeUrl?: string };
  themeConfig: ThemeConfig;
  delay: number;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await copyToClipboard(account.accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="rounded-2xl p-6 shadow-md flex items-center justify-between gap-4"
      style={{ backgroundColor: themeConfig.backgroundColor }}
    >
      <div className="flex items-center gap-4 min-w-0 flex-1">
        <div className="w-14 h-14 shrink-0 rounded-xl flex items-center justify-center text-xs font-bold" style={{ backgroundColor: `${themeConfig.primaryColor}20`, color: themeConfig.primaryColor }}>
          {account.bankName.substring(0, 3).toUpperCase()}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm" style={{ color: themeConfig.textColor, opacity: 0.6 }}>{account.bankName}</p>
          <p className="font-mono font-bold text-base tracking-wide my-0.5 break-all" style={{ color: themeConfig.textColor }}>{account.accountNumber}</p>
          <p className="text-sm" style={{ color: themeConfig.textColor, opacity: 0.7 }}>a.n. {account.accountHolder}</p>
        </div>
      </div>
      <button onClick={handleCopy} className="flex-shrink-0 flex flex-col items-center gap-1 px-4 py-3 rounded-xl" style={{ backgroundColor: `${themeConfig.primaryColor}15`, color: themeConfig.primaryColor }}>
        {copied ? <Check size={18} /> : <Copy size={18} />}
        <span className="text-xs font-semibold">{copied ? "Tersalin!" : "Salin"}</span>
      </button>
    </motion.div>
  );
}
