"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Button from "@/components/button/Button";
import FormLabel from "@/components/shared/FormLabel/FormLabel";
import Heading, {
  HeadingVariant,
} from "@/components/shared/typography/Heading";
import Paragraph from "@/components/shared/typography/Paragraph";
import styles from "../../components/ContactPageForm/ContactPageForm.module.css";

type OtpType = "invite" | "recovery" | "magiclink" | "signup" | "email";

export default function SetPasswordPage() {
  const router = useRouter();
  const supabase = createClient();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [hasSession, setHasSession] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const bootstrap = async () => {
      try {
        const url = new URL(window.location.href);
        const linkError = url.searchParams.get("error");
        if (linkError) {
          if (!cancelled) {
            setError(linkError);
            setReady(true);
          }
          return;
        }

        const tokenHash = url.searchParams.get("token_hash");
        const typeParam = (url.searchParams.get("type") || "invite") as OtpType;

        // 1) Preferred: our invite email link (?token_hash=&type=)
        if (tokenHash) {
          const { error: otpError } = await supabase.auth.verifyOtp({
            token_hash: tokenHash,
            type: typeParam,
          });
          if (otpError) {
            if (!cancelled) {
              setError(
                otpError.message ||
                  "Link nije važeći ili je istekao. Pošaljite invite ponovo iz admin panela.",
              );
              setReady(true);
            }
            return;
          }
          // Clean sensitive params from URL
          window.history.replaceState(null, "", "/set-password");
        } else if (window.location.hash.length > 1) {
          // 2) Fallback: Supabase hash tokens
          const params = new URLSearchParams(window.location.hash.slice(1));
          const access_token = params.get("access_token");
          const refresh_token = params.get("refresh_token");
          if (access_token && refresh_token) {
            const { error: sessionError } = await supabase.auth.setSession({
              access_token,
              refresh_token,
            });
            if (sessionError) {
              if (!cancelled) {
                setError(sessionError.message);
                setReady(true);
              }
              return;
            }
            window.history.replaceState(null, "", "/set-password");
          }
        } else if (url.searchParams.get("code")) {
          // 3) PKCE code
          const { error: codeError } = await supabase.auth.exchangeCodeForSession(
            url.searchParams.get("code")!,
          );
          if (codeError) {
            if (!cancelled) {
              setError(codeError.message);
              setReady(true);
            }
            return;
          }
          window.history.replaceState(null, "", "/set-password");
        }

        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!cancelled) {
          if (!session) {
            setError(
              "Link nije važeći ili je istekao. Zamolite admina da pošalje invite ponovo.",
            );
            setHasSession(false);
          } else {
            setHasSession(true);
            setError(null);
          }
          setReady(true);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Greška pri otvaranju linka");
          setReady(true);
        }
      }
    };

    bootstrap();
    return () => {
      cancelled = true;
    };
  }, [supabase.auth]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password.length < 8) {
      setError("Lozinka mora imati najmanje 8 karaktera.");
      return;
    }
    if (password !== confirm) {
      setError("Lozinke se ne poklapaju.");
      return;
    }

    setLoading(true);
    const { error: updateError } = await supabase.auth.updateUser({
      password,
    });
    setLoading(false);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    setSuccess(true);
    router.push("/dashboard");
    router.refresh();
  };

  if (!ready) {
    return (
      <div className="min-h-dvh flex items-center justify-center">
        <Paragraph>Provera linka…</Paragraph>
      </div>
    );
  }

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center gap-4 px-4">
      <Heading>Postavite lozinku</Heading>
      <Heading variant={HeadingVariant.H3}>Vaš nalog za pozivnice</Heading>

      {error ? (
        <p className="max-w-md text-center text-red-600 text-sm">{error}</p>
      ) : null}

      {success ? (
        <Paragraph>Lozinka sačuvana. Preusmeravanje…</Paragraph>
      ) : hasSession ? (
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <div className="flex flex-col gap-6">
            <div className={styles.inputWrapper}>
              <FormLabel text="Nova lozinka" required />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                placeholder="••••••••"
                className={styles.inputStyle}
              />
            </div>
            <div className={styles.inputWrapper}>
              <FormLabel text="Potvrdite lozinku" required />
              <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
                minLength={8}
                placeholder="••••••••"
                className={styles.inputStyle}
              />
            </div>
            <Button type="submit" disabled={loading}>
              {loading ? "Čuvanje…" : "Sačuvaj lozinku i uđi"}
            </Button>
          </div>
        </form>
      ) : null}

      <Paragraph>
        Posle toga se prijavljujete emailom sa kojim ste pozvani i ovom
        lozinkom.
      </Paragraph>
    </div>
  );
}
