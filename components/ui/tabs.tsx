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
    <div className="mb-5 flex gap-1 border-b border-border">
      {tabs.map((tab) => {
        const active = tab.value === value;
        return (
          <button
            key={tab.value}
            onClick={() => onChange(tab.value)}
            className={cn(
              "-mb-px px-4 py-2.5 text-sm font-medium border-b-2 cursor-pointer",
              active
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground"
            )}
          >
            {tab.label}
            {typeof tab.count === "number" && (
              <span className="ml-1.5 text-xs text-foreground/40">{tab.count}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
