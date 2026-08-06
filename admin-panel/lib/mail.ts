import nodemailer from "nodemailer";

function getTransporter() {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;
  if (!user || !pass) {
    throw new Error(
      "EMAIL_USER i EMAIL_PASS nisu podešeni u admin-panel .env (kopiraj iz vencanja-main)",
    );
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });
}

export async function sendClientInviteEmail(params: {
  to: string;
  name: string;
  actionLink: string;
}): Promise<void> {
  const from = process.env.EMAIL_USER!;
  const transporter = getTransporter();

  const text = [
    `Zdravo${params.name ? ` ${params.name}` : ""},`,
    "",
    "Kreiran vam je nalog za backoffice pozivnice u kom mozete da menjate sadrzaj pozivnice, pratite potvrde dolaska, pratite finansije, organizujete događaj i drugo.",
    "Kliknite na link ispod da postavite lozinku i uđete u nalog:",
    "",
    params.actionLink,
    "",
    "Prijava: koristite ovaj email i lozinku koju postavite.",
    "",
    "Pozivnice",
  ].join("\n");

  const html = `
    <p>Zdravo${params.name ? ` <strong>${params.name}</strong>` : ""},</p>
    <p>Kreiran vam je nalog za backoffice pozivnice.</p>
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
  `;

  await transporter.sendMail({
    from: `"Pozivnice" <${from}>`,
    to: params.to,
    subject: "Postavite lozinku – nalog za pozivnice",
    text,
    html,
  });
}
