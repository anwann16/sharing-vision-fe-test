"use client";

import { usePosts } from "@/lib/posts-store";
import { PostForm } from "@/components/post-form";
import { PostStatus } from "@/lib/types";

export default function AddNewPage() {
  const { createPost } = usePosts();

  const handleSubmit = async (
    data: { title: string; content: string; category: string },
    status: PostStatus
  ) => {
    return await createPost(data, status);
  };

  return (
    <PostForm
      heading="Add New Article"
      initial={{ title: "", content: "", category: "" }}
      onSubmit={handleSubmit}
    />
  );
}
