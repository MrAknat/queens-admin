import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "default"
    | "secondary"
    | "accent"
    | "outline"
    | "ghost"
    | "link"
    | "success"
    | "warning"
    | "error"
    | "info";
  size?: "default" | "sm" | "lg" | "icon";
}

export function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        // Base styles with minimal design principles
        "inline-flex items-center justify-center rounded text-sm font-medium",
        "transition-all duration-200 ease-in-out",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        "border shadow-sm hover:shadow-md",
        // Variant styles
        {
          // Primary (Teal/Cyan)
          "bg-primary text-primary-foreground border-primary hover:bg-primary/90 hover:border-primary/90":
            variant === "default",
          // Secondary (Deep teal)
          "bg-secondary text-secondary-foreground border-secondary hover:bg-secondary/90 hover:border-secondary/90":
            variant === "secondary",
          // Accent (Light cyan)
          "bg-accent text-accent-foreground border-accent hover:bg-accent/80 hover:border-accent/80":
            variant === "accent",
          // Outline
          "border-border bg-card text-card-foreground hover:bg-accent hover:text-accent-foreground hover:border-accent":
            variant === "outline",
          // Ghost
          "border-transparent bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground hover:border-accent":
            variant === "ghost",
          // Link
          "border-transparent bg-transparent text-primary hover:text-primary/80 underline-offset-4 hover:underline shadow-none hover:shadow-none":
            variant === "link",
          // Semantic colors
          "bg-success text-success-foreground border-success hover:bg-success/90 hover:border-success/90":
            variant === "success",
          "bg-warning text-warning-foreground border-warning hover:bg-warning/90 hover:border-warning/90":
            variant === "warning",
          "bg-error text-error-foreground border-error hover:bg-error/90 hover:border-error/90":
            variant === "error",
          "bg-info text-info-foreground border-info hover:bg-info/90 hover:border-info/90":
            variant === "info",
        },
        // Size styles with minimal border radius
        {
          "h-9 px-4 py-2": size === "default",
          "h-8 px-3 text-xs": size === "sm",
          "h-10 px-6 text-base": size === "lg",
          "h-9 w-9": size === "icon",
        },
        className,
      )}
      {...props}
    />
  );
}
