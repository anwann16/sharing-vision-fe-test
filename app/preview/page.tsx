"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, FileText } from "lucide-react";
import { usePosts } from "@/lib/posts-store";
import { Badge } from "@/components/ui/badge";

const PAGE_SIZE = 3;

export default function PreviewPage() {
  const { posts } = usePosts();
  const [page, setPage] = useState(1);

  const published = posts.filter((p) => p.status === "published");
  const totalPages = Math.max(1, Math.ceil(published.length / PAGE_SIZE));
  const slice = published.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div>
      <h1 className="mb-1 font-serif text-2xl">Preview</h1>
      <p className="mb-8 text-sm text-muted-foreground">
        Published articles, as readers will see them.
      </p>

      {published.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
          <FileText className="h-8 w-8 text-foreground/20" />
          <p className="text-sm text-muted-foreground">Belum ada artikel yang dipublikasikan.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {slice.map((post) => (
            <article key={post.id} className="rounded border border-border bg-card p-6">
              <Badge>{post.category}</Badge>
              <h2 className="mb-2 mt-3 font-serif text-xl">{post.title}</h2>
              <p className="text-sm leading-relaxed text-foreground/70">{post.content}</p>
            </article>
          ))}
        </div>
      )}

      {published.length > 0 && (
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="rounded border border-border p-1.5 disabled:opacity-30 cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="text-sm text-muted-foreground">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="rounded border border-border p-1.5 disabled:opacity-30 cursor-pointer"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
