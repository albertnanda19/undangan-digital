"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check } from "lucide-react";

interface BankAccount {
  id: string;
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  isActive: boolean;
}

interface Props {
  tenantId: string;
  bankAccounts: BankAccount[];
  themeConfig: Record<string, string>;
}

export function AmplopSection({ bankAccounts, themeConfig }: Props) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (accountNumber: string, id: string) => {
    await navigator.clipboard.writeText(accountNumber);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const activeAccounts = bankAccounts.filter((a) => a.isActive);

  if (activeAccounts.length === 0) return null;

  return (
    <section id="amplop" className="invitation-section" style={{ backgroundColor: themeConfig.secondaryColor }}>
      <motion.div
        className="max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h2 className="section-title" style={{ color: themeConfig.textColor }}>Amplop Digital</h2>
        <p className="section-subtitle" style={{ color: themeConfig.primaryColor }}>Gift</p>

        <p className="text-center text-sm opacity-70 mb-8 max-w-md mx-auto" style={{ color: themeConfig.textColor }}>
          Bagi yang ingin memberikan hadiah atau doa melalui amplop digital, kami sangat berterima kasih atas kebaikan hati Anda.
        </p>

        <div className="space-y-4">
          {activeAccounts.map((account) => (
            <motion.div
              key={account.id}
              className="rounded-xl border p-5"
              style={{ borderColor: themeConfig.primaryColor + "20", backgroundColor: themeConfig.backgroundColor }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-sm font-medium mb-1" style={{ color: themeConfig.primaryColor }}>
                {account.bankName}
              </p>
              <p className="font-mono text-lg font-bold tracking-wide" style={{ color: themeConfig.textColor }}>
                {account.accountNumber}
              </p>
              <p className="text-sm opacity-70 mt-1" style={{ color: themeConfig.textColor }}>
                a.n. {account.accountHolder}
              </p>
              <button
                onClick={() => handleCopy(account.accountNumber, account.id)}
                className="mt-3 inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-medium border transition-all"
                style={{ borderColor: themeConfig.primaryColor, color: themeConfig.primaryColor }}
              >
                {copiedId === account.id ? (
                  <><Check className="h-3 w-3" /> Tersalin!</>
                ) : (
                  <><Copy className="h-3 w-3" /> Salin Nomor</>
                )}
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
