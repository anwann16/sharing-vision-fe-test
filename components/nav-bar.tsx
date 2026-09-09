"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Plus, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function NavBar() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" || pathname.startsWith("/edit") : pathname === href;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-md transition-all">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3.5">
        <Link href="/" className="group flex items-center gap-2.5 font-bold tracking-tight text-slate-900">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 text-white shadow-md shadow-indigo-500/20 transition-transform group-hover:scale-105">
            <Sparkles className="h-4 w-4" />
          </div>
          <span className="text-lg">
            Sharing Vision <span className="bg-gradient-to-r from-indigo-600 to-indigo-400 bg-clip-text text-transparent font-medium">/ Studio</span>
          </span>
        </Link>

        <nav className="flex items-center gap-1.5">
          <Link
            href="/"
            className={cn(
              "rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200",
              isActive("/")
                ? "bg-indigo-50 text-indigo-700 font-semibold shadow-xs"
                : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900"
            )}
          >
            All Posts
          </Link>
          <Link
            href="/preview"
            className={cn(
              "rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200",
              isActive("/preview")
                ? "bg-indigo-50 text-indigo-700 font-semibold shadow-xs"
                : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900"
            )}
          >
            Preview
          </Link>
          <div className="ml-2 pl-2 border-l border-slate-200">
            <Link href="/add-new">
              <Button className="shadow-md shadow-indigo-500/20 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]">
                <Plus className="h-4 w-4 stroke-[2.5]" /> Add New
              </Button>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
