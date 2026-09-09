"use client";

import { useRouter } from "next/navigation";
import { usePosts } from "@/lib/posts-store";
import { PostForm } from "@/components/post-form";
import { CATEGORIES, PostStatus } from "@/lib/types";

export default function AddNewPage() {
  const router = useRouter();
  const { createPost } = usePosts();

  const handleSubmit = (
    data: { title: string; content: string; category: string },
    status: PostStatus
  ) => {
    createPost(data, status);
    router.push("/");
  };

  return (
    <PostForm
      heading="Add New"
      initial={{ title: "", content: "", category: CATEGORIES[0] }}
      onSubmit={handleSubmit}
    />
  );
}
