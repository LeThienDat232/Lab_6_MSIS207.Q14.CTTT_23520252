import Link from "next/link";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid gap-6 md:grid-cols-[240px_1fr]">
      <aside className="surface rounded-2xl p-5">
        <h2 className="text-xs uppercase tracking-[0.3em] text-[rgb(var(--muted))]">Dashboard</h2>
        <nav className="mt-5 grid gap-2 text-sm">
          <Link className="rounded-lg border border-transparent px-3 py-2 transition hover:border-[rgb(var(--border))] hover:bg-[rgb(var(--accent)/0.08)]" href="/dashboard">
            Overview
          </Link>
          <span className="rounded-lg border border-transparent px-3 py-2 text-[rgb(var(--muted))]">Profile</span>
          <span className="rounded-lg border border-transparent px-3 py-2 text-[rgb(var(--muted))]">Settings</span>
        </nav>
      </aside>

      <section>{children}</section>
    </div>
  );
}
