"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import * as React from "react";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        type="button"
        className={cn(
          "inline-flex items-center justify-center rounded text-sm font-medium",
          "transition-all duration-200 ease-in-out",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          "border border-input bg-card hover:bg-accent hover:text-accent-foreground",
          "h-9 w-9",
          "shadow-sm hover:shadow-md",
        )}
      >
        <Sun className="h-4 w-4 opacity-60" />
        <span className="sr-only">Toggle theme</span>
      </button>
    );
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        "inline-flex items-center justify-center rounded text-sm font-medium",
        "transition-all duration-200 ease-in-out",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        "border border-input bg-card hover:bg-accent hover:text-accent-foreground",
        "h-9 w-9",
        "shadow-sm hover:shadow-md hover:scale-105 active:scale-95",
        "group",
      )}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      <div className="relative">
        {theme === "dark" ? (
          <Sun className="h-4 w-4 text-primary transition-all duration-200 group-hover:rotate-12 group-hover:scale-110" />
        ) : (
          <Moon className="h-4 w-4 text-primary transition-all duration-200 group-hover:-rotate-12 group-hover:scale-110" />
        )}
      </div>
      <span className="sr-only">
        {theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      </span>
    </button>
  );
}
