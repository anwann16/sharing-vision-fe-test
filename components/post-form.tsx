"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CATEGORIES, Post, PostStatus } from "@/lib/types";

interface PostFormProps {
  heading: string;
  initial: Pick<Post, "title" | "content" | "category">;
  onSubmit: (data: Pick<Post, "title" | "content" | "category">, status: PostStatus) => void;
}

export function PostForm({ heading, initial, onSubmit }: PostFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState(initial.title);
  const [content, setContent] = useState(initial.content);
  const [category, setCategory] = useState(initial.category);

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

        <div className="flex flex-col gap-6">
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">Article Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Give your article a descriptive title"
              className={fieldClass}
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={`${fieldClass} cursor-pointer`}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={9}
              placeholder="Write your article content here..."
              className={`${fieldClass} resize-none leading-relaxed`}
            />
          </div>

          <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
            <Button
              onClick={() => onSubmit({ title, content, category }, "published")}
              className="bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-500/20"
            >
              <Send className="h-4 w-4" /> Publish Article
            </Button>
            <Button
              variant="outline"
              onClick={() => onSubmit({ title, content, category }, "draft")}
            >
              <Save className="h-4 w-4" /> Save as Draft
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
