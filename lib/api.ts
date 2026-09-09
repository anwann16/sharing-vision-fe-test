import { Post, PostStatus } from "./types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export function toFrontendStatus(status: string): PostStatus {
  if (status === "publish" || status === "published") return "published";
  if (status === "thrash" || status === "trashed") return "trashed";
  return "draft";
}

export function toBackendStatus(status: PostStatus): string {
  if (status === "published") return "publish";
  if (status === "trashed") return "thrash";
  return "draft";
}

export async function fetchArticles(limit = 1000, offset = 0): Promise<Post[]> {
  const res = await fetch(`${API_BASE}/article/${limit}/${offset}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch articles");
  const json = await res.json();
  if (json.success && Array.isArray(json.data)) {
    return json.data.map((item: any) => ({
      ...item,
      status: toFrontendStatus(item.status),
    }));
  }
  return [];
}

export async function fetchArticleById(id: number): Promise<Post | undefined> {
  const res = await fetch(`${API_BASE}/article/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) return undefined;
  const json = await res.json();
  if (json.success && json.data) {
    return {
      ...json.data,
      status: toFrontendStatus(json.data.status),
    };
  }
  return undefined;
}

export async function createArticleApi(
  data: { title: string; content: string; category: string },
  status: PostStatus
): Promise<{ success: boolean; errors?: Record<string, string[]> }> {
  const res = await fetch(`${API_BASE}/article`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...data,
      status: toBackendStatus(status),
    }),
  });
  const json = await res.json();
  if (res.ok && json.success) {
    return { success: true };
  }
  return { success: false, errors: json.errors || json.data };
}

export async function updateArticleApi(
  id: number,
  data: Partial<{
    title: string;
    content: string;
    category: string;
    status: PostStatus;
  }>
): Promise<{ success: boolean; errors?: Record<string, string[]> }> {
  const payload: any = { ...data };
  if (data.status) {
    payload.status = toBackendStatus(data.status);
  }

  const res = await fetch(`${API_BASE}/article/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const json = await res.json();
  if (res.ok && json.success) {
    return { success: true };
  }
  return { success: false, errors: json.errors || json.data };
}

export async function deleteArticleApi(id: number): Promise<boolean> {
  const res = await fetch(`${API_BASE}/article/${id}`, {
    method: "DELETE",
  });
  const json = await res.json();
  return res.ok && json.success;
}
