import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
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

  try {
    const { error } = await resend.emails.send({
      from: "KurtApps Support <support@kurtapps.com>",
      to: "support@kurtapps.com",
      replyTo: email,
      subject,
      text,
    });

    if (error) {
      console.error("[contact]", error);
      return NextResponse.json({ error: "Failed to send message. Please try again." }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[contact]", error);
    return NextResponse.json({ error: "Failed to send message. Please try again." }, { status: 500 });
  }
}
