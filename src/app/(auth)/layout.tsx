import "@/app/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Auth - Queens",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="w-full max-w-md mx-auto p-6">{children}</main>;
}
