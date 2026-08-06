"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isAdminEmail } from "@/lib/adminEmails";
import { supabase } from "@/lib/supabaseClient";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user && isAdminEmail(user.email)) {
        router.replace("/admin");
      } else {
        router.replace("/login");
      }
    })();
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center text-sm text-[var(--muted)]">
      Preusmeravanje…
    </div>
  );
}
