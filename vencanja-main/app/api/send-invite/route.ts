import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { formText, config } = await req.json();

    if (!config) {
      return NextResponse.json({ error: "Missing config" }, { status: 400 });
    }

    const attachments = [
      {
        filename: "invite-config.json",
        content: JSON.stringify(config, null, 2),
        contentType: "application/json",
      },
    ];

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Web Pozivnice" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: "Nova web pozivnica – konfiguracija",
      text: `${formText}. U prilogu se nalazi JSON konfiguracija pozivnice.`,
      attachments,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("SEND INVITE ERROR:", error);
    return NextResponse.json(
      { error: error.message || "Server error" },
      { status: 500 },
    );
  }
}
