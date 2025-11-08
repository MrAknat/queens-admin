import * as React from "react";
import { cn } from "@/lib/utils";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  loading?: boolean;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", loading, children, ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center rounded-sm px-4 py-2 text-sm font-medium h-10 cursor-pointer whitespace-nowrap";

    const variants: Record<string, string> = {
      primary:
        "bg-primary text-primary-foreground border border-border hover:opacity-95",
      secondary:
        "bg-secondary text-secondary-foreground border border-border hover:opacity-95",
      ghost: "bg-transparent text-foreground hover:bg-muted",
      outline: "bg-card text-foreground border border-border",
    };

    return (
      <button
        ref={ref}
        {...props}
        className={cn(
          base,
          variants[variant],
          loading && "opacity-60 cursor-auto",
          props.disabled && "opacity-60 hover:opacity-60 cursor-auto",
          className,
        )}
      >
        {loading ? <span className="loader mr-2 " /> : null}
        {children}
      </button>
    );
  },
);
Button.displayName = "Button";
