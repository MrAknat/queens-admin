"use client";

import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type * as React from "react";
import { cn } from "@/lib/utils";

interface NavItemProps {
  href: string;
  icon: LucideIcon;
  label: string;
  collapsed?: boolean;
  onClick?: () => void;
}

export const NavItem: React.FC<NavItemProps> = ({
  href,
  icon: Icon,
  label,
  collapsed = false,
  onClick,
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "group flex items-center gap-3 rounded-lg ps-1.5 pe-3 py-2 text-sm font-medium transition-all hover:bg-card-muted",
        isActive && "bg-primary/10 text-primary border-l-3 border-primary",
        collapsed && "ps-1.5 pe-1.5",
      )}
    >
      <Icon
        className={cn(
          "h-4 w-4 shrink-0",
          isActive && "text-primary",
          !isActive && "text-muted-foreground group-hover:text-foreground",
        )}
      />

      <span className={cn(isActive && "text-primary", "overflow-hidden")}>
        {label}
      </span>
    </Link>
  );
};
