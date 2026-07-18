import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import { getPostHogClient } from "@/app/lib/posthog-server";

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { name, email, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const { error } = await resend.emails.send({
    from: "Contact Form <onboarding@resend.dev>",
    to: process.env.CONTACT_EMAIL!,
    replyTo: email,
    subject: `New message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const posthog = getPostHogClient();
  posthog.capture({
    distinctId: "anonymous",
    event: "contact_form_received",
  });
  await posthog.flush();

  return NextResponse.json({ success: true });
}
