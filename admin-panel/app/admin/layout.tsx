"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import { Spinner } from "@/components/ui/Page";
import { isAdminEmail } from "@/lib/adminEmails";
import { supabase } from "@/lib/supabaseClient";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const guard = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user || !isAdminEmail(user.email)) {
        await supabase.auth.signOut();
        router.replace("/login");
        return;
      }

      if (!cancelled) setReady(true);
    };

    guard();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session?.user || !isAdminEmail(session.user.email)) {
        router.replace("/login");
      }
    });

    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, [router]);

  if (!ready) {
    return (
      <div className="min-h-screen">
        <Spinner label="Provera sesije…" />
      </div>
    );
  }

  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}
