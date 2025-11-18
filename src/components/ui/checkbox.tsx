import * as React from "react";
import { cn } from "@/lib/utils";

type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
  label: string;
};

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, ...props }, ref) => {
    return (
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          ref={ref}
          type="checkbox"
          {...props}
          className={cn(
            "h-4 w-4 rounded-sm border border-border bg-card text-primary focus:ring-2 focus:ring-ring",
            className,
          )}
        />

        <span className="text-sm">{label}</span>
      </label>
    );
  },
);
Checkbox.displayName = "Checkbox";
