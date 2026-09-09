import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "solid" | "outline" | "ghost";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "solid", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center gap-1.5 rounded px-4 py-2 text-sm font-medium transition-colors duration-150 disabled:opacity-40 disabled:pointer-events-none cursor-pointer",
          variant === "solid" &&
            "bg-primary text-primary-foreground hover:bg-primary-hover",
          variant === "outline" &&
            "border border-border bg-transparent text-foreground hover:bg-accent",
          variant === "ghost" && "bg-transparent text-foreground hover:bg-accent",
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
