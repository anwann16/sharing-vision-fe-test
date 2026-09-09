import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const categoryStyles: Record<string, string> = {
  Product: "bg-emerald-50 text-emerald-700 border-emerald-200/80 hover:bg-emerald-100/80",
  Engineering: "bg-indigo-50 text-indigo-700 border-indigo-200/80 hover:bg-indigo-100/80",
  Culture: "bg-purple-50 text-purple-700 border-purple-200/80 hover:bg-purple-100/80",
  Announcement: "bg-amber-50 text-amber-800 border-amber-200/80 hover:bg-amber-100/80",
};

export function Badge({ className, children, ...props }: HTMLAttributes<HTMLSpanElement>) {
  const categoryName = typeof children === "string" ? children : "";
  const styleClass = categoryStyles[categoryName] || "bg-slate-100 text-slate-700 border-slate-200";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-lg border px-2.5 py-1 text-xs font-semibold tracking-wide transition-colors",
        styleClass,
        className
      )}
      {...props}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
      {children}
    </span>
  );
}
