import { Resend } from "resend";

// Create Resend client only if API key exists
const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

interface SendEmailParams {
  to: string[];
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: SendEmailParams) {
  if (!resend) {
    console.log("📧 [DEV] Email would be sent:");
    console.log(`   To: ${to.join(", ")}`);
    console.log(`   Subject: ${subject}`);
    console.log(`   Body: ${html.substring(0, 100)}...`);
    return { success: true, dev: true };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: "YourAgency <onboarding@resend.dev>", // Use resend.dev until you have a domain
      to,
      subject,
      html,
    });

    if (error) {
      console.error("Email error:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Email send failed:", error);
    return { success: false, error };
  }
}
