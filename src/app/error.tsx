"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-white">
      <div className="container">
        <div className="max-w-lg mx-auto text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h1 className="text-3xl sm:text-4xl font-bold font-jakarta">
            Something Went Wrong
          </h1>
          <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
            An unexpected error occurred. Please try again or contact us if the problem persists.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button onClick={reset}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
            <Button variant="outline" asChild>
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
