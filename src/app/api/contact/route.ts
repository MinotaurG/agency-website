import { NextResponse } from "next/server";
import { z } from "zod";
import { rateLimit } from "@/lib/rate-limit";
import { sendEmail } from "@/lib/email";
import { supabaseAdmin } from "@/lib/supabase/server";

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  company: z.string().optional(),
  service: z.enum([
    "web-development",
    "seo",
    "social-media",
    "business-development",
    "finance",
    "multiple",
    "other",
  ]),
  budget: z
    .enum(["<5k", "5k-15k", "15k-50k", "50k+", "not-sure"])
    .optional(),
  message: z.string().min(10).max(2000),
  honeypot: z.string().max(0),
});

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") ?? "unknown";
    const { success } = await rateLimit(ip);
    if (!success) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid form data", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const data = result.data;

    if (data.honeypot) {
      return NextResponse.json({ success: true });
    }

    if (supabaseAdmin) {
      const { error: dbError } = await supabaseAdmin.from("leads").insert({
        name: data.name,
        email: data.email,
        company: data.company || null,
        service: data.service,
        budget_range: data.budget || null,
        message: data.message,
        source: "website",
        status: "new",
      });

      if (dbError) {
        console.error("Supabase error:", dbError);
      }
    } else {
      console.log("📦 [DEV] Lead saved (no Supabase):", {
        name: data.name,
        email: data.email,
        service: data.service,
      });
    }

    await sendEmail({
      to: ["your-email@gmail.com"],
      subject: `🔔 New Lead: ${data.name} — ${data.service}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <table style="border-collapse: collapse; width: 100%;">
          <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Name</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.name}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Email</td><td style="padding: 8px; border-bottom: 1px solid #eee;"><a href="mailto:${data.email}">${data.email}</a></td></tr>
          <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Company</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.company || "N/A"}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Service</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.service}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Budget</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.budget || "Not specified"}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Message</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${data.message}</td></tr>
        </table>
      `,
    });

    await sendEmail({
      to: [data.email],
      subject: "We received your message — YourAgency",
      html: `
        <h2>Thanks for reaching out, ${data.name}!</h2>
        <p>We have received your message and a team member will get back to you within 24 hours.</p>
        <p>In the meantime, here is what you can expect:</p>
        <ol>
          <li>We will review your requirements</li>
          <li>A team member will reach out to schedule a call</li>
          <li>We will discuss your goals and prepare a proposal</li>
        </ol>
        <br/>
        <p>Best regards,<br/><strong>The YourAgency Team</strong></p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again." },
      { status: 500 }
    );
  }
}
