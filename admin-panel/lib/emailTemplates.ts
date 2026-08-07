import { getInvitationUrl } from "@/lib/urls";

export type EmailTemplateId = "payment" | "subdomain_ready";

export type EmailFieldDef = {
  key: string;
  label: string;
  placeholder?: string;
  multiline?: boolean;
  required?: boolean;
};

export type EmailTemplateDef = {
  id: EmailTemplateId;
  title: string;
  description: string;
  fields: EmailFieldDef[];
  defaultValues: Record<string, string>;
  buildSubject: (data: Record<string, string>) => string;
  buildText: (data: Record<string, string>) => string;
  buildHtml: (data: Record<string, string>) => string;
};

const CLIENT_APP_URL = (
  process.env.NEXT_PUBLIC_CLIENT_APP_URL ||
  process.env.CLIENT_APP_URL ||
  "http://localhost:3000"
).replace(/\/$/, "");

function paymentDefaults(): Record<string, string> {
  return {
    name: "",
    email: "",
    amount: "40",
    currency: "EUR",
    service: "Digitalna pozivnica + nalog za organizaciju",
    recipient: process.env.PAYMENT_RECIPIENT || "Pozivnice",
    iban: process.env.PAYMENT_IBAN || "",
    reference: "",
    note: "Nakon uplate, aktiviramo nalog i šaljemo pristup.",
  };
}

export const EMAIL_TEMPLATES: Record<EmailTemplateId, EmailTemplateDef> = {
  payment: {
    id: "payment",
    title: "Uputstvo za uplatu",
    description:
      "Šalje se klijentu sa podacima za uplatu. Zamenite iznos, poziv na broj i ostalo po potrebi.",
    fields: [
      { key: "name", label: "Ime klijenta", required: true },
      { key: "email", label: "Email (primaoc)", required: true },
      { key: "amount", label: "Iznos", required: true },
      { key: "currency", label: "Valuta", placeholder: "EUR" },
      { key: "service", label: "Usluga / paket", required: true },
      { key: "recipient", label: "Primalac uplate", required: true },
      { key: "iban", label: "Račun / IBAN", required: true },
      {
        key: "reference",
        label: "Poziv na broj / referenca",
        placeholder: "npr. ime + prezime",
      },
      { key: "note", label: "Napomena", multiline: true },
    ],
    defaultValues: paymentDefaults(),
    buildSubject: (d) =>
      `Uputstvo za uplatu – ${d.service || "Pozivnice"}`,
    buildText: (d) =>
      [
        `Zdravo ${d.name || ""},`,
        "",
        "Hvala na poverenju. Ispod su podaci za uplatu:",
        "",
        `Usluga: ${d.service}`,
        `Iznos: ${d.amount} ${d.currency || "EUR"}`,
        `Primalac: ${d.recipient}`,
        `Račun / IBAN: ${d.iban}`,
        d.reference ? `Poziv na broj / referenca: ${d.reference}` : null,
        "",
        d.note || null,
        "",
        "Kad uplatite, javite nam se kratkom potvrdom (slika ili PDF izvoda).",
        "",
        "Srdačan pozdrav,",
        "Pozivnice",
      ]
        .filter((line) => line !== null)
        .join("\n"),
    buildHtml: (d) => `
      <div style="font-family:Arial,sans-serif;line-height:1.55;color:#111;max-width:560px">
        <p>Zdravo <strong>${escapeHtml(d.name)}</strong>,</p>
        <p>Hvala na poverenju. Ispod su podaci za uplatu:</p>
        <table style="border-collapse:collapse;width:100%;margin:16px 0">
          <tr><td style="padding:8px 0;color:#666">Usluga</td><td style="padding:8px 0"><strong>${escapeHtml(d.service)}</strong></td></tr>
          <tr><td style="padding:8px 0;color:#666">Iznos</td><td style="padding:8px 0"><strong>${escapeHtml(d.amount)} ${escapeHtml(d.currency || "EUR")}</strong></td></tr>
          <tr><td style="padding:8px 0;color:#666">Primalac</td><td style="padding:8px 0">${escapeHtml(d.recipient)}</td></tr>
          <tr><td style="padding:8px 0;color:#666">Račun / IBAN</td><td style="padding:8px 0;font-family:monospace">${escapeHtml(d.iban)}</td></tr>
          ${
            d.reference
              ? `<tr><td style="padding:8px 0;color:#666">Poziv na broj</td><td style="padding:8px 0">${escapeHtml(d.reference)}</td></tr>`
              : ""
          }
        </table>
        ${d.note ? `<p>${escapeHtml(d.note)}</p>` : ""}
        <p>Kad uplatite, javite nam se kratkom potvrdom (slika ili PDF izvoda).</p>
        <p>Srdačan pozdrav,<br/>Pozivnice</p>
      </div>
    `,
  },

  subdomain_ready: {
    id: "subdomain_ready",
    title: "Pozivnica je spremna (subdomain)",
    description:
      "Šalje se kad je subdomain aktivan — link pozivnice i kratko uputstvo.",
    fields: [
      { key: "name", label: "Ime klijenta", required: true },
      { key: "email", label: "Email (primaoc)", required: true },
      { key: "project_title", label: "Naziv projekta", required: true },
      { key: "subdomain", label: "Subdomain", required: true },
      {
        key: "invitation_url",
        label: "Link pozivnice",
        required: true,
        placeholder: "automatski iz subdomain-a",
      },
      {
        key: "login_url",
        label: "Link za prijavu (backoffice)",
        placeholder: `${CLIENT_APP_URL}/login`,
      },
      {
        key: "note",
        label: "Dodatna napomena",
        multiline: true,
      },
    ],
    defaultValues: {
      name: "",
      email: "",
      project_title: "",
      subdomain: "",
      invitation_url: "",
      login_url: `${CLIENT_APP_URL}/login`,
      note: "U nalogu možete menjati tekstove, pratiti goste i pripreme.",
    },
    buildSubject: (d) =>
      `Vaša pozivnica je online – ${d.project_title || d.subdomain || "Pozivnice"}`,
    buildText: (d) =>
      [
        `Zdravo ${d.name || ""},`,
        "",
        `Pozivnica „${d.project_title}” je aktivna.`,
        "",
        `Adresa pozivnice:`,
        d.invitation_url || getInvitationUrl(d.subdomain || ""),
        "",
        d.subdomain ? `Subdomain: ${d.subdomain}` : null,
        "",
        d.login_url
          ? `Backoffice (prijava): ${d.login_url}`
          : null,
        "",
        d.note || null,
        "",
        "Ako treba izmena ili pomoć — odgovorite na ovaj mejl.",
        "",
        "Srdačan pozdrav,",
        "Pozivnice",
      ]
        .filter((line) => line !== null)
        .join("\n"),
    buildHtml: (d) => {
      const url = d.invitation_url || getInvitationUrl(d.subdomain || "");
      return `
      <div style="font-family:Arial,sans-serif;line-height:1.55;color:#111;max-width:560px">
        <p>Zdravo <strong>${escapeHtml(d.name)}</strong>,</p>
        <p>Pozivnica <strong>„${escapeHtml(d.project_title)}”</strong> je aktivna.</p>
        <p style="margin:20px 0">
          <a href="${escapeAttr(url)}" style="display:inline-block;padding:12px 18px;background:#0f766e;color:#fff;text-decoration:none;border-radius:8px">
            Otvori pozivnicu
          </a>
        </p>
        <p style="font-size:13px;color:#555">
          Link:<br/>
          <a href="${escapeAttr(url)}">${escapeHtml(url)}</a>
        </p>
        ${
          d.subdomain
            ? `<p style="font-size:13px;color:#555">Subdomain: <code>${escapeHtml(d.subdomain)}</code></p>`
            : ""
        }
        ${
          d.login_url
            ? `<p style="font-size:13px;color:#555">Backoffice: <a href="${escapeAttr(d.login_url)}">${escapeHtml(d.login_url)}</a></p>`
            : ""
        }
        ${d.note ? `<p>${escapeHtml(d.note)}</p>` : ""}
        <p>Ako treba izmena ili pomoć — odgovorite na ovaj mejl.</p>
        <p>Srdačan pozdrav,<br/>Pozivnice</p>
      </div>
    `;
    },
  },
};

export function listEmailTemplates(): EmailTemplateDef[] {
  return Object.values(EMAIL_TEMPLATES);
}

export function getEmailTemplate(id: string): EmailTemplateDef | null {
  if (id === "payment" || id === "subdomain_ready") {
    return EMAIL_TEMPLATES[id];
  }
  return null;
}

export function renderEmailTemplate(
  id: EmailTemplateId,
  data: Record<string, string>,
): { subject: string; text: string; html: string } {
  const template = EMAIL_TEMPLATES[id];
  const merged = { ...template.defaultValues, ...data };

  // Auto-fill invitation URL from subdomain when missing
  if (id === "subdomain_ready" && merged.subdomain && !merged.invitation_url) {
    merged.invitation_url = getInvitationUrl(merged.subdomain);
  }

  return {
    subject: template.buildSubject(merged),
    text: template.buildText(merged),
    html: template.buildHtml(merged),
  };
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escapeAttr(value: string): string {
  return escapeHtml(value).replace(/'/g, "&#39;");
}
