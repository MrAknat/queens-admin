"use client";

import { redirect } from "next/navigation";
import { useHasHydrated, useIsAuthenticated } from "@/stores/auth-store";

export default function HomePage() {
  const hasHydrated = useHasHydrated();
  const isAuthenticated = useIsAuthenticated();

  if (!hasHydrated) {
    return null;
  }

  if (isAuthenticated) {
    return redirect("/dashboard");
  }

  return redirect("/login");
}
