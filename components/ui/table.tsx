import { HTMLAttributes, TdHTMLAttributes, ThHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Table({ className, ...props }: HTMLAttributes<HTMLTableElement>) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm shadow-slate-200/50">
      <table className={cn("w-full text-left text-sm border-collapse", className)} {...props} />
    </div>
  );
}

export function TableHead({ className, ...props }: HTMLAttributes<HTMLTableSectionElement>) {
  return <thead className={cn("bg-slate-50/80 text-slate-500 uppercase tracking-wider text-xs font-bold border-b border-slate-200/80", className)} {...props} />;
}

export function TableBody(props: HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody className="divide-y divide-slate-100" {...props} />;
}

export function TableRow({ className, ...props }: HTMLAttributes<HTMLTableRowElement>) {
  return <tr className={cn("transition-colors hover:bg-indigo-50/30 group", className)} {...props} />;
}

export function TableTh({ className, ...props }: ThHTMLAttributes<HTMLTableCellElement>) {
  return <th className={cn("px-6 py-4 font-semibold text-slate-600", className)} {...props} />;
}

export function TableTd({ className, ...props }: TdHTMLAttributes<HTMLTableCellElement>) {
  return <td className={cn("px-6 py-4 text-slate-800 font-medium", className)} {...props} />;
}
