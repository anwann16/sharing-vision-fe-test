"use client";

import { useState } from "react";
import Link from "next/link";
import { Pencil, Trash2, FileText, ExternalLink } from "lucide-react";
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
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">All Posts</h1>
          <p className="text-sm text-slate-500 mt-1">Manage and organize all your blog articles in one place.</p>
        </div>
      </div>

      <Tabs tabs={tabs} value={activeTab} onChange={(v) => setActiveTab(v as PostStatus)} />

      {rows.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 py-20 bg-white rounded-2xl border border-slate-200/80 shadow-xs text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-500">
            <FileText className="h-7 w-7" />
          </div>
          <h3 className="font-semibold text-slate-800 text-base">Belum Ada Artikel</h3>
          <p className="text-sm text-slate-500 max-w-sm">
            Tidak ada artikel di status <span className="font-medium text-slate-700">{STATUS_LABEL[activeTab]}</span>.
          </p>
        </div>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableTh>Title</TableTh>
              <TableTh>Category</TableTh>
              <TableTh className="w-28 text-right pr-6">Action</TableTh>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((post) => (
              <TableRow key={post.id}>
                <TableTd className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  <div className="flex flex-col gap-0.5">
                    <span>{post.title}</span>
                    <span className="text-xs font-normal text-slate-400 line-clamp-1 max-w-xl">{post.content}</span>
                  </div>
                </TableTd>
                <TableTd className="align-top pt-4">
                  <Badge>{post.category}</Badge>
                </TableTd>
                <TableTd className="align-top pt-4 pr-6">
                  <div className="flex items-center justify-end gap-1.5">
                    <Link
                      href={`/edit/${post.id}`}
                      aria-label="Edit article"
                      title="Edit article"
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-indigo-50 hover:text-indigo-600 transition-all"
                    >
                      <Pencil className="h-4 w-4" />
                    </Link>
                    {post.status !== "trashed" && (
                      <button
                        onClick={() => moveToTrash(post.id)}
                        aria-label="Move to trash"
                        title="Move to trash"
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-all cursor-pointer"
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
