"use client";

import { Bell, Menu } from "lucide-react";
import { AdminModeToggle } from "@/components/admin-mode-toggle";
import { LogoutButton } from "@/components/logoutButton";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { useUIStore } from "@/stores/ui-store";

interface HeaderProps {
  title?: string;
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
  const { isMobile, setSidebarCollapsed } = useUIStore();

  const handleMenuClick = () => {
    setSidebarCollapsed(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-end gap-4 px-4 lg:px-6">
        {/* Mobile menu button */}
        {isMobile && (
          <Button
            variant="ghost"
            onClick={handleMenuClick}
            // className="lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
        )}

        {title && (
          <div className="flex-1">
            <h1 className="text-lg font-semibold md:text-xl">{title}</h1>
          </div>
        )}

        <div className="flex items-center gap-2">
          {/* TODO: Add Notifications */}
          <Button variant="ghost" className="relative h-8 w-8 p-0">
            <Bell className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 h-2 w-2 bg-destructive rounded-full"></span>
          </Button>

          {/* TODO: Remove container divs passing className string to components directly */}
          <div className="hidden lg:block">
            <AdminModeToggle />
          </div>
          {/* TODO: Remove container divs passing className string to components directly */}
          <div className="hidden lg:block">
            <ThemeToggle />
          </div>
          <LogoutButton />
        </div>
      </div>
    </header>
  );
};
