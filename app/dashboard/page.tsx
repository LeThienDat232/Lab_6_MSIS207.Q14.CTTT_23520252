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
    name: "Le Thien Dat",
    email: "23520252@gm.uit.edu.vn",
    role: "Student",
    plan: "Free",
    lastLogin: "2025-03-10 09:15"
  };
}

export default async function DashboardPage() {
  const profile = await getUserProfile();

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-2">
          <span className="pill">Dashboard</span>
          <h1 className="text-3xl font-semibold">Welcome back</h1>
          <p className="text-sm text-[rgb(var(--muted))]">
            Server data on the left, client interactivity on the right.
          </p>
        </div>
        <ThemeToggle />
      </div>

      <section className="surface rounded-2xl p-5">
        <h2 className="text-lg font-semibold">User Profile</h2>
        <div className="mt-4 grid gap-3 text-sm">
          <div className="flex items-center justify-between border-b border-[rgb(var(--border))] pb-2">
            <span className="text-[rgb(var(--muted))]">Name</span>
            <span>{profile.name}</span>
          </div>
          <div className="flex items-center justify-between border-b border-[rgb(var(--border))] pb-2">
            <span className="text-[rgb(var(--muted))]">Email</span>
            <span>{profile.email}</span>
          </div>
          <div className="flex items-center justify-between border-b border-[rgb(var(--border))] pb-2">
            <span className="text-[rgb(var(--muted))]">Role</span>
            <span>{profile.role}</span>
          </div>
          <div className="flex items-center justify-between border-b border-[rgb(var(--border))] pb-2">
            <span className="text-[rgb(var(--muted))]">Plan</span>
            <span>{profile.plan}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[rgb(var(--muted))]">Last login</span>
            <span>{profile.lastLogin}</span>
          </div>
        </div>
      </section>

      <section className="surface rounded-2xl p-5">
        <h2 className="text-lg font-semibold">API Notes</h2>
        <p className="mt-2 text-sm text-[rgb(var(--muted))]">
          Secure endpoint lives at <code>/api/secret</code> and requires <code>x-api-key</code>.
        </p>
      </section>
    </div>
  );
}
