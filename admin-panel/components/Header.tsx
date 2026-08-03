"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  const links = [
    { name: "Pocetna", href: "/admin" },
    { name: "Klijenti", href: "/admin/clients" },
    { name: "Projekti", href: "/admin/projects" },
  ];

  return (
    <header className="bg-black text-white shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
        <div className="text-xl font-bold">Admin Panel</div>
        <nav className="flex gap-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-2 rounded ${
                pathname === link.href
                  ? "bg-white text-black"
                  : "hover:bg-gray-700 hover:text-white"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="px-3 py-2 rounded bg-red-600 hover:bg-red-700"
          >
            Odjavi se
          </button>
        </nav>
      </div>
    </header>
  );
}
