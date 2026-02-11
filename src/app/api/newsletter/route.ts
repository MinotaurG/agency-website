import { NextResponse } from "next/server";
import { z } from "zod";
import { rateLimit } from "@/lib/rate-limit";
import { sendEmail } from "@/lib/email";
import { supabaseAdmin } from "@/lib/supabase/server";

const schema = z.object({
  email: z.string().email(),
  honeypot: z.string().max(0),
});

export async function POST(req: Request) {
  try {
    // 1. Rate limiting
    const ip = req.headers.get("x-forwarded-for") ?? "unknown";
    const { success } = await rateLimit(ip);
    if (!success) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    // 2. Validate
    const body = await req.json();
    const result = schema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const { email, honeypot } = result.data;

    // 3. Honeypot check
    if (honeypot) {
      return NextResponse.json({ success: true });
    }

    // 4. Save to Supabase
    if (supabaseAdmin) {
      const { error: dbError } = await supabaseAdmin
        .from("newsletter_subscribers")
        .upsert(
          { email, subscribed_at: new Date().toISOString() },
          { onConflict: "email" }
        );

      if (dbError) {
        console.error("Supabase error:", dbError);
      }
    } else {
      console.log("📧 [DEV] Newsletter subscriber:", email);
    }

    // 5. Send welcome email
    await sendEmail({
      to: [email],
      subject: "Welcome to the YourAgency Newsletter!",
      html: `
        <h2>Thanks for subscribing!</h2>
        <p>You will receive our latest insights on web development, SEO, social media, and business growth.</p>
        <p>We send 1-2 emails per month — no spam, ever.</p>
        <br/>
        <p>Best regards,<br/><strong>The YourAgency Team</strong></p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Newsletter API error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
