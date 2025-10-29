import { ShieldCheck } from "lucide-react";
import type * as React from "react";
import { cn } from "@/lib/utils";

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "admin";
  containerProps?: React.HTMLAttributes<HTMLDivElement>;
}

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card = ({ children, className }: CardProps) => {
  return (
    <div
      className={cn(
        "bg-card border border-border rounded-sm shadow-sm p-0 overflow-hidden",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({
  variant = "default",
  children,
  className,
  ...props
}: CardHeaderProps) => {
  const isAdmin = variant === "admin";

  return (
    <div
      className={cn(
        "p-6 border-b border-border flex items-center gap-2 mb-2",
        isAdmin && "bg-warning/5 border-warning/20",
        className,
      )}
      {...props}
      title={isAdmin ? "Admin Only Section" : undefined}
    >
      {isAdmin && <ShieldCheck className="h-4 w-4 text-warning" />}
      {children}
    </div>
  );
};

export const CardContent = ({ children }: { children: React.ReactNode }) => (
  <div className="p-6">{children}</div>
);

export const CardFooter = ({ children }: { children: React.ReactNode }) => (
  <div className="p-6 border-t border-border">{children}</div>
);
