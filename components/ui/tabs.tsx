"use client";

import { cn } from "@/lib/utils";

interface Tab {
  value: string;
  label: string;
  count?: number;
}

interface TabsProps {
  tabs: Tab[];
  value: string;
  onChange: (value: string) => void;
}

export function Tabs({ tabs, value, onChange }: TabsProps) {
  return (
    <div className="mb-6 inline-flex p-1.5 bg-slate-200/60 rounded-2xl border border-slate-200/80 gap-1 shadow-inner">
      {tabs.map((tab) => {
        const active = tab.value === value;
        return (
          <button
            key={tab.value}
            onClick={() => onChange(tab.value)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-200 cursor-pointer select-none",
              active
                ? "bg-white text-indigo-700 shadow-sm shadow-slate-200"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/50"
            )}
          >
            <span>{tab.label}</span>
            {typeof tab.count === "number" && (
              <span
                className={cn(
                  "px-2 py-0.5 text-xs font-bold rounded-full transition-colors",
                  active
                    ? "bg-indigo-50 text-indigo-700"
                    : "bg-slate-300/60 text-slate-600"
                )}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
