import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "solid" | "outline" | "ghost" | "destructive";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "solid", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none cursor-pointer select-none",
          variant === "solid" &&
            "bg-indigo-600 text-white shadow-md shadow-indigo-500/20 hover:bg-indigo-700 hover:shadow-indigo-500/30",
          variant === "outline" &&
            "border border-slate-200 bg-white text-slate-700 shadow-xs hover:bg-slate-50 hover:border-slate-300 hover:text-slate-900",
          variant === "ghost" && "bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900",
          variant === "destructive" &&
            "bg-rose-500 text-white shadow-md shadow-rose-500/20 hover:bg-rose-600",
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
