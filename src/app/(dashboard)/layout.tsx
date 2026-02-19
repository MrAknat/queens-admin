"use client";

import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/stores/ui-store";

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
}

export default function DashboardLayout({
  children,
  title,
}: DashboardLayoutProps) {
  const { sidebarCollapsed, isMobile } = useUIStore();

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      <div
        className={cn(
          "transition-all duration-300 ease-in-out",
          !isMobile && (sidebarCollapsed ? "ml-16" : "ml-60"),
          isMobile && "ml-0",
        )}
      >
        <Header title={title} />

        <main className="flex-1">
          <div className="container mx-auto p-4 lg:p-6 max-w-8xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
