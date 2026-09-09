"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
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
    "w-full rounded border border-border bg-card px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-primary";

  return (
    <div>
      <button
        onClick={() => router.push("/")}
        className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Back to All Posts
      </button>
      <h1 className="mb-6 font-serif text-2xl">{heading}</h1>

      <div className="flex flex-col gap-5">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground/80">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give your article a title"
            className={fieldClass}
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground/80">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={fieldClass}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground/80">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={8}
            placeholder="Write your article..."
            className={`${fieldClass} resize-none leading-relaxed`}
          />
        </div>

        <div className="flex gap-3 pt-2">
          <Button onClick={() => onSubmit({ title, content, category }, "published")}>
            Publish
          </Button>
          <Button
            variant="outline"
            onClick={() => onSubmit({ title, content, category }, "draft")}
          >
            Save Draft
          </Button>
        </div>
      </div>
    </div>
  );
}
