"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { Post, PostStatus } from "./types";
import {
  fetchArticles,
  createArticleApi,
  updateArticleApi,
} from "./api";
import { Toast } from "@/components/ui/toast";

interface PostsContextValue {
  posts: Post[];
  loading: boolean;
  error: string | null;
  toast: { message: string; type: "success" | "error" } | null;
  showToast: (message: string, type?: "success" | "error") => void;
  reload: () => Promise<void>;
  getById: (id: number) => Post | undefined;
  moveToTrash: (id: number) => Promise<boolean>;
  savePost: (
    id: number,
    data: Pick<Post, "title" | "content" | "category">,
    status: PostStatus
  ) => Promise<{ success: boolean; errors?: Record<string, string[]> }>;
  createPost: (
    data: Pick<Post, "title" | "content" | "category">,
    status: PostStatus
  ) => Promise<{ success: boolean; errors?: Record<string, string[]> }>;
}

const PostsContext = createContext<PostsContextValue | null>(null);

export function PostsProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const showToast = useCallback((message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  }, []);

  const loadPosts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchArticles(1000, 0);
      setPosts(data);
    } catch (err: any) {
      console.error("API fetch error:", err);
      setError(err?.message || "Gagal terhubung ke API backend.");
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  const getById = (id: number) => posts.find((p) => p.id === id);

  const moveToTrash = async (id: number) => {
    try {
      const result = await updateArticleApi(id, { status: "trashed" });
      if (result.success) {
        await loadPosts();
        showToast("Artikel berhasil dipindahkan ke sampah!", "success");
        return true;
      }
      showToast("Gagal memindahkan artikel ke sampah", "error");
      return false;
    } catch (e: any) {
      showToast("Gagal terhubung ke API backend", "error");
      return false;
    }
  };

  const savePost = async (
    id: number,
    data: Pick<Post, "title" | "content" | "category">,
    status: PostStatus
  ) => {
    try {
      const result = await updateArticleApi(id, { ...data, status });
      if (result.success) {
        await loadPosts();
        showToast(
          status === "published"
            ? "Artikel berhasil dipublikasikan!"
            : "Artikel berhasil disimpan sebagai draft!",
          "success"
        );
        return { success: true };
      }
      showToast("Gagal menyimpan artikel. Periksa input data.", "error");
      return { success: false, errors: result.errors };
    } catch (e: any) {
      showToast("Gagal terhubung ke API backend", "error");
      return { success: false, errors: { server: ["Tidak dapat terhubung ke server."] } };
    }
  };

  const createPost = async (
    data: Pick<Post, "title" | "content" | "category">,
    status: PostStatus
  ) => {
    try {
      const result = await createArticleApi(data, status);
      if (result.success) {
        await loadPosts();
        showToast(
          status === "published"
            ? "Artikel berhasil dipublikasikan!"
            : "Artikel berhasil disimpan sebagai draft!",
          "success"
        );
        return { success: true };
      }
      showToast("Gagal membuat artikel baru. Periksa input data.", "error");
      return { success: false, errors: result.errors };
    } catch (e: any) {
      showToast("Gagal terhubung ke API backend", "error");
      return { success: false, errors: { server: ["Tidak dapat terhubung ke server."] } };
    }
  };

  return (
    <PostsContext.Provider
      value={{
        posts,
        loading,
        error,
        toast,
        showToast,
        reload: loadPosts,
        getById,
        moveToTrash,
        savePost,
        createPost,
      }}
    >
      {children}
      <Toast
        message={toast?.message || null}
        type={toast?.type}
        onClose={() => setToast(null)}
      />
    </PostsContext.Provider>
  );
}

export function usePosts() {
  const ctx = useContext(PostsContext);
  if (!ctx) throw new Error("usePosts must be used within a PostsProvider");
  return ctx;
}
