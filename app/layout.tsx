import "./globals.css";
import Link from "next/link";
import { Source_Sans_3 } from "next/font/google";

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body"
});

export const metadata = {
  title: "Next Knowledge Base",
  description: "Blog + Dashboard + Secure API (App Router)"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${sourceSans.variable} antialiased`}>
        <header className="sticky top-0 z-40 border-b border-[rgb(var(--border))] bg-[rgb(var(--bg)/0.75)] backdrop-blur">
          <nav className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-4 md:flex-row md:items-center md:justify-between">
            <Link className="font-display text-lg tracking-tight" href="/home">Next KB</Link>
            <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.22em] text-[rgb(var(--muted))]">
              <Link className="rounded-full px-3 py-2 transition hover:bg-[rgb(var(--accent)/0.12)] hover:text-[rgb(var(--fg))]" href="/">
                Pages Blog
              </Link>
              <Link className="rounded-full px-3 py-2 transition hover:bg-[rgb(var(--accent)/0.12)] hover:text-[rgb(var(--fg))]" href="/markdown-blog">
                Markdown Blog
              </Link>
              <Link className="rounded-full px-3 py-2 transition hover:bg-[rgb(var(--accent)/0.12)] hover:text-[rgb(var(--fg))]" href="/docs">
                Docs
              </Link>
              <Link className="rounded-full px-3 py-2 transition hover:bg-[rgb(var(--accent)/0.12)] hover:text-[rgb(var(--fg))]" href="/dashboard">
                Dashboard
              </Link>
            </div>
          </nav>
        </header>

        <main className="mx-auto max-w-5xl px-4 py-10">
          {children}
        </main>

        <footer className="mx-auto max-w-5xl px-4 pb-10 text-xs uppercase tracking-[0.2em] text-[rgb(var(--muted))]">
          Built with Next.js App Router
        </footer>
      </body>
    </html>
  );
}
