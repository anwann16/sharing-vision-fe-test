"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { usePosts } from "@/lib/posts-store";
import { PostForm } from "@/components/post-form";
import { PostStatus, Post } from "@/lib/types";
import { fetchArticleById } from "@/lib/api";

export default function EditPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const { getById, savePost } = usePosts();

  const id = Number(params.id);
  const [post, setPost] = useState<Post | undefined>(getById(id));
  const [loading, setLoading] = useState(!post);

  useEffect(() => {
    if (!post && id) {
      setLoading(true);
      fetchArticleById(id)
        .then((fetched) => {
          if (fetched) setPost(fetched);
        })
        .finally(() => setLoading(false));
    }
  }, [id, post]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20 text-slate-500 text-sm">
        Loading article data...
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-sm text-slate-500 py-10 text-center">
        Article not found.{" "}
        <button onClick={() => router.push("/")} className="text-indigo-600 underline font-semibold cursor-pointer">
          Back to All Posts
        </button>
      </div>
    );
  }

  const handleSubmit = async (
    data: { title: string; content: string; category: string },
    status: PostStatus
  ) => {
    return await savePost(id, data, status);
  };

  return <PostForm heading="Edit Article" initial={post} onSubmit={handleSubmit} />;
}
