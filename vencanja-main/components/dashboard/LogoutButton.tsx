"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { isDemoMode } from "@/lib/demo/mode";

export default function LogoutButton() {
  const router = useRouter();
  const demo = isDemoMode();

  async function logout() {
    if (demo) {
      router.push("/");
      return;
    }

    const supabase = createClient();

    await supabase.auth.signOut();

    router.push("/login");
    router.refresh();
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      className="cursor-pointer"
      onClick={logout}
    >
      {demo ? "Napusti demo" : "Odjavi se"}
    </Button>
  );
}
