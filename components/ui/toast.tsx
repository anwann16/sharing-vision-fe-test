"use client";

import { CheckCircle2, AlertCircle, X } from "lucide-react";

interface ToastProps {
  message: string | null;
  type?: "success" | "error" | "info";
  onClose: () => void;
}

export function Toast({ message, type = "success", onClose }: ToastProps) {
  if (!message) return null;

  return (
    <div className="fixed top-5 right-5 z-50 flex items-center gap-3 rounded-2xl bg-slate-900/95 text-white px-5 py-3.5 shadow-2xl border border-slate-800 backdrop-blur-md animate-in slide-in-from-top-4 duration-300">
      {type === "success" && <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />}
      {type === "error" && <AlertCircle className="h-5 w-5 text-rose-400 shrink-0" />}

      <span className="text-sm font-semibold text-slate-100">{message}</span>

      <button
        onClick={onClose}
        className="ml-2 rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
