"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Step1Identity } from "./Step1Identity";
import { Step2Event } from "./Step2Event";
import { Step3Content } from "./Step3Content";
import { Step4Theme } from "./Step4Theme";
import { Step5Config } from "./Step5Config";
import type { ClientFormData } from "@/types";

const steps = [
  { number: 1, title: "Identitas" },
  { number: 2, title: "Acara" },
  { number: 3, title: "Konten" },
  { number: 4, title: "Tema" },
  { number: 5, title: "Konfigurasi" },
];

interface ClientFormProps {
  initialData?: Partial<ClientFormData>;
  editId?: string;
}

export function ClientForm({ initialData, editId }: ClientFormProps) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<ClientFormData>>(
    initialData || {
      showAmplopDigital: false,
      showGiftAddress: false,
      showQris: false,
      lottieAutoSelect: true,
      religion: "islam",
      timeZone: "WIB",
      bankAccounts: [],
      isPasswordProtected: false,
    }
  );

  const updateFormData = (data: Partial<ClientFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const handleNext = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (editId) {
        await axios.patch(`/api/admin/clients/${editId}`, formData);
        toast.success("Klien berhasil diperbarui!");
        router.push(`/admin/clients/${editId}`);
      } else {
        const res = await axios.post("/api/admin/clients", formData);
        toast.success("Klien berhasil ditambahkan!");
        router.push(`/admin/clients/${res.data.data.id}`);
      }
      router.refresh();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.error || "Terjadi kesalahan");
      } else {
        toast.error("Terjadi kesalahan");
      }
    } finally {
      setLoading(false);
    }
  };

  const progressValue = (currentStep / 5) * 100;

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          {steps.map((step) => (
            <div key={step.number} className="flex items-center gap-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                  step.number <= currentStep
                    ? "bg-[#6C63FF] text-white"
                    : "bg-[#2A2D3E] text-[#94A3B8]"
                }`}
              >
                {step.number}
              </div>
              <span className={`text-xs hidden sm:inline ${
                step.number <= currentStep ? "text-[#E2E8F0]" : "text-[#94A3B8]"
              }`}>
                {step.title}
              </span>
            </div>
          ))}
        </div>
        <Progress value={progressValue} />
      </div>

      {/* Form Steps */}
      <div className="rounded-xl border border-[#2A2D3E] bg-[#1A1D27] p-6">
        {currentStep === 1 && <Step1Identity data={formData} onChange={updateFormData} />}
        {currentStep === 2 && <Step2Event data={formData} onChange={updateFormData} />}
        {currentStep === 3 && <Step3Content data={formData} onChange={updateFormData} />}
        {currentStep === 4 && <Step4Theme data={formData} onChange={updateFormData} />}
        {currentStep === 5 && <Step5Config data={formData} onChange={updateFormData} />}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={handlePrev}
          disabled={currentStep === 1}
        >
          Sebelumnya
        </Button>
        <span className="text-sm text-[#94A3B8]">Langkah {currentStep} dari 5</span>
        {currentStep < 5 ? (
          <Button onClick={handleNext}>Selanjutnya</Button>
        ) : (
          <Button onClick={handleSubmit} loading={loading}>
            {editId ? "Simpan Perubahan" : "Simpan Klien"}
          </Button>
        )}
      </div>
    </div>
  );
}
