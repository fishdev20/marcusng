import { ContactEmail } from "@/app/components/ContactEmail";
import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY!);
  try {
    const { firstName, lastName, email, message } = await req.json();

    if (!firstName || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const fullName = `${firstName} ${lastName ?? ""}`.trim();

    await resend.emails.send({
      from: "Minh Nguyen <onboarding@resend.dev>",
      to: "minhfish20hp@gmail.com",
      subject: `New message from ${fullName}`,
      react: ContactEmail({ fullName, email, message }),
      replyTo: email,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Resend Error:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
