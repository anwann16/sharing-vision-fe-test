"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Post, PostStatus, SEED_POSTS } from "./types";

interface PostsContextValue {
  posts: Post[];
  getById: (id: number) => Post | undefined;
  moveToTrash: (id: number) => void;
  savePost: (id: number, data: Omit<Post, "id" | "status">, status: PostStatus) => void;
  createPost: (data: Omit<Post, "id" | "status">, status: PostStatus) => void;
}

const PostsContext = createContext<PostsContextValue | null>(null);

export function PostsProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<Post[]>(SEED_POSTS);

  const getById = (id: number) => posts.find((p) => p.id === id);

  const moveToTrash = (id: number) => {
    setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, status: "trashed" } : p)));
  };

  const savePost = (id: number, data: Omit<Post, "id" | "status">, status: PostStatus) => {
    setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, ...data, status } : p)));
  };

  const createPost = (data: Omit<Post, "id" | "status">, status: PostStatus) => {
    setPosts((prev) => {
      const nextId = Math.max(0, ...prev.map((p) => p.id)) + 1;
      return [{ id: nextId, ...data, status }, ...prev];
    });
  };

  return (
    <PostsContext.Provider value={{ posts, getById, moveToTrash, savePost, createPost }}>
      {children}
    </PostsContext.Provider>
  );
}

export function usePosts() {
  const ctx = useContext(PostsContext);
  if (!ctx) throw new Error("usePosts must be used within a PostsProvider");
  return ctx;
}
