"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useIsDemoMode } from "@/components/demo/DemoModeContext";

export default function LogoutButton() {
  const router = useRouter();
  const demo = useIsDemoMode();

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
