import Link from "next/link";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid gap-6 md:grid-cols-[220px_1fr]">
      <aside className="rounded-xl border p-4">
        <h2 className="text-sm font-semibold uppercase tracking-wide opacity-70">Dashboard</h2>
        <nav className="mt-4 space-y-2 text-sm">
          <Link className="block rounded px-2 py-1 hover:bg-black/5 dark:hover:bg-white/10" href="/dashboard">
            Overview
          </Link>
          <span className="block rounded px-2 py-1 opacity-60">Profile</span>
          <span className="block rounded px-2 py-1 opacity-60">Settings</span>
        </nav>
      </aside>

      <section>{children}</section>
    </div>
  );
}
