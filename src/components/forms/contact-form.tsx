"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  company: z.string().optional(),
  service: z.enum(
    [
      "web-development",
      "seo",
      "social-media",
      "business-development",
      "finance",
      "multiple",
      "other",
    ],
    { required_error: "Please select a service" }
  ),
  budget: z
    .enum(["<5k", "5k-15k", "15k-50k", "50k+", "not-sure"])
    .optional(),
  message: z
    .string()
    .min(10, "Please tell us more (at least 10 characters)")
    .max(2000, "Message is too long (max 2000 characters)"),
  honeypot: z.string().max(0),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { honeypot: "" },
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Failed to send message");
      }

      setStatus("success");
      reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong"
      );
    }
  };

  if (status === "success") {
    return (
      <div className="text-center py-12 px-4">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-xl font-semibold font-jakarta">Message Sent!</h3>
        <p className="text-muted-foreground mt-2 max-w-md mx-auto">
          Thanks for reaching out. We&apos;ll get back to you within 24 hours.
        </p>
        <Button
          variant="outline"
          className="mt-6"
          onClick={() => setStatus("idle")}
        >
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Honeypot — hidden from users, catches bots */}
      <input
        type="text"
        {...register("honeypot")}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      {/* Name & Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-2 block">Name *</label>
          <Input
            {...register("name")}
            placeholder="John Doe"
            className={errors.name ? "border-red-500 focus-visible:ring-red-500" : ""}
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1.5">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label className="text-sm font-medium mb-2 block">Email *</label>
          <Input
            {...register("email")}
            type="email"
            placeholder="john@company.com"
            className={errors.email ? "border-red-500 focus-visible:ring-red-500" : ""}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1.5">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      {/* Company */}
      <div>
        <label className="text-sm font-medium mb-2 block">Company</label>
        <Input {...register("company")} placeholder="Your Company" />
      </div>

      {/* Service & Budget */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium mb-2 block">
            Service You&apos;re Interested In *
          </label>
          <select
            {...register("service")}
            className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <option value="">Select a service</option>
            <option value="web-development">Web Development</option>
            <option value="seo">SEO</option>
            <option value="social-media">Social Media</option>
            <option value="business-development">Business Development</option>
            <option value="finance">Finance Consultancy</option>
            <option value="multiple">Multiple Services</option>
            <option value="other">Other / Not Sure</option>
          </select>
          {errors.service && (
            <p className="text-red-500 text-xs mt-1.5">
              {errors.service.message}
            </p>
          )}
        </div>
        <div>
          <label className="text-sm font-medium mb-2 block">
            Budget Range
          </label>
          <select
            {...register("budget")}
            className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <option value="not-sure">Not sure yet</option>
            <option value="<5k">Under $5,000</option>
            <option value="5k-15k">$5,000 — $15,000</option>
            <option value="15k-50k">$15,000 — $50,000</option>
            <option value="50k+">$50,000+</option>
          </select>
        </div>
      </div>

      {/* Message */}
      <div>
        <label className="text-sm font-medium mb-2 block">Message *</label>
        <Textarea
          {...register("message")}
          placeholder="Tell us about your project, goals, and timeline..."
          rows={5}
          className={errors.message ? "border-red-500 focus-visible:ring-red-500" : ""}
        />
        {errors.message && (
          <p className="text-red-500 text-xs mt-1.5">
            {errors.message.message}
          </p>
        )}
      </div>

      {/* Error banner */}
      {status === "error" && (
        <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 p-3 rounded-lg">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {errorMessage || "Something went wrong. Please try again."}
        </div>
      )}

      {/* Submit */}
      <Button
        type="submit"
        size="lg"
        className="w-full h-12 text-base"
        disabled={status === "loading"}
      >
        {status === "loading" ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          "Send Message"
        )}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        We&apos;ll get back to you within 24 hours. No spam, ever.
      </p>
    </form>
  );
}
