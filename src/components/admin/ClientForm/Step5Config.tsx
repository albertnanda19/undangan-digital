"use client";

import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Trash2, Plus } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BANK_LIST } from "@/lib/constants/banks";
import type { ClientFormData, BankAccount } from "@/types";

interface Step5Props {
  data: Partial<ClientFormData>;
  onChange: (data: Partial<ClientFormData>) => void;
}

export function Step5Config({ data, onChange }: Step5Props) {
  const bankAccounts = data.bankAccounts || [];

  const addBankAccount = () => {
    const newAccount: BankAccount = {
      id: crypto.randomUUID(),
      bankName: "",
      accountNumber: "",
      accountHolder: "",
      isActive: true,
    };
    onChange({ bankAccounts: [...bankAccounts, newAccount] });
  };

  const removeBankAccount = (id: string) => {
    onChange({ bankAccounts: bankAccounts.filter((a) => a.id !== id) });
  };

  const updateBankAccount = (id: string, field: keyof BankAccount, value: string | boolean) => {
    onChange({
      bankAccounts: bankAccounts.map((a) => (a.id === id ? { ...a, [field]: value } : a)),
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-[#E2E8F0]">Konfigurasi</h2>
        <p className="text-sm text-[#94A3B8] mt-1">Pengaturan lanjutan undangan</p>
      </div>

      {/* Amplop Digital */}
      <div className="space-y-4 rounded-lg border border-[#2A2D3E] p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-[#E2E8F0]">Amplop Digital</p>
            <p className="text-xs text-[#94A3B8]">Tamu dapat mengirim amplop digital</p>
          </div>
          <Switch
            checked={data.showAmplopDigital || false}
            onCheckedChange={(checked) => onChange({ showAmplopDigital: checked })}
          />
        </div>

        {data.showAmplopDigital && (
          <div className="space-y-3 pt-2 border-t border-[#2A2D3E]">
            {bankAccounts.map((account) => (
              <div key={account.id} className="grid grid-cols-1 sm:grid-cols-4 gap-2 items-end">
                <Select
                  value={account.bankName}
                  onValueChange={(value) => updateBankAccount(account.id, "bankName", value)}
                >
                  <SelectTrigger><SelectValue placeholder="Bank" /></SelectTrigger>
                  <SelectContent>
                    {BANK_LIST.map((bank) => (
                      <SelectItem key={bank.id} value={bank.name}>{bank.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  placeholder="No. Rekening"
                  value={account.accountNumber}
                  onChange={(e) => updateBankAccount(account.id, "accountNumber", e.target.value)}
                />
                <Input
                  placeholder="Atas Nama"
                  value={account.accountHolder}
                  onChange={(e) => updateBankAccount(account.id, "accountHolder", e.target.value)}
                />
                <Button variant="destructive" size="icon" onClick={() => removeBankAccount(account.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={addBankAccount}>
              <Plus className="h-4 w-4 mr-1" /> Tambah Rekening
            </Button>
          </div>
        )}
      </div>

      {/* Password Protection */}
      <div className="space-y-4 rounded-lg border border-[#2A2D3E] p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-[#E2E8F0]">Password Proteksi</p>
            <p className="text-xs text-[#94A3B8]">Halaman undangan dilindungi password</p>
          </div>
          <Switch
            checked={data.isPasswordProtected || false}
            onCheckedChange={(checked) => onChange({ isPasswordProtected: checked })}
          />
        </div>
        {data.isPasswordProtected && (
          <Input
            label="Password"
            type="text"
            placeholder="Masukkan password..."
            value={data.password || ""}
            onChange={(e) => onChange({ password: e.target.value })}
          />
        )}
      </div>

      {/* Expiry Date */}
      <Input
        label="Tanggal Kadaluarsa Undangan"
        type="date"
        value={data.expiresAt || ""}
        onChange={(e) => onChange({ expiresAt: e.target.value })}
        hint="Opsional. Undangan akan nonaktif otomatis setelah tanggal ini."
      />

      {/* Lottie */}
      <div className="space-y-4 rounded-lg border border-[#2A2D3E] p-4">
        <h3 className="text-sm font-medium text-[#E2E8F0]">Animasi Lottie (Add-on)</h3>
        <Input
          label="URL Lottie JSON"
          placeholder="https://assets.lottiefiles.com/..."
          value={data.lottieAnimationUrl || ""}
          onChange={(e) => onChange({ lottieAnimationUrl: e.target.value })}
          hint="Dari LottieFiles.com"
        />
        {data.lottieAnimationUrl && (
          <Select
            value={data.lottieAnimationPosition || "hero"}
            onValueChange={(value) => onChange({ lottieAnimationPosition: value as "hero" | "couple_section" | "both" })}
          >
            <SelectTrigger><SelectValue placeholder="Posisi animasi" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="hero">Hero Section</SelectItem>
              <SelectItem value="couple_section">Section Pasangan</SelectItem>
              <SelectItem value="both">Keduanya</SelectItem>
            </SelectContent>
          </Select>
        )}
      </div>
    </div>
  );
}
