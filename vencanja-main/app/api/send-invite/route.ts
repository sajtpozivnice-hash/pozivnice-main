import { NextResponse } from "next/server";
import {
  consumeRateLimit,
  getClientIp,
  isAllowedBrowserOrigin,
  MAX_CONTACT_CONFIG_CHARS,
  MAX_CONTACT_FORM_TEXT,
} from "@/lib/api/security";
import { isMailConfigured, sendContactEmail } from "@/lib/mail";

type Body = {
  formText?: unknown;
  config?: unknown;
  /** Honeypot — must be empty / missing. Bots that fill it get a fake success. */
  website?: unknown;
  company?: unknown;
};

export async function POST(req: Request) {
  try {
    if (!isAllowedBrowserOrigin(req)) {
      return NextResponse.json({ error: "Forbidden origin" }, { status: 403 });
    }

    const ip = getClientIp(req);
    if (!consumeRateLimit(`invite:${ip}`, 8, 15 * 60 * 1000)) {
      return NextResponse.json(
        { error: "Previše poruka. Pokušajte kasnije." },
        { status: 429 },
      );
    }

    if (!isMailConfigured()) {
      return NextResponse.json(
        { error: "Email nije konfigurisan." },
        { status: 503 },
      );
    }

    const body = (await req.json()) as Body;

    // Honeypot: pretend success so bots don't retry
    const honey =
      (typeof body.website === "string" && body.website.trim()) ||
      (typeof body.company === "string" && body.company.trim());
    if (honey) {
      return NextResponse.json({ success: true });
    }

    if (typeof body.formText !== "string" || !body.formText.trim()) {
      return NextResponse.json({ error: "Missing formText" }, { status: 400 });
    }

    const formText = body.formText.trim().slice(0, MAX_CONTACT_FORM_TEXT);

    // Lightweight sanity: contact forms always include an email line
    if (!/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i.test(formText)) {
      return NextResponse.json(
        { error: "Neispravan sadržaj forme." },
        { status: 400 },
      );
    }

    let attachment:
      | { filename: string; content: string; contentType: string }
      | undefined;

    if (body.config != null) {
      const serialized = JSON.stringify(body.config, null, 2);
      if (serialized.length > MAX_CONTACT_CONFIG_CHARS) {
        return NextResponse.json(
          { error: "Konfiguracija je prevelika." },
          { status: 413 },
        );
      }
      attachment = {
        filename: "invite-config.json",
        content: serialized,
        contentType: "application/json",
      };
    }

    const bodyText =
      attachment != null
        ? `${formText}\n\nU prilogu se nalazi JSON konfiguracija pozivnice.`
        : formText;

    await sendContactEmail({
      subject:
        attachment != null
          ? "Nova porudžbina pozivnice – Vaš događaj"
          : "Novi kontakt upit – Vaš događaj",
      text: bodyText,
      replyTo: extractReplyTo(formText) ?? undefined,
      attachment,
    });

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Server error";
    console.error("SEND INVITE ERROR:", error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

function extractReplyTo(formText: string): string | null {
  const match = formText.match(
    /Email:\s*([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,})/i,
  );
  return match?.[1] ?? null;
}
