"use client";

import { type BreadcrumbItem, Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { cn } from "@/lib/utils";

export interface DashboardPageLayoutProps {
  /** Page title */
  title: string;
  /** Page description/subtitle */
  description?: string;
  /** Custom breadcrumb items (if not provided, will auto-generate) */
  breadcrumbs?: BreadcrumbItem[];
  /** Whether to auto-generate breadcrumbs from the current path */
  autoGenerate?: boolean;
  /** Action buttons or other elements to display in the header */
  actions?: React.ReactNode;
  /** Page content */
  children: React.ReactNode;
  /** Additional CSS classes for the container */
  className?: string;
}

/**
 * Standard layout component for dashboard pages with breadcrumbs, title, and actions
 *
 * @example
 * ```tsx
 * <DashboardPageLayout
 *   title="Pending Evaluations"
 *   description="Monitor and manage pending vehicle evaluation appraisals."
 *   actions={<Button>Add New</Button>}
 * >
 *   <AppraisalsTable />
 * </DashboardPageLayout>
 * ```
 */
export function DashboardPageLayout({
  title,
  description,
  breadcrumbs,
  autoGenerate = true,
  actions,
  children,
  className = "",
}: DashboardPageLayoutProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Breadcrumbs
          items={breadcrumbs}
          autoGenerate={autoGenerate && !breadcrumbs}
          showHome
        />

        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
            {description && (
              <p className="text-muted-foreground">{description}</p>
            )}
          </div>

          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      </div>

      <div className={cn("space-y-6", className)}>{children}</div>
    </div>
  );
}
