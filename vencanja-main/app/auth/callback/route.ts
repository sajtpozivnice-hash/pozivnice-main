import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * Optional PKCE callback. Invite emails now use /set-password?token_hash=...
 * This route only handles ?code= flows and never dumps users on /login blindly.
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") || "/set-password";
  const safeNext = next.startsWith("/") ? next : "/set-password";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${safeNext}`);
    }
    return NextResponse.redirect(
      `${origin}/set-password?error=${encodeURIComponent(error.message)}`,
    );
  }

  // No code — send user to set-password with any leftover query (token_hash etc.)
  const passthrough = new URLSearchParams(searchParams);
  passthrough.delete("next");
  const qs = passthrough.toString();
  return NextResponse.redirect(
    `${origin}/set-password${qs ? `?${qs}` : ""}`,
  );
}
