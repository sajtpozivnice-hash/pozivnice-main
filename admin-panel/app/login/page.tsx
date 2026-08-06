"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { isAdminEmail } from "@/lib/adminEmails";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user && isAdminEmail(user.email)) {
        router.replace("/admin");
        return;
      }
      setChecking(false);
    })();
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    if (!isAdminEmail(data.user?.email)) {
      await supabase.auth.signOut();
      setError("Nalog nema admin pristup.");
      setLoading(false);
      return;
    }

    router.replace("/admin");
  };

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-[var(--muted)]">
        Učitavanje…
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-sm sm:p-8">
        <div className="mb-6">
          <p className="text-sm font-medium text-[var(--accent)]">
            Pozivnice
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight">
            Admin prijava
          </h1>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Pristup samo ovlašćenim naloziima.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <Field
            label="Email"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="admin@…"
            required
          />
          <Field
            label="Lozinka"
            type="password"
            value={password}
            onChange={setPassword}
            required
          />
          {error ? (
            <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </p>
          ) : null}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Prijava…" : "Prijavi se"}
          </Button>
        </form>
      </div>
    </div>
  );
}
