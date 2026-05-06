import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: "bg-[#6C63FF]/20 text-[#6C63FF]",
        success: "bg-green-500/20 text-green-400",
        warning: "bg-yellow-500/20 text-yellow-400",
        destructive: "bg-red-500/20 text-red-400",
        secondary: "bg-[#2A2D3E] text-[#94A3B8]",
        outline: "border border-[#2A2D3E] text-[#94A3B8]",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
