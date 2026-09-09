"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function NavBar() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" || pathname.startsWith("/edit") : pathname === href;

  return (
    <header className="flex items-center justify-between border-b border-border px-6 py-4">
      <Link href="/" className="font-serif text-lg tracking-tight text-foreground">
        Sharing Vision <span className="text-primary">/ Studio</span>
      </Link>
      <nav className="flex items-center gap-2">
        <Link
          href="/"
          className={cn(
            "rounded px-3 py-1.5 text-sm",
            isActive("/") ? "bg-accent text-foreground" : "text-foreground/70"
          )}
        >
          All Posts
        </Link>
        <Link
          href="/preview"
          className={cn(
            "rounded px-3 py-1.5 text-sm",
            isActive("/preview") ? "bg-accent text-foreground" : "text-foreground/70"
          )}
        >
          Preview
        </Link>
        <Link href="/add-new">
          <Button>
            <Plus className="h-3.5 w-3.5" /> Add New
          </Button>
        </Link>
      </nav>
    </header>
  );
}
