"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/button/Button";
import Paragraph from "@/components/shared/typography/Paragraph";
import FormLabel from "@/components/shared/FormLabel/FormLabel";
import Heading, {
  HeadingVariant,
} from "@/components/shared/typography/Heading";
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
      <div className="min-h-dvh flex flex-col items-center justify-center gap-2">
        <Heading>Prijavite se</Heading>
        <Heading variant={HeadingVariant.H3}>
          Vaša Elektronska Pozivnica
        </Heading>
        <form onSubmit={handleLogin}>
          {error && <div>{error}</div>}
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
          Nemate nalog? Kontaktirajte administratora da vam kreira nalog.
        </Paragraph>
        <Paragraph>
          Lozinka je privremena ako ste pozvani putem emaila, promenite je nakon
          prve prijave.
        </Paragraph>
      </div>
    </div>
  );
}
