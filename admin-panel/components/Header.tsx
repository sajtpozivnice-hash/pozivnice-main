"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/login");
  };

  const links = [
    { name: "Početna", href: "/admin" },
    { name: "Klijenti", href: "/admin/clients" },
    { name: "Projekti", href: "/admin/projects" },
    { name: "Emailovi", href: "/admin/emails" },
  ];

  const isActive = (href: string) =>
    pathname === href || (href !== "/admin" && pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--surface)]/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-6">
          <Link href="/admin" className="text-sm font-semibold tracking-tight">
            Pozivnice Admin
          </Link>
          <nav className="hidden items-center gap-1 sm:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-3 py-1.5 text-sm transition ${
                  isActive(link.href)
                    ? "bg-[var(--accent-soft)] font-medium text-[var(--accent)]"
                    : "text-[var(--muted)] hover:bg-[var(--surface-2)] hover:text-[var(--foreground)]"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
        <button
          onClick={handleLogout}
          className="rounded-lg px-3 py-1.5 text-sm text-[var(--muted)] transition hover:bg-red-50 hover:text-red-700"
        >
          Odjavi se
        </button>
      </div>
      <nav className="flex gap-1 overflow-x-auto border-t border-[var(--border)] px-4 py-2 sm:hidden">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-sm ${
              isActive(link.href)
                ? "bg-[var(--accent-soft)] font-medium text-[var(--accent)]"
                : "text-[var(--muted)]"
            }`}
          >
            {link.name}
          </Link>
        ))}
      </nav>
    </header>
  );
}
