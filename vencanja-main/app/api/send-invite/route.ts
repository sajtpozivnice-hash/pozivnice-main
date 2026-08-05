import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { formText, config } = await req.json();

    if (!formText || typeof formText !== "string") {
      return NextResponse.json({ error: "Missing formText" }, { status: 400 });
    }

    const attachments =
      config != null
        ? [
            {
              filename: "invite-config.json",
              content: JSON.stringify(config, null, 2),
              contentType: "application/json",
            },
          ]
        : undefined;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const bodyText =
      config != null
        ? `${formText}\n\nU prilogu se nalazi JSON konfiguracija pozivnice.`
        : formText;

    await transporter.sendMail({
      from: `"Web Pozivnice" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject:
        config != null
          ? "Nova web pozivnica – upit sa primerom"
          : "Novi kontakt upit – eVenčanje",
      text: bodyText,
      attachments,
    });

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Server error";
    console.error("SEND INVITE ERROR:", error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
