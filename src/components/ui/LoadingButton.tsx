import type { LucideIcon } from "lucide-react";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Button, type ButtonProps } from "./button";
import { Loader } from "./loader";

interface LoadingButtonProps extends ButtonProps {
  loading?: boolean;
  loadingText?: string;
  icon?: LucideIcon;
  iconClassName?: string;
  label: string;
}

export const LoadingButton = forwardRef<HTMLButtonElement, LoadingButtonProps>(
  (
    {
      label,
      loading = false,
      loadingText = "Loading...",
      icon: Icon,
      iconClassName = "h-4 w-4",
      className,
      disabled,
      ...props
    },
    ref,
  ) => {
    const buttonLabel = loading ? loadingText || label : label;

    return (
      <Button
        ref={ref}
        disabled={disabled || loading}
        className={cn("flex items-center gap-2 min-w-[140px]", className)}
        {...props}
      >
        {loading ? (
          <Loader size="sm" className="text-primary-foreground" />
        ) : (
          Icon && <Icon className={iconClassName} />
        )}
        {buttonLabel}
      </Button>
    );
  },
);

LoadingButton.displayName = "LoadingButton";
