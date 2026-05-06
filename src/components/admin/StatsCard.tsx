import { cn } from "@/lib/utils";
import { type LucideIcon } from "lucide-react";

interface StatsCardProps {
  icon: LucideIcon;
  label: string;
  value: number | string;
  trend?: { value: number; isPositive: boolean };
  color?: "blue" | "yellow" | "green" | "purple" | "red";
}

const colorMap = {
  blue: { bg: "bg-blue-500/10", text: "text-blue-400", icon: "text-blue-400" },
  yellow: { bg: "bg-yellow-500/10", text: "text-yellow-400", icon: "text-yellow-400" },
  green: { bg: "bg-green-500/10", text: "text-green-400", icon: "text-green-400" },
  purple: { bg: "bg-[#6C63FF]/10", text: "text-[#6C63FF]", icon: "text-[#6C63FF]" },
  red: { bg: "bg-red-500/10", text: "text-red-400", icon: "text-red-400" },
};

export function StatsCard({ icon: Icon, label, value, trend, color = "blue" }: StatsCardProps) {
  const colors = colorMap[color];

  return (
    <div className="rounded-xl border border-[#2A2D3E] bg-[#1A1D27] p-5 transition-all hover:border-[#3A3D5E]">
      <div className="flex items-center justify-between">
        <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg", colors.bg)}>
          <Icon className={cn("h-5 w-5", colors.icon)} />
        </div>
        {trend && (
          <span className={cn("text-xs font-medium", trend.isPositive ? "text-green-400" : "text-red-400")}>
            {trend.isPositive ? "+" : ""}{trend.value}%
          </span>
        )}
      </div>
      <div className="mt-4">
        <p className="text-2xl font-bold text-[#E2E8F0]">{value}</p>
        <p className="text-sm text-[#94A3B8] mt-1">{label}</p>
      </div>
    </div>
  );
}
