import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "w-full text-sm px-3 py-2 border rounded-md bg-background resize-none transition-colors",
          "focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
          "disabled:cursor-not-allowed disabled:opacity-50",
          error ? "border-red-500" : "border-input",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);

Textarea.displayName = "Textarea";
