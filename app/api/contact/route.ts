import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.ZOHO_SMTP_HOST,
  port: Number(process.env.ZOHO_SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.ZOHO_SMTP_USER,
    pass: process.env.ZOHO_SMTP_PASS,
  },
});

export async function POST(req: NextRequest) {
  const body = await req.json();

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const message = (body.message ?? "").trim();
  const app = (body.app ?? "").trim();

  // Validate required fields
  if (!name || !email || !message) {
    return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  const subject =
    app === "WalkRun"
      ? "[WalkRun Support]"
      : app === "Dhikr Counter"
      ? "[Dhikr Counter Support]"
      : "[Support Request]";

  const text = `App:\n${app || "Not specified"}\n\nFull Name:\n${name}\n\nEmail:\n${email}\n\nMessage:\n${message}`;

  try {
    await transporter.sendMail({
      from: process.env.ZOHO_SMTP_USER,
      to: "support@kurtapps.com",
      replyTo: email,
      subject,
      text,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to send message. Please try again." }, { status: 500 });
  }
}
