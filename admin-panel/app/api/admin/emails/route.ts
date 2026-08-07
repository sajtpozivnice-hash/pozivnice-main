import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/requireAdmin";
import {
  getEmailTemplate,
  listEmailTemplates,
  renderEmailTemplate,
  type EmailTemplateId,
} from "@/lib/emailTemplates";
import { sendEmail } from "@/lib/mail";

export async function GET(req: NextRequest) {
  const auth = await requireAdmin(req);
  if (!auth.ok) return auth.response;

  return NextResponse.json(
    listEmailTemplates().map((t) => ({
      id: t.id,
      title: t.title,
      description: t.description,
      fields: t.fields,
      defaultValues: t.defaultValues,
    })),
  );
}

export async function POST(req: NextRequest) {
  const auth = await requireAdmin(req);
  if (!auth.ok) return auth.response;

  try {
    const body = await req.json();
    const templateId = body.templateId as EmailTemplateId;
    const data = (body.data || {}) as Record<string, string>;
    const previewOnly = Boolean(body.previewOnly);

    const template = getEmailTemplate(templateId);
    if (!template) {
      return NextResponse.json(
        { error: "Nepoznat email template" },
        { status: 400 },
      );
    }

    for (const field of template.fields) {
      if (field.required && !String(data[field.key] || "").trim()) {
        return NextResponse.json(
          { error: `Polje „${field.label}” je obavezno` },
          { status: 400 },
        );
      }
    }

    const rendered = renderEmailTemplate(templateId, data);

    if (previewOnly) {
      return NextResponse.json(rendered);
    }

    const to = String(data.email || "").trim();
    if (!to) {
      return NextResponse.json(
        { error: "Email primaoca je obavezan" },
        { status: 400 },
      );
    }

    await sendEmail({
      to,
      subject: rendered.subject,
      text: rendered.text,
      html: rendered.html,
    });

    return NextResponse.json({ success: true, subject: rendered.subject });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Greška";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
