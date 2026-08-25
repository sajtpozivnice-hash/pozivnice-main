import { Resend } from "resend";

function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY nije podešen.");
  }
  return new Resend(apiKey);
}

function getFromAddress(displayName = "Vaš događaj") {
  const from = process.env.EMAIL_FROM?.trim();
  if (!from) {
    throw new Error("EMAIL_FROM nije podešen (npr. office@vasdogadjaj.com)");
  }
  if (from.includes("<")) return from;
  return `"${displayName}" <${from}>`;
}

function getToAddress() {
  const to = process.env.EMAIL_TO?.trim() || process.env.EMAIL_FROM?.trim();
  if (!to) {
    throw new Error("EMAIL_TO ili EMAIL_FROM mora biti podešen.");
  }
  return to;
}

export function isMailConfigured() {
  return Boolean(process.env.RESEND_API_KEY && process.env.EMAIL_FROM);
}

export async function sendContactEmail(params: {
  subject: string;
  text: string;
  replyTo?: string;
  attachment?: { filename: string; content: string; contentType: string };
}): Promise<void> {
  const resend = getResend();

  const { error } = await resend.emails.send({
    from: getFromAddress(),
    to: getToAddress(),
    subject: params.subject,
    text: params.text,
    replyTo: params.replyTo,
    attachments: params.attachment
      ? [
          {
            filename: params.attachment.filename,
            content: Buffer.from(params.attachment.content, "utf8"),
            contentType: params.attachment.contentType,
          },
        ]
      : undefined,
  });

  if (error) {
    throw new Error(error.message);
  }
}
