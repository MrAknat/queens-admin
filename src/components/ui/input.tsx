import * as React from "react";
import { cn } from "@/lib/utils";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: boolean;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <input
        ref={ref}
        {...props}
        className={cn(
          "w-full rounded-sm border border-border px-3 py-2 text-sm bg-card text-card-foreground",
          "focus:outline-none focus:ring-2 focus:ring-ring",
          error && "border-destructive",
          className,
        )}
      />
    );
  },
);
Input.displayName = "Input";
