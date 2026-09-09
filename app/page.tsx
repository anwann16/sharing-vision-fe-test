"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Pencil,
  Trash2,
  FileText,
  Loader2,
  RefreshCw,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { usePosts } from "@/lib/posts-store";
import { Tabs } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableTh,
  TableTd,
} from "@/components/ui/table";
import { ConfirmModal } from "@/components/ui/confirm-modal";
import { Post, PostStatus, STATUS_LABEL } from "@/lib/types";

const TAB_ORDER: PostStatus[] = ["published", "draft", "trashed"];
const PAGE_SIZE = 5;

export default function DashboardPage() {
  const { posts, loading, error, reload, moveToTrash } = usePosts();
  const [activeTab, setActiveTab] = useState<PostStatus>("published");
  const [page, setPage] = useState(1);
  const [deletingPost, setDeletingPost] = useState<Post | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const tabs = TAB_ORDER.map((status) => ({
    value: status,
    label: STATUS_LABEL[status],
    count: posts.filter((p) => p.status === status).length,
  }));

  const allFilteredRows = posts.filter((p) => p.status === activeTab);
  const totalPages = Math.max(1, Math.ceil(allFilteredRows.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginatedRows = allFilteredRows.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab as PostStatus);
    setPage(1);
  };

  const handleConfirmDelete = async () => {
    if (!deletingPost) return;
    setIsDeleting(true);
    await moveToTrash(deletingPost.id);
    setIsDeleting(false);
    setDeletingPost(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            All Posts
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage and organize all your blog articles in one place.
          </p>
        </div>

        <button
          onClick={() => reload()}
          disabled={loading}
          className="self-start sm:self-center inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-xs hover:bg-slate-50 transition-all cursor-pointer disabled:opacity-50"
        >
          <RefreshCw
            className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`}
          />
          Refresh
        </button>
      </div>

      <Tabs tabs={tabs} value={activeTab} onChange={handleTabChange} />

      {error ? (
        <div className="flex flex-col items-center justify-center gap-3 py-16 bg-rose-50/50 rounded-2xl border border-rose-200 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-100 text-rose-600">
            <AlertCircle className="h-6 w-6" />
          </div>
          <h3 className="font-bold text-rose-900 text-base">
            Gagal Mengambil Data Artikel
          </h3>
          <p className="text-sm text-rose-600 max-w-md">{error}</p>
          <button
            onClick={() => reload()}
            className="mt-2 inline-flex items-center gap-2 rounded-xl bg-rose-600 text-white px-4 py-2 text-xs font-semibold hover:bg-rose-700 shadow-xs transition-all cursor-pointer"
          >
            <RefreshCw className="h-3.5 w-3.5" /> Coba Lagi
          </button>
        </div>
      ) : loading ? (
        <div className="flex flex-col items-center justify-center gap-3 py-20 bg-white rounded-2xl border border-slate-200/80 shadow-xs text-center">
          <Loader2 className="h-8 w-8 text-indigo-600 animate-spin" />
          <p className="text-sm text-slate-500 font-medium">
            Memuat data artikel dari API backend...
          </p>
        </div>
      ) : allFilteredRows.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 py-20 bg-white rounded-2xl border border-slate-200/80 shadow-xs text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-500">
            <FileText className="h-7 w-7" />
          </div>
          <h3 className="font-semibold text-slate-800 text-base">
            Belum Ada Artikel
          </h3>
          <p className="text-sm text-slate-500 max-w-sm">
            Tidak ada artikel di status{" "}
            <span className="font-medium text-slate-700">
              {STATUS_LABEL[activeTab]}
            </span>
            .
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <Table>
            <TableHead>
              <TableRow>
                <TableTh>Title</TableTh>
                <TableTh>Category</TableTh>
                <TableTh className="w-28 text-right pr-6">Action</TableTh>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedRows.map((post) => (
                <TableRow key={post.id}>
                  <TableTd className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    <div className="flex flex-col gap-0.5">
                      <span>{post.title}</span>
                      <span className="text-xs font-normal text-slate-400 line-clamp-1 max-w-xl">
                        {post.content}
                      </span>
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
                          onClick={() => setDeletingPost(post)}
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

          {/* Pagination Controls */}
          {allFilteredRows.length > PAGE_SIZE && (
            <div className="flex items-center justify-between pt-2 px-2">
              <span className="text-xs text-slate-500 font-medium">
                Menampilkan{" "}
                <span className="text-slate-800 font-semibold">
                  {(currentPage - 1) * PAGE_SIZE + 1}
                </span>{" "}
                -{" "}
                <span className="text-slate-800 font-semibold">
                  {Math.min(currentPage * PAGE_SIZE, allFilteredRows.length)}
                </span>{" "}
                dari{" "}
                <span className="text-slate-800 font-semibold">
                  {allFilteredRows.length}
                </span>{" "}
                artikel
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-xs hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer"
                >
                  <ChevronLeft className="h-4 w-4" /> Prev
                </button>
                <span className="text-xs text-slate-600 font-semibold px-2">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-xs hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none transition-all cursor-pointer"
                >
                  Next <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={Boolean(deletingPost)}
        title="Konfirmasi Hapus Artikel"
        description={
          deletingPost
            ? `Apakah Anda yakin ingin memindahkan artikel "${deletingPost.title}" ke sampah?`
            : ""
        }
        confirmText="Ya, Hapus"
        cancelText="Batal"
        isLoading={isDeleting}
        onConfirm={handleConfirmDelete}
        onClose={() => setDeletingPost(null)}
      />
    </div>
  );
}
