"use client";

import { useState } from "react";
import Link from "next/link";
import { Pencil, Trash2, FileText } from "lucide-react";
import { usePosts } from "@/lib/posts-store";
import { Tabs } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Table, TableHead, TableBody, TableRow, TableTh, TableTd } from "@/components/ui/table";
import { PostStatus, STATUS_LABEL } from "@/lib/types";

const TAB_ORDER: PostStatus[] = ["published", "draft", "trashed"];

export default function DashboardPage() {
  const { posts, moveToTrash } = usePosts();
  const [activeTab, setActiveTab] = useState<PostStatus>("published");

  const tabs = TAB_ORDER.map((status) => ({
    value: status,
    label: STATUS_LABEL[status],
    count: posts.filter((p) => p.status === status).length,
  }));

  const rows = posts.filter((p) => p.status === activeTab);

  return (
    <div>
      <h1 className="mb-6 font-serif text-2xl">All Posts</h1>

      <Tabs tabs={tabs} value={activeTab} onChange={(v) => setActiveTab(v as PostStatus)} />

      {rows.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
          <FileText className="h-8 w-8 text-foreground/20" />
          <p className="text-sm text-muted-foreground">
            Belum ada artikel di {STATUS_LABEL[activeTab]}.
          </p>
        </div>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableTh>Title</TableTh>
              <TableTh>Category</TableTh>
              <TableTh className="w-24">Action</TableTh>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((post) => (
              <TableRow key={post.id}>
                <TableTd className="font-medium">{post.title}</TableTd>
                <TableTd>
                  <Badge>{post.category}</Badge>
                </TableTd>
                <TableTd>
                  <div className="flex items-center gap-3">
                    <Link href={`/edit/${post.id}`} aria-label="Edit" className="text-primary">
                      <Pencil className="h-4 w-4" />
                    </Link>
                    {post.status !== "trashed" && (
                      <button
                        onClick={() => moveToTrash(post.id)}
                        aria-label="Move to trash"
                        className="text-destructive cursor-pointer"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </TableTd>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
