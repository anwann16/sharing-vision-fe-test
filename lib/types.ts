export type PostStatus = "published" | "draft" | "trashed";

export interface Post {
  id: number;
  title: string;
  category: string;
  content: string;
  status: PostStatus;
}

export const CATEGORIES = ["Product", "Engineering", "Culture", "Announcement"];

export const STATUS_LABEL: Record<PostStatus, string> = {
  published: "Published",
  draft: "Drafts",
  trashed: "Trashed",
};

export const SEED_POSTS: Post[] = [
  {
    id: 1,
    title: "Merancang Sistem Desain yang Konsisten",
    category: "Product",
    content:
      "Sistem desain yang baik bukan sekadar kumpulan komponen, melainkan bahasa bersama antara tim desain dan engineering. Pada artikel ini kita membahas bagaimana tim kami membangun token warna, tipografi, dan spacing yang konsisten di seluruh produk.",
    status: "published",
  },
  {
    id: 2,
    title: "Catatan dari Sprint Retrospective Q3",
    category: "Culture",
    content:
      "Setiap kuartal, tim kami meluangkan waktu untuk mundur sejenak dan melihat apa yang berjalan baik dan apa yang perlu diperbaiki. Berikut adalah beberapa pelajaran penting dari retrospective terakhir kami.",
    status: "published",
  },
  {
    id: 3,
    title: "Migrasi ke Arsitektur Microservices",
    category: "Engineering",
    content:
      "Setelah dua tahun berjalan dengan monolith, kami memutuskan untuk memecah layanan utama menjadi beberapa microservices. Artikel ini menjelaskan alasan, tantangan, dan hasil dari migrasi tersebut.",
    status: "published",
  },
  {
    id: 4,
    title: "Peluncuran Fitur Kolaborasi Real-time",
    category: "Announcement",
    content:
      "Kami dengan senang hati mengumumkan fitur kolaborasi real-time yang memungkinkan tim bekerja bersama dalam satu dokumen tanpa hambatan.",
    status: "published",
  },
  {
    id: 5,
    title: "Panduan Onboarding Engineer Baru",
    category: "Engineering",
    content:
      "Draft panduan lengkap untuk membantu engineer baru memahami codebase, tooling, dan budaya kerja tim dalam dua minggu pertama.",
    status: "draft",
  },
  {
    id: 6,
    title: "Rencana Roadmap Produk 2024",
    category: "Product",
    content:
      "Draft awal roadmap produk untuk tahun depan, masih menunggu masukan dari tim leadership sebelum dipublikasikan.",
    status: "draft",
  },
  {
    id: 7,
    title: "Postingan Lama yang Sudah Tidak Relevan",
    category: "Culture",
    content: "Artikel ini sudah dipindahkan ke trash karena kontennya sudah usang.",
    status: "trashed",
  },
];
