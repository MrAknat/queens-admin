import type { ReactNode } from "react";
import { useAdminContent } from "@/hooks/useAdminContent";

interface AdminSectionProps {
  children: ReactNode;
  fallback?: ReactNode;
  className?: string;
}

export function AdminSection({
  children,
  fallback,
  className,
}: AdminSectionProps) {
  const { renderIfAdmin } = useAdminContent();

  const content = renderIfAdmin(children, fallback);

  if (!content) {
    return null;
  }

  return <div className={className}>{content}</div>;
}
