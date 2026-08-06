import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { sendClientInviteEmail } from "@/lib/mail";

function getClientAppUrl(): string {
  return (
    process.env.NEXT_PUBLIC_CLIENT_APP_URL ||
    process.env.CLIENT_APP_URL ||
    "http://localhost:3000"
  ).replace(/\/$/, "");
}

/**
 * Build app-owned set-password URL with token_hash.
 * Avoids fragile Supabase verify → redirect → /login loops.
 */
function buildSetPasswordLink(
  tokenHash: string,
  type: "invite" | "recovery",
): string {
  const params = new URLSearchParams({
    token_hash: tokenHash,
    type,
  });
  return `${getClientAppUrl()}/set-password?${params.toString()}`;
}

/**
 * Creates (or reuses) auth user and returns invite/recovery action link.
 */
export async function createInviteLink(email: string): Promise<{
  userId: string;
  actionLink: string;
  linkType: "invite" | "recovery";
}> {
  const normalized = email.trim().toLowerCase();
  // redirectTo still required by API; real link we email is token_hash based
  const redirectTo = `${getClientAppUrl()}/set-password`;

  const invite = await supabaseAdmin.auth.admin.generateLink({
    type: "invite",
    email: normalized,
    options: { redirectTo },
  });

  const inviteHash = invite.data?.properties?.hashed_token;
  if (!invite.error && inviteHash && invite.data.user) {
    return {
      userId: invite.data.user.id,
      actionLink: buildSetPasswordLink(inviteHash, "invite"),
      linkType: "invite",
    };
  }

  const recovery = await supabaseAdmin.auth.admin.generateLink({
    type: "recovery",
    email: normalized,
    options: { redirectTo },
  });

  const recoveryHash = recovery.data?.properties?.hashed_token;
  if (recovery.error || !recoveryHash || !recovery.data.user) {
    throw new Error(
      invite.error?.message ||
        recovery.error?.message ||
        "Nije moguće generisati invite link",
    );
  }

  return {
    userId: recovery.data.user.id,
    actionLink: buildSetPasswordLink(recoveryHash, "recovery"),
    linkType: "recovery",
  };
}

export async function inviteClientByEmail(params: {
  email: string;
  name: string;
}): Promise<{ userId: string; linkType: "invite" | "recovery" }> {
  const { userId, actionLink, linkType } = await createInviteLink(params.email);
  await sendClientInviteEmail({
    to: params.email.trim(),
    name: params.name.trim(),
    actionLink,
  });
  return { userId, linkType };
}
