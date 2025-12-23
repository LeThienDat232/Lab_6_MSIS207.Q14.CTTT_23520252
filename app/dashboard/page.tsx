import ThemeToggle from "./ThemeToggle";

type UserProfile = {
  name: string;
  email: string;
  role: string;
  plan: string;
  lastLogin: string;
};

async function getUserProfile(): Promise<UserProfile> {
  await new Promise((resolve) => setTimeout(resolve, 800));

  return {
    name: "Tran Vinh Khiem",
    email: "khiem@example.com",
    role: "Student",
    plan: "Free",
    lastLogin: "2025-03-10 09:15"
  };
}

export default async function DashboardPage() {
  const profile = await getUserProfile();

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <p className="opacity-80">
            Server Component fetches profile data; Client Component toggles theme.
          </p>
        </div>
        <ThemeToggle />
      </div>

      <section className="rounded-xl border p-4">
        <h2 className="font-semibold">User Profile</h2>
        <div className="mt-3 grid gap-2 text-sm">
          <div><span className="opacity-60">Name:</span> {profile.name}</div>
          <div><span className="opacity-60">Email:</span> {profile.email}</div>
          <div><span className="opacity-60">Role:</span> {profile.role}</div>
          <div><span className="opacity-60">Plan:</span> {profile.plan}</div>
          <div><span className="opacity-60">Last Login:</span> {profile.lastLogin}</div>
        </div>
      </section>

      <section className="rounded-xl border p-4">
        <h2 className="font-semibold">API Notes</h2>
        <p className="mt-1 text-sm opacity-70">
          Secure endpoint lives at <code>/api/secret</code> and requires <code>x-api-key</code>.
        </p>
      </section>
    </div>
  );
}
