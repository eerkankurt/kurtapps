import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  // Diagnostic: log env var presence (never log actual values)
  console.log("[contact] env check:", {
    ZOHO_SMTP_HOST: !!process.env.ZOHO_SMTP_HOST,
    ZOHO_SMTP_PORT: !!process.env.ZOHO_SMTP_PORT,
    ZOHO_SMTP_USER: !!process.env.ZOHO_SMTP_USER,
    ZOHO_SMTP_PASS: !!process.env.ZOHO_SMTP_PASS,
  });

  const body = await req.json();

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const message = (body.message ?? "").trim();
  const app = (body.app ?? "").trim();

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

  console.log("[contact] creating transporter...");
  const transporter = nodemailer.createTransport({
    host: process.env.ZOHO_SMTP_HOST,
    port: Number(process.env.ZOHO_SMTP_PORT),
    secure: true,
    auth: {
      user: process.env.ZOHO_SMTP_USER,
      pass: process.env.ZOHO_SMTP_PASS,
    },
  });

  const withTimeout = <T>(promise: Promise<T>, ms: number): Promise<T> =>
    Promise.race([
      promise,
      new Promise<T>((_, reject) =>
        setTimeout(() => reject(new Error(`Timed out after ${ms}ms`)), ms)
      ),
    ]);

  // Verify SMTP connection
  try {
    console.log("[contact] verifying SMTP connection...");
    await withTimeout(transporter.verify(), 15000);
    console.log("[contact] SMTP verify OK");
  } catch (err) {
    console.error("[contact] SMTP verify failed:", err);
    return NextResponse.json({ error: "Failed to connect to mail server." }, { status: 500 });
  }

  // Send mail
  try {
    console.log("[contact] sending mail to support@kurtapps.com...");
    await withTimeout(
      transporter.sendMail({
        from: process.env.ZOHO_SMTP_USER,
        to: "support@kurtapps.com",
        replyTo: email,
        subject,
        text,
      }),
      15000
    );
    console.log("[contact] mail sent successfully");
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[contact] sendMail failed:", err);
    return NextResponse.json({ error: "Failed to send message. Please try again." }, { status: 500 });
  }
}
