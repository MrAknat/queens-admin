"use client";

import {
  ChevronLeft,
  ChevronRight,
  Home,
  Settings,
  TrendingUp,
  Users,
  Wrench,
} from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useUser } from "@/stores/auth-store";
import { useUIStore } from "@/stores/ui-store";
import { NavItem } from "./nav-item";

const navigationItems = [
  { href: "/dashboard", icon: Home, label: "Dashboard" },
  { href: "/dashboard/users", icon: Users, label: "Users" },
  { href: "/dashboard/settings", icon: Settings, label: "Settings" },
  { href: "/dashboard/statistics", icon: TrendingUp, label: "Statistics" },
  { href: "/theme", icon: Wrench, label: "Theme" },
];

export const Sidebar: React.FC = () => {
  const { sidebarCollapsed, toggleSidebar, isMobile } = useUIStore();
  const user = useUser();

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      useUIStore.getState().setIsMobile(mobile);
      if (mobile && !sidebarCollapsed) {
        useUIStore.getState().setSidebarCollapsed(true);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [sidebarCollapsed]);

  const handleNavClick = () => {
    if (isMobile) {
      useUIStore.getState().setSidebarCollapsed(true);
    }
  };

  return (
    <>
      {isMobile && !sidebarCollapsed && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => useUIStore.getState().setSidebarCollapsed(true)}
        />
      )}

      <aside
        className={cn(
          "fixed left-0 top-0 z-50 flex h-full flex-col border-r bg-card transition-all duration-300 ease-in-out",
          sidebarCollapsed ? "w-16" : "w-60",
          isMobile && sidebarCollapsed && "-translate-x-full",
          isMobile && !sidebarCollapsed && "translate-x-0",
        )}
      >
        <div className="flex h-16 items-center justify-start px-4">
          <Link href="/dashboard" className="flex w-full items-center gap-2">
            <div className="flex h-8 w-8 min-w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <span className="text-sm font-bold">Q</span>
            </div>
            <span className="flex-shrink-1 text-lg font-semibold overflow-hidden">
              Queens
            </span>
          </Link>

          {!isMobile && (
            <Button
              variant="ghost"
              onClick={toggleSidebar}
              className="h-8 w-8 p-0"
            >
              {sidebarCollapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </Button>
          )}
        </div>

        <Separator />

        <nav className="flex-1 space-y-1 p-4">
          {navigationItems.map((item) => (
            <NavItem
              key={item.href}
              href={item.href}
              icon={item.icon}
              label={item.label}
              collapsed={sidebarCollapsed}
              onClick={handleNavClick}
            />
          ))}
        </nav>

        <Separator />

        <div className="p-4 space-y-4">
          <div className={cn("flex items-center gap-3", "justify-start")}>
            <div className="flex h-8 w-8 min-w-8 items-center justify-center rounded-full bg-muted">
              <span className="text-sm font-medium text-muted-foreground">
                A
              </span>
            </div>
            <div className="flex-1 min-w-0 overflow-hidden">
              <p className="text-sm font-medium truncate">{user?.name}</p>
              <p className="text-xs text-muted-foreground truncate">
                {user?.email}
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
