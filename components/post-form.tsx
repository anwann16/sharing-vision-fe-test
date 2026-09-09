"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Send, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Post, PostStatus } from "@/lib/types";

interface PostFormProps {
  heading: string;
  initial: Pick<Post, "title" | "content" | "category">;
  onSubmit: (
    data: Pick<Post, "title" | "content" | "category">,
    status: PostStatus
  ) => Promise<{ success: boolean; errors?: Record<string, string[]> }>;
}

export function PostForm({ heading, initial, onSubmit }: PostFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState(initial.title);
  const [content, setContent] = useState(initial.content);
  const [category, setCategory] = useState(initial.category);
  const [loading, setLoading] = useState(false);
  const [apiErrors, setApiErrors] = useState<Record<string, string[]> | null>(null);

  const handleSubmit = async (targetStatus: PostStatus) => {
    setLoading(true);
    setApiErrors(null);
    const result = await onSubmit({ title, content, category }, targetStatus);
    setLoading(false);

    if (result.success) {
      router.push("/");
    } else if (result.errors) {
      setApiErrors(result.errors);
    }
  };

  const fieldClass =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 shadow-xs";

  return (
    <div className="max-w-3xl mx-auto">
      <button
        onClick={() => router.push("/")}
        className="group mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-indigo-600 transition-colors cursor-pointer"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /> Back to All Posts
      </button>

      <div className="rounded-2xl border border-slate-200/80 bg-white p-8 shadow-sm shadow-slate-200/50">
        <h1 className="mb-6 text-2xl font-bold tracking-tight text-slate-900">{heading}</h1>

        {apiErrors && (
          <div className="mb-6 rounded-xl bg-rose-50 border border-rose-200 p-4 text-rose-800">
            <div className="flex items-center gap-2 font-semibold text-sm mb-1.5">
              <AlertCircle className="h-4 w-4 text-rose-600" />
              <span>Gagal menyimpan artikel. Periksa input berikut:</span>
            </div>
            <ul className="list-disc list-inside text-xs space-y-1 text-rose-700 pl-1">
              {Object.entries(apiErrors).map(([field, msgs]) => (
                <li key={field}>
                  <strong className="capitalize">{field}:</strong> {Array.isArray(msgs) ? msgs.join(", ") : String(msgs)}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex flex-col gap-6">
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
              Article Title <span className="text-slate-400 font-normal lowercase">(min 20 chars)</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Give your article a descriptive title (min 20 characters)"
              className={fieldClass}
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
              Category <span className="text-slate-400 font-normal lowercase">(min 3 chars)</span>
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Type article category (e.g. Finance, Technology, Health)"
              className={fieldClass}
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
              Content <span className="text-slate-400 font-normal lowercase">(min 200 chars)</span>
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={9}
              placeholder="Write your article content here (min 200 characters)..."
              className={`${fieldClass} resize-none leading-relaxed`}
            />
          </div>

          <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
            <Button
              onClick={() => handleSubmit("published")}
              disabled={loading}
              className="bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-500/20"
            >
              <Send className="h-4 w-4" /> {loading ? "Publishing..." : "Publish Article"}
            </Button>
            <Button
              variant="outline"
              disabled={loading}
              onClick={() => handleSubmit("draft")}
            >
              <Save className="h-4 w-4" /> {loading ? "Saving..." : "Save as Draft"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
