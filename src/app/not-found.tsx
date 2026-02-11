import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-white">
      <div className="container">
        <div className="max-w-lg mx-auto text-center">
          <div className="text-8xl font-bold font-jakarta text-primary/20 mb-4">
            404
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold font-jakarta">
            Page Not Found
          </h1>
          <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
            Sorry, the page you are looking for does not exist or has been moved.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild>
              <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
