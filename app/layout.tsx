import type { Metadata } from "next";
import "./globals.css";
import { PostsProvider } from "@/lib/posts-store";
import { NavBar } from "@/components/nav-bar";

export const metadata: Metadata = {
  title: "Sharing Vision — CMS",
  description: "Dashboard for managing blog articles",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans">
        <PostsProvider>
          <NavBar />
          <main className="mx-auto max-w-4xl px-6 py-10">{children}</main>
        </PostsProvider>
      </body>
    </html>
  );
}
