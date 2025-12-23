"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const saved = localStorage.getItem("theme");
    const nextDark = saved === "dark";
    setIsDark(nextDark);
    root.classList.toggle("dark", nextDark);
  }, []);

  function toggle() {
    const root = document.documentElement;
    const next = !isDark;
    setIsDark(next);
    root.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  }

  return (
    <button
      onClick={toggle}
      className="surface rounded-full px-4 py-2 text-xs uppercase tracking-[0.2em] text-[rgb(var(--muted))] transition hover:text-[rgb(var(--fg))]"
      aria-label="Toggle theme"
    >
      Theme: {isDark ? "Dark" : "Light"}
    </button>
  );
}
