"use client";

import { useEffect, useState } from "react";
import { Check, Crown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { DEFAULT_THEMES } from "@/lib/constants/themes";
import type { ClientFormData } from "@/types";
import type { Theme } from "@/types";

interface Step4Props {
  data: Partial<ClientFormData>;
  onChange: (data: Partial<ClientFormData>) => void;
}

export function Step4Theme({ data, onChange }: Step4Props) {
  const [themes, setThemes] = useState<Theme[]>(DEFAULT_THEMES);

  useEffect(() => {
    fetch("/api/admin/themes")
      .then((res) => res.json())
      .then((json) => {
        if (json.data && json.data.length > 0) setThemes(json.data);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-[#E2E8F0]">Pilih Tema</h2>
        <p className="text-sm text-[#94A3B8] mt-1">Pilih tema desain untuk halaman undangan</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {themes.map((theme) => {
          const isSelected = data.themeId === theme.id;
          return (
            <button
              key={theme.id}
              onClick={() => onChange({ themeId: theme.id })}
              className={cn(
                "relative rounded-xl border-2 p-4 text-left transition-all hover:border-[#6C63FF]/50",
                isSelected ? "border-[#6C63FF] bg-[#6C63FF]/5" : "border-[#2A2D3E] bg-[#0F1117]"
              )}
            >
              {isSelected && (
                <div className="absolute top-3 right-3 h-6 w-6 rounded-full bg-[#6C63FF] flex items-center justify-center">
                  <Check className="h-4 w-4 text-white" />
                </div>
              )}
              {theme.isPremium && (
                <Badge variant="warning" className="absolute top-3 left-3">
                  <Crown className="h-3 w-3 mr-1" /> Premium
                </Badge>
              )}

              {/* Color Palette */}
              <div className="flex gap-1.5 mb-3 mt-6">
                <div className="h-6 w-6 rounded-full" style={{ backgroundColor: theme.config.primaryColor }} />
                <div className="h-6 w-6 rounded-full" style={{ backgroundColor: theme.config.secondaryColor }} />
                <div className="h-6 w-6 rounded-full" style={{ backgroundColor: theme.config.accentColor }} />
                <div className="h-6 w-6 rounded-full border border-[#2A2D3E]" style={{ backgroundColor: theme.config.backgroundColor }} />
              </div>

              <h3 className="text-sm font-medium text-[#E2E8F0]">{theme.name}</h3>
              <p className="text-xs text-[#94A3B8] mt-1 capitalize">{theme.config.ornamentStyle}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
