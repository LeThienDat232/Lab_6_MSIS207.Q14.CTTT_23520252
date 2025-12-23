import "./globals.css";
import Link from "next/link";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap"
});

export const metadata = {
  title: "Next Knowledge Base",
  description: "Blog + Dashboard + Secure API (App Router)"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="border-b border-black/10 dark:border-white/10">
          <nav className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
            <Link className="font-semibold" href="/">Next KB</Link>
            <div className="flex gap-4 text-sm">
              <Link className="hover:underline" href="/blog">Blog</Link>
              <Link className="hover:underline" href="/docs">Docs</Link>
              <Link className="hover:underline" href="/dashboard">Dashboard</Link>
            </div>
          </nav>
        </header>

        <main className="mx-auto max-w-4xl px-4 py-10">
          {children}
        </main>

        <footer className="mx-auto max-w-4xl px-4 pb-10 text-xs opacity-70">
          Built with Next.js App Router
        </footer>
      </body>
    </html>
  );
}
