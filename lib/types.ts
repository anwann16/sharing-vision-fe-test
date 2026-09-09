export type PostStatus = "published" | "draft" | "trashed";

export interface Post {
  id: number;
  title: string;
  category: string;
  content: string;
  status: PostStatus;
  created_date?: string;
  updated_date?: string;
}

export const CATEGORIES = ["Product", "Engineering", "Culture", "Announcement", "Finance"];

export const STATUS_LABEL: Record<PostStatus, string> = {
  published: "Published",
  draft: "Drafts",
  trashed: "Trashed",
};
