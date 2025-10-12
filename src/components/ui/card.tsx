import type * as React from "react";
import { cn } from "@/lib/utils";

export const Card = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
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

export const CardHeader = ({ children }: { children: React.ReactNode }) => (
  <div className="p-6 border-b border-border">{children}</div>
);

export const CardContent = ({ children }: { children: React.ReactNode }) => (
  <div className="p-6">{children}</div>
);

export const CardFooter = ({ children }: { children: React.ReactNode }) => (
  <div className="p-6 border-t border-border">{children}</div>
);
