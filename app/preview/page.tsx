"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, FileText, Sparkles, BookOpen } from "lucide-react";
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
    <div className="space-y-6">
      <div className="flex flex-col gap-1 border-b border-slate-200/80 pb-5">
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-600">
          <BookOpen className="h-3.5 w-3.5" /> Reader View
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Preview Articles</h1>
        <p className="text-sm text-slate-500">Published articles, exactly as readers will see them live.</p>
      </div>

      {published.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 py-20 bg-white rounded-2xl border border-slate-200/80 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-500">
            <FileText className="h-7 w-7" />
          </div>
          <h3 className="font-semibold text-slate-800 text-base">Belum Ada Artikel Dipublikasikan</h3>
          <p className="text-sm text-slate-500 max-w-sm">
            Artikel yang Anda publikasikan dari tab All Posts akan muncul secara otomatis di sini.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {slice.map((post) => (
            <article
              key={post.id}
              className="group rounded-2xl border border-slate-200/80 bg-white p-7 shadow-xs hover:shadow-md hover:border-indigo-200/80 transition-all duration-200"
            >
              <div className="flex items-center justify-between gap-4 mb-3">
                <Badge>{post.category}</Badge>
                <span className="text-xs font-semibold text-slate-400">Article #{post.id}</span>
              </div>
              <h2 className="mb-3 text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                {post.title}
              </h2>
              <p className="text-sm leading-relaxed text-slate-600 font-normal">
                {post.content}
              </p>
            </article>
          ))}
        </div>
      )}

      {published.length > 0 && (
        <div className="pt-4 flex items-center justify-between border-t border-slate-200/60">
          <span className="text-xs font-semibold text-slate-500">
            Showing Page <span className="text-slate-800">{page}</span> of <span className="text-slate-800">{totalPages}</span> ({published.length} total)
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-xs hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4" /> Previous
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-xs hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer"
            >
              Next <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
