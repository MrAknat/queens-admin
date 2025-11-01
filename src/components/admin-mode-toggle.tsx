"use client";

import { ShieldCheck, ShieldOff } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { useUserRoles } from "@/hooks/useUserRoles";
import { cn } from "@/lib/utils";
import { useAdminModeEnabled, useToggleAdminMode } from "@/stores/admin-store";

export function AdminModeToggle() {
  const { hasAdminRole } = useUserRoles();
  const adminModeEnabled = useAdminModeEnabled();
  const toggleAdminMode = useToggleAdminMode();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !hasAdminRole) {
    return null;
  }

  const handleToggle = () => {
    toggleAdminMode();
  };

  const Icon = adminModeEnabled ? ShieldCheck : ShieldOff;
  const statusText = adminModeEnabled ? "Admin Mode On" : "Admin Mode Off";
  const statusColor = adminModeEnabled && "text-warning hover:text-warning/80";

  return (
    <Button
      variant="outline"
      onClick={handleToggle}
      className={cn(
        "h-9 w-[158px] px-3 gap-2 transition-all duration-200",
        "hover:bg-warning hover:text-background",
        "group",
        adminModeEnabled && "bg-warning/10 hover:bg-warning/20",
      )}
      title={`Toggle admin mode (currently ${adminModeEnabled ? "enabled" : "disabled"})`}
      aria-label={`Admin mode toggle - ${statusText}`}
    >
      <Icon className={cn("h-4 w-4", statusColor)} />
      <span
        className={cn(
          "text-sm font-medium hidden sm:inline-block",
          statusColor,
        )}
      >
        {statusText}
      </span>
    </Button>
  );
}
