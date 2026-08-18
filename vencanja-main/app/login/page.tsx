"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/button/Button";
import Paragraph from "@/components/shared/typography/Paragraph";
import FormLabel from "@/components/shared/FormLabel/FormLabel";
import Heading from "@/components/shared/typography/Heading";
import Logo from "@/components/brand/Logo";
import { createClient } from "@/lib/supabase/client";
import styles from "../../components/ContactPageForm/ContactPageForm.module.css";

export default function DashboardLoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  };

  return (
    <div>
      <div className="min-h-dvh flex flex-col items-center justify-center gap-4 px-4">
        <Logo size="lg" />
        <Heading>Prijavite se</Heading>
        <form onSubmit={handleLogin} className="w-full max-w-sm">
          {error && <div className="mb-3 text-sm text-red-600">{error}</div>}
          <div className="flex flex-col gap-6">
            <div className={styles.inputWrapper}>
              <FormLabel text={"Email adresa"} required />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="tvojemail@primer.com"
                className={`${styles.inputStyle}`}
              />
            </div>
            <div className={styles.inputWrapper}>
              <FormLabel text={"Lozinka"} required />
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className={`${styles.inputStyle}`}
              />
            </div>
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? "Prijava..." : "Prijavi se"}
          </Button>
        </form>

        <Paragraph>
          Nemate nalog? Administrator će vam poslati invite mejl sa linkom za
          lozinku.
        </Paragraph>
        <Paragraph>
          Prijavljujete se emailom na koji ste dobili invite i lozinkom koju
          ste postavili.
        </Paragraph>
      </div>
    </div>
  );
}
