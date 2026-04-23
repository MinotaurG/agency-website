import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SD18 Sports — Redesign Concept",
  description: "Homepage redesign concept for SD18 Sports by Elevate Strategy",
  robots: { index: false, follow: false },
};

export default function SD18MockupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
