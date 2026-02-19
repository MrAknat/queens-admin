"use client";

import {
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  ClipboardEdit,
  Home,
  Settings,
  TrendingUp,
  Users,
  Wrench,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAdminContent } from "@/hooks/useAdminContent";
import { useUserRoles } from "@/hooks/useUserRoles";
import { cn } from "@/lib/utils";
import { useUser } from "@/stores/auth-store";
import { useUIStore } from "@/stores/ui-store";
import { NavItem } from "./nav-item";

const navigationItems = [
  { href: "/dashboard", icon: Home, label: "Dashboard", roles: [] },
  {
    href: "/todays-appraisals",
    icon: ClipboardEdit,
    label: "Today's Appraisals",
    roles: [],
  },
  {
    href: "/past-appraisals",
    icon: ClipboardCheck,
    label: "Past Appraisals",
    roles: [],
  },
  {
    href: "/max-offer-configurator",
    icon: Wrench,
    label: "Max Offer Configurator",
    roles: ["admin", "manager"],
  },
  {
    href: "/users",
    icon: Users,
    label: "Users",
    roles: ["admin"],
  },
  {
    href: "/settings",
    icon: Settings,
    label: "Settings",
    roles: ["admin"],
  },
  {
    href: "/statistics",
    icon: TrendingUp,
    label: "Statistics",
    roles: [],
  },
  { href: "/theme", icon: Wrench, label: "Theme", roles: ["developer"] },
];

export const Sidebar: React.FC = () => {
  const { sidebarCollapsed, toggleSidebar, isMobile } = useUIStore();
  const { isAdminModeActive } = useAdminContent();
  const user = useUser();
  const {
    hasAnyRole,
    requiresAdminRole,
    hasAdminRole,
    requiresAnyNonAdminRole,
  } = useUserRoles();

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      useUIStore.getState().setIsMobile(mobile);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleNavClick = () => {
    if (isMobile) {
      useUIStore.getState().setSidebarCollapsed(true);
    }
  };

  const getInitials = (firstName?: string, lastName?: string) => {
    if (firstName || lastName) {
      return `${firstName?.charAt(0).toUpperCase() || ""}${
        lastName?.charAt(0).toUpperCase() || ""
      }`;
    }

    return "?";
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
        <div className="flex h-16 items-center justify-start px-4 gap-1">
          <Link href="/dashboard" className="flex w-full items-center gap-2">
            <div className="flex h-8 w-8 min-w-8 items-center justify-center rounded-sm overflow-hidden">
              <Image src="/main-logo.png" alt="Logo" width={32} height={32} />
            </div>
            <span className="flex-shrink-1 text-lg font-semibold overflow-hidden">
              Queens
            </span>
          </Link>

          {!isMobile && (
            <Button
              variant="ghost"
              onClick={toggleSidebar}
              className="h-8 w-8 p-0 hover:bg-card-muted"
            >
              {sidebarCollapsed ? (
                <ChevronRight className="h-4 w-3" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </Button>
          )}
        </div>

        <Separator />

        <nav className="flex-1 space-y-1 p-4">
          {navigationItems.map((item) =>
            (isAdminModeActive &&
              requiresAdminRole(item.roles) &&
              hasAdminRole()) ||
            (hasAnyRole(item.roles) && requiresAnyNonAdminRole(item.roles)) ? (
              <NavItem
                key={item.href}
                href={item.href}
                icon={item.icon}
                label={item.label}
                collapsed={sidebarCollapsed}
                onClick={handleNavClick}
              />
            ) : null,
          )}
        </nav>

        <Separator />

        <div className="p-4 space-y-4">
          <div className={cn("flex items-center gap-3", "justify-start")}>
            <div className="flex h-8 w-8 min-w-8 items-center justify-center rounded-full bg-card-muted">
              <span className="text-sm font-medium text-muted-foreground">
                {getInitials(user?.firstName, user?.lastName)}
              </span>
            </div>
            <div className="flex-1 min-w-0 overflow-hidden">
              <p className="text-sm font-medium truncate">{`${user?.firstName} ${user?.lastName}`}</p>
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
