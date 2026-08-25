import { Resend } from "resend";

function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY nije podešen u admin-panel .env");
  }
  return new Resend(apiKey);
}

function getFromAddress() {
  const from = process.env.EMAIL_FROM?.trim();
  if (!from) {
    throw new Error("EMAIL_FROM nije podešen (npr. office@vasdogadjaj.com)");
  }
  if (from.includes("<")) return from;
  return `"Vaš događaj" <${from}>`;
}

export async function sendEmail(params: {
  to: string;
  subject: string;
  text: string;
  html?: string;
}): Promise<void> {
  const resend = getResend();
  const { error } = await resend.emails.send({
    from: getFromAddress(),
    to: params.to,
    subject: params.subject,
    text: params.text,
    html: params.html,
  });

  if (error) {
    throw new Error(error.message);
  }
}

export async function sendClientInviteEmail(params: {
  to: string;
  name: string;
  actionLink: string;
}): Promise<void> {
  const text = [
    `Zdravo${params.name ? ` ${params.name}` : ""},`,
    "",
    "Kreiran vam je nalog za Vaš događaj backoffice u kom možete da menjate sadržaj pozivnice, pratite potvrde dolaska, pratite finansije, organizujete događaj i drugo.",
    "Kliknite na link ispod da postavite lozinku i uđete u nalog:",
    "",
    params.actionLink,
    "",
    "Prijava: koristite ovaj email i lozinku koju postavite.",
    "",
    "Srdačan pozdrav,",
    "Vaš događaj",
  ].join("\n");

  const html = `
    <p>Zdravo${params.name ? ` <strong>${params.name}</strong>` : ""},</p>
    <p>Kreiran vam je nalog za <strong>Vaš događaj</strong> backoffice.</p>
    <p>
      <a href="${params.actionLink}" style="display:inline-block;padding:12px 18px;background:#0f766e;color:#fff;text-decoration:none;border-radius:8px;">
        Postavi lozinku
      </a>
    </p>
    <p style="color:#666;font-size:13px;">
      Ako dugme ne radi, otvorite ovaj link:<br/>
      <a href="${params.actionLink}">${params.actionLink}</a>
    </p>
    <p>Prijava: koristite ovaj email i lozinku koju postavite.</p>
    <p>Srdačan pozdrav,<br/><strong>Vaš događaj</strong></p>
  `;

  await sendEmail({
    to: params.to,
    subject: "Postavite lozinku – Vaš događaj",
    text,
    html,
  });
}
