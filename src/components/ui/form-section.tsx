import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface FormSectionProps {
  title: string;
  icon: LucideIcon;
  iconColor?: string;
  children: ReactNode;
  className?: string;
}

export function FormSection({
  title,
  icon: Icon,
  iconColor = "text-primary",
  children,
  className = "",
}: FormSectionProps) {
  return (
    <div className={className}>
      <div className="flex items-center gap-2 mb-4">
        <Icon className={`h-4 w-4 ${iconColor}`} />
        <h4 className="font-medium">{title}</h4>
      </div>
      {children}
    </div>
  );
}
