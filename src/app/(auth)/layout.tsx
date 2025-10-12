import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Auth - Queens",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/5",
          "antialiased",
          inter.variable,
        )}
      >
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>

        <main className="w-full max-w-md mx-auto p-6">{children}</main>
      </body>
    </html>
  );
}
