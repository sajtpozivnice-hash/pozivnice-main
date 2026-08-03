"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";
import ClientsTable from "@/components/ClientsTable";

export default function AdminDashboard() {
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const allowedEmails = (process.env.NEXT_PUBLIC_ADMIN_EMAILS || "").split(
        ",",
      );
      console.log(user, "us4er");
      if (!user || !allowedEmails.includes(user.email!)) {
        router.push("/admin/login");
      }
    };

    checkUser();
  }, [router]);

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl mb-4">Admin Dashboard</h1>
    </div>
  );
}
