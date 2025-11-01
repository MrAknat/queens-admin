"use client";

import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  /** The text to display for this breadcrumb item */
  label: string;
  /** The URL to navigate to when clicked. If not provided, item will not be clickable */
  href?: string;
  /** Icon to display before the label */
  icon?: React.ComponentType<{ className?: string }>;
  /** Whether this item is the current/active page */
  isCurrentPage?: boolean;
}

export interface BreadcrumbsProps {
  /** Array of breadcrumb items to display */
  items?: BreadcrumbItem[];
  /** Whether to show a home icon as the first item */
  showHome?: boolean;
  /** Custom home URL (defaults to '/dashboard') */
  homeUrl?: string;
  /** Whether to auto-generate breadcrumbs from the current path */
  autoGenerate?: boolean;
  /** Custom separator between breadcrumb items */
  separator?: React.ComponentType<{ className?: string }>;
  /** Additional CSS classes */
  className?: string;
  /** Maximum number of items to show before truncating */
  maxItems?: number;
}

/**
 * Breadcrumbs component for navigation hierarchy display
 *
 * @example
 * ```tsx
 * // Manual breadcrumbs
 * <Breadcrumbs
 *   items={[
 *     { label: "Appraisals", href: "/dashboard/appraisals" },
 *     { label: "Pending Evaluations", href: "/dashboard/pending-evaluations" },
 *     { label: "Report #123", isCurrentPage: true }
 *   ]}
 * />
 *
 * // Auto-generated breadcrumbs
 * <Breadcrumbs autoGenerate showHome />
 * ```
 */
export function Breadcrumbs({
  items = [],
  showHome = true,
  homeUrl = "/dashboard",
  autoGenerate = false,
  separator: Separator = ChevronRight,
  className,
  maxItems = 5,
}: BreadcrumbsProps) {
  const pathname = usePathname();

  // Auto-generate breadcrumbs from current path
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const pathSegments = pathname.split("/").filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [];

    let currentPath = "";
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;

      // Skip the first segment if it's 'dashboard' and we're showing home
      if (index === 0 && segment === "dashboard" && showHome) {
        return;
      }

      // Format the segment into a readable label
      const label = formatSegmentLabel(segment);
      const isLast = index === pathSegments.length - 1;

      breadcrumbs.push({
        label,
        href: isLast ? undefined : currentPath,
        isCurrentPage: isLast,
      });
    });

    return breadcrumbs;
  };

  // Format path segment into readable label
  const formatSegmentLabel = (segment: string): string => {
    // Handle dynamic routes (e.g., [id])
    if (segment.startsWith("[") && segment.endsWith("]")) {
      return segment.slice(1, -1).toUpperCase();
    }

    // Convert kebab-case to title case
    return segment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Determine which breadcrumbs to display
  let displayItems = autoGenerate ? generateBreadcrumbs() : items;

  // Add home item if requested
  if (showHome) {
    const homeItem: BreadcrumbItem = {
      label: "Home",
      href: homeUrl,
      icon: Home,
    };
    displayItems = [homeItem, ...displayItems];
  }

  // Truncate items if needed
  if (displayItems.length > maxItems) {
    const firstItem = displayItems[0];
    const lastItems = displayItems.slice(-2);
    displayItems = [
      firstItem,
      { label: "...", isCurrentPage: false },
      ...lastItems,
    ];
  }

  if (displayItems.length === 0) {
    return null;
  }

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(
        "flex items-center space-x-1 text-sm text-muted-foreground",
        className,
      )}
    >
      <ol className="flex items-center space-x-1">
        {displayItems.map((item, index) => (
          <li key={`${item.label}-${index}`} className="flex items-center">
            {index > 0 && (
              <Separator className="mx-2 h-4 w-4 text-muted-foreground/50" />
            )}

            <BreadcrumbItem item={item} />
          </li>
        ))}
      </ol>
    </nav>
  );
}

interface BreadcrumbItemProps {
  item: BreadcrumbItem;
}

function BreadcrumbItem({ item }: BreadcrumbItemProps) {
  const { label, href, icon: Icon, isCurrentPage } = item;

  const content = (
    <span
      className={cn(
        "flex items-center gap-1.5 transition-colors",
        isCurrentPage
          ? "text-foreground font-medium"
          : href
            ? "hover:text-foreground"
            : "text-muted-foreground",
      )}
    >
      {Icon && <Icon className="h-3.5 w-3.5" />}
      <span className="truncate">{label}</span>
    </span>
  );

  if (href && !isCurrentPage) {
    return (
      <Link
        href={href}
        className="transition-colors hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-sm"
      >
        {content}
      </Link>
    );
  }

  return (
    <span
      {...(isCurrentPage && { "aria-current": "page" })}
      className={cn(isCurrentPage && "text-foreground font-medium")}
    >
      {content}
    </span>
  );
}

// Additional utility component for common breadcrumb patterns
export function DashboardBreadcrumbs({
  title,
  subtitle,
  items = [],
  ...props
}: {
  title?: string;
  subtitle?: string;
} & Omit<BreadcrumbsProps, "items"> & { items?: BreadcrumbItem[] }) {
  const pathname = usePathname();

  // Add current page as the last item if title is provided
  const breadcrumbItems = title
    ? [
        ...items,
        {
          label: title,
          isCurrentPage: true,
        },
      ]
    : items;

  return (
    <div className="space-y-1">
      <Breadcrumbs items={breadcrumbItems} {...props} />
      {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
    </div>
  );
}
