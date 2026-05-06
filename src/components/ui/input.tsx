import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, hint, ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && (
          <label className="text-sm font-medium text-[#94A3B8]">{label}</label>
        )}
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border bg-[#1A1D27] px-3 py-2 text-sm text-[#E2E8F0] placeholder:text-[#475569] transition-colors",
            "border-[#2A2D3E] focus:border-[#6C63FF] focus:outline-none focus:ring-1 focus:ring-[#6C63FF]",
            error && "border-red-500 focus:border-red-500 focus:ring-red-500",
            "disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
        {hint && !error && <p className="text-xs text-[#475569]">{hint}</p>}
        {error && <p className="text-xs text-red-400">{error}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
