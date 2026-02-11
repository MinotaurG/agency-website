"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";

const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  honeypot: z.string().max(0),
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

interface NewsletterFormProps {
  variant?: "default" | "dark";
}

export function NewsletterForm({ variant = "default" }: NewsletterFormProps) {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { honeypot: "" },
  });

  const onSubmit = async (data: NewsletterFormData) => {
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Failed to subscribe");
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

  const isDark = variant === "dark";

  if (status === "success") {
    return (
      <div className="flex items-center gap-2">
        <CheckCircle className={`h-5 w-5 ${isDark ? "text-green-400" : "text-green-600"}`} />
        <p className={`text-sm ${isDark ? "text-slate-300" : "text-foreground"}`}>
          You are subscribed! Check your inbox.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
      <input
        type="text"
        {...register("honeypot")}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div className="flex gap-2">
        <Input
          {...register("email")}
          type="email"
          placeholder="Enter your email"
          className={`h-10 ${
            isDark
              ? "bg-white/10 border-white/20 text-white placeholder:text-slate-400"
              : ""
          } ${errors.email ? "border-red-500" : ""}`}
        />
        <Button
          type="submit"
          size="sm"
          className="h-10 px-4 shrink-0"
          disabled={status === "loading"}
        >
          {status === "loading" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Subscribe"
          )}
        </Button>
      </div>

      {errors.email && (
        <p className={`text-xs ${isDark ? "text-red-400" : "text-red-500"}`}>
          {errors.email.message}
        </p>
      )}

      {status === "error" && (
        <div className={`flex items-center gap-1 text-xs ${isDark ? "text-red-400" : "text-red-500"}`}>
          <AlertCircle className="h-3 w-3" />
          {errorMessage}
        </div>
      )}

      <p className={`text-xs ${isDark ? "text-slate-500" : "text-muted-foreground"}`}>
        Free insights, no spam. Unsubscribe anytime.
      </p>
    </form>
  );
}
