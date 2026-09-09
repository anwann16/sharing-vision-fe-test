"use client";

import { useRouter, useParams } from "next/navigation";
import { usePosts } from "@/lib/posts-store";
import { PostForm } from "@/components/post-form";
import { PostStatus } from "@/lib/types";

export default function EditPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const { getById, savePost } = usePosts();

  const id = Number(params.id);
  const post = getById(id);

  if (!post) {
    return (
      <div className="text-sm text-muted-foreground">
        Article not found.{" "}
        <button onClick={() => router.push("/")} className="text-primary underline cursor-pointer">
          Back to All Posts
        </button>
      </div>
    );
  }

  const handleSubmit = (
    data: { title: string; content: string; category: string },
    status: PostStatus
  ) => {
    savePost(id, data, status);
    router.push("/");
  };

  return <PostForm heading="Edit article" initial={post} onSubmit={handleSubmit} />;
}
