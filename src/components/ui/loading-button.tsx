import type { LucideIcon } from "lucide-react";
import { type ButtonHTMLAttributes, forwardRef } from "react";
import { Button } from "./button";
import { Loader } from "./loader";

interface LoadingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
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
        className={`flex items-center gap-2 min-w-[140px] ${className || ""}`}
        {...props}
      >
        <>
          {loading ? (
            <Loader size="sm" className="text-primary-foreground" />
          ) : (
            Icon && <Icon className={iconClassName} />
          )}
          {buttonLabel}
        </>
      </Button>
    );
  },
);

LoadingButton.displayName = "LoadingButton";
