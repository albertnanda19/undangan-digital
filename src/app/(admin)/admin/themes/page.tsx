import { Crown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DEFAULT_THEMES } from "@/lib/constants/themes";

export default function ThemesPage() {
  const themes = DEFAULT_THEMES;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#E2E8F0]">Manajemen Tema</h1>
        <p className="text-sm text-[#94A3B8] mt-1">{themes.length} tema tersedia</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {themes.map((theme) => (
          <div key={theme.id} className="rounded-xl border border-[#2A2D3E] bg-[#1A1D27] p-5 hover:border-[#3A3D5E] transition-colors">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-[#E2E8F0]">{theme.name}</h3>
              {theme.isPremium && (
                <Badge variant="warning"><Crown className="h-3 w-3 mr-1" /> Premium</Badge>
              )}
            </div>
            <div className="flex gap-2 mb-3">
              <div className="h-8 w-8 rounded-full border border-[#2A2D3E]" style={{ backgroundColor: theme.config.primaryColor }} />
              <div className="h-8 w-8 rounded-full border border-[#2A2D3E]" style={{ backgroundColor: theme.config.secondaryColor }} />
              <div className="h-8 w-8 rounded-full border border-[#2A2D3E]" style={{ backgroundColor: theme.config.accentColor }} />
              <div className="h-8 w-8 rounded-full border border-[#2A2D3E]" style={{ backgroundColor: theme.config.backgroundColor }} />
            </div>
            <div className="space-y-1 text-xs text-[#94A3B8]">
              <p>Ornamen: <span className="capitalize">{theme.config.ornamentStyle}</span></p>
              <p>Font: {theme.config.fontHeading}</p>
            </div>
            <Badge variant={theme.isActive ? "success" : "secondary"} className="mt-3">
              {theme.isActive ? "Aktif" : "Nonaktif"}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
}
