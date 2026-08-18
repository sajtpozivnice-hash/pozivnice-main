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
    amount: "3999",
    currency: "RSD",
    service: "Digitalna pozivnica + nalog za organizaciju",
    recipient: process.env.PAYMENT_RECIPIENT || "Vaš događaj",
    iban: process.env.PAYMENT_IBAN || "",
    reference: "",
    note: "",
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
      `Uputstvo za uplatu – ${d.service || "Vaš događaj"}`,
    buildText: (d) =>
      [
        `Zdravo ${d.name || ""},`,
        "",
        "Hvala na poverenju!",
        "",
        "Primili smo vašu porudžbinu i drago nam je što ćete događaj organizovati uz Vaš događaj.",
        "Ispod su podaci za uplatu:",
        "",
        `Usluga: ${d.service}`,
        `Iznos: ${d.amount} ${d.currency || "RSD"}`,
        `Primalac: ${d.recipient}`,
        `Račun / IBAN: ${d.iban}`,
        d.reference ? `Poziv na broj / referenca: ${d.reference}` : null,
        "",
        d.note || null,
        "",
        "Kad uplatite, pošaljite nam kratku potvrdu (slika ili PDF izvoda) — odgovorom na ovaj mejl, ili na Viber / WhatsApp: 066 570 2562.",
        "Čim stigne potvrda, u roku od oko 10 minuta šaljemo pristup pozivnici i backoffice-u.",
        "",
        "Srdačan pozdrav,",
        "Vaš događaj",
      ]
        .filter((line) => line !== null)
        .join("\n"),
    buildHtml: (d) => `
      <div style="font-family:Arial,sans-serif;line-height:1.55;color:#111;max-width:560px">
        <p>Zdravo <strong>${escapeHtml(d.name)}</strong>,</p>
        <p><strong>Hvala na poverenju!</strong></p>
        <p>Primili smo vašu porudžbinu i drago nam je što ćete događaj organizovati uz <strong>Vaš događaj</strong>.</p>
        <p>Ispod su podaci za uplatu:</p>
        <table style="border-collapse:collapse;width:100%;margin:16px 0">
          <tr><td style="padding:8px 0;color:#666">Usluga</td><td style="padding:8px 0"><strong>${escapeHtml(d.service)}</strong></td></tr>
          <tr><td style="padding:8px 0;color:#666">Iznos</td><td style="padding:8px 0"><strong>${escapeHtml(d.amount)} ${escapeHtml(d.currency || "RSD")}</strong></td></tr>
          <tr><td style="padding:8px 0;color:#666">Primalac</td><td style="padding:8px 0">${escapeHtml(d.recipient)}</td></tr>
          <tr><td style="padding:8px 0;color:#666">Račun / IBAN</td><td style="padding:8px 0;font-family:monospace">${escapeHtml(d.iban)}</td></tr>
          ${
            d.reference
              ? `<tr><td style="padding:8px 0;color:#666">Poziv na broj</td><td style="padding:8px 0">${escapeHtml(d.reference)}</td></tr>`
              : ""
          }
        </table>
        ${d.note ? `<p>${escapeHtml(d.note)}</p>` : ""}
        <p>Kad uplatite, pošaljite nam kratku potvrdu (slika ili PDF izvoda) — odgovorom na ovaj mejl, ili na <strong>Viber / WhatsApp: 066 570 2562</strong>.</p>
        <p>Čim stigne potvrda, <strong>u roku od oko 10 minuta</strong> šaljemo pristup pozivnici i backoffice-u.</p>
        <p>Srdačan pozdrav,<br/><strong>Vaš događaj</strong></p>
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
      note: "",
    },
    buildSubject: (d) =>
      `Vaša pozivnica je online – ${d.project_title || d.subdomain || "Vaš događaj"}`,
    buildText: (d) =>
      [
        `Zdravo ${d.name || ""},`,
        "",
        `Odlične vesti — pozivnica „${d.project_title}” je aktivna i spremna za deljenje!`,
        "",
        "Link pozivnice (podelite ga gostima):",
        d.invitation_url || getInvitationUrl(d.subdomain || ""),
        "",
        "Backoffice — prijava:",
        d.login_url || null,
        "",
        "Podaci za prijavu:",
        `• Korisničko ime: ${d.email || "(vaš email)"}`,
        "• Lozinka: ona koju ste nedavno postavili preko linka iz mejla",
        "",
        "Odatle možete sve da menjate i pratite:",
        "• tekstove, imena, datume i fotografije na pozivnici",
        "• listu gostiju i potvrde dolaska (RSVP)",
        "• raspored sedenja",
        "• budžet i finansije",
        "• planer zadataka i pripreme",
        "• galeriju fotografija gostiju",
        "",
        "Saveti za početak:",
        "1. Prijavite se u backoffice i proverite da li su imena, datumi i tekstovi tačni.",
        "2. Podelite link pozivnice gostima (poruka, Viber, WhatsApp).",
        "3. Pratite potvrde dolaska i dopunite listu gostiju po potrebi.",
        "4. Sve izmene koje sačuvate odmah su vidljive na linku pozivnice.",
        "",
        d.note || null,
        "",
        "Ako treba izmena, pitanje ili pomoć — odgovorite na ovaj mejl ili nam se javite na Viber / WhatsApp: 066 570 2562.",
        "",
        "Srdačan pozdrav,",
        "Vaš događaj",
      ]
        .filter((line) => line !== null)
        .join("\n"),
    buildHtml: (d) => {
      const url = d.invitation_url || getInvitationUrl(d.subdomain || "");
      const login = d.login_url || "";
      return `
      <div style="font-family:Arial,sans-serif;line-height:1.55;color:#111;max-width:560px">
        <p>Zdravo <strong>${escapeHtml(d.name)}</strong>,</p>
        <p>Odlične vesti — pozivnica <strong>„${escapeHtml(d.project_title)}”</strong> je aktivna i spremna za deljenje!</p>
        <p style="margin:20px 0">
          <a href="${escapeAttr(url)}" style="display:inline-block;padding:12px 18px;background:#0f766e;color:#fff;text-decoration:none;border-radius:8px">
            Otvori pozivnicu
          </a>
        </p>
        <p style="font-size:14px;color:#333">
          <strong>Link pozivnice</strong> (podelite ga gostima):<br/>
          <a href="${escapeAttr(url)}">${escapeHtml(url)}</a>
        </p>
        ${
          login
            ? `<p style="font-size:14px;color:#333;margin-top:20px">
          <strong>Backoffice — prijava:</strong><br/>
          <a href="${escapeAttr(login)}">${escapeHtml(login)}</a>
        </p>
        <p><strong>Podaci za prijavu:</strong></p>
        <ul style="padding-left:18px;margin:8px 0 16px;color:#333">
          <li>Korisničko ime: <strong>${escapeHtml(d.email || "")}</strong></li>
          <li>Lozinka: ona koju ste nedavno postavili preko linka iz mejla</li>
        </ul>
        <p>Odatle možete <strong>sve da menjate i pratite</strong>:</p>
        <ul style="padding-left:18px;margin:8px 0 16px;color:#333">
          <li>tekstove, imena, datume i fotografije na pozivnici</li>
          <li>listu gostiju i potvrde dolaska (RSVP)</li>
          <li>raspored sedenja</li>
          <li>budžet i finansije</li>
          <li>planer zadataka i pripreme</li>
          <li>galeriju fotografija gostiju</li>
        </ul>`
            : ""
        }
        <p><strong>Saveti za početak:</strong></p>
        <ol style="padding-left:18px;margin:8px 0 16px;color:#333">
          <li>Prijavite se u backoffice i proverite da li su imena, datumi i tekstovi tačni.</li>
          <li>Podelite link pozivnice gostima (poruka, Viber, WhatsApp).</li>
          <li>Pratite potvrde dolaska i dopunite listu gostiju po potrebi.</li>
          <li>Sve izmene koje sačuvate odmah su vidljive na linku pozivnice.</li>
        </ol>
        ${d.note ? `<p>${escapeHtml(d.note)}</p>` : ""}
        <p>Ako treba izmena, pitanje ili pomoć — odgovorite na ovaj mejl ili nam se javite na <strong>Viber / WhatsApp: 066 570 2562</strong>.</p>
        <p>Srdačan pozdrav,<br/><strong>Vaš događaj</strong></p>
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
