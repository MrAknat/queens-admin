import { Loader2 } from "lucide-react";
import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type LoaderSize = "sm" | "md" | "lg" | "xl";

export interface LoaderProps
  extends Omit<HTMLAttributes<SVGElement>, "children"> {
  size?: LoaderSize;
  className?: string;
}

export const Loader = ({ size = "md", className, ...props }: LoaderProps) => {
  return (
    <Loader2
      className={cn(
        "animate-spin",
        {
          "h-4 w-4": size === "sm",
          "h-6 w-6": size === "md",
          "h-8 w-8": size === "lg",
          "h-10 w-10": size === "xl",
        },
        className,
      )}
      {...props}
    />
  );
};

Loader.displayName = "Loader";
