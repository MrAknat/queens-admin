"use client";

import { Check, ChevronDown, Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import * as React from "react";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close dropdown on escape key
  React.useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  if (!mounted) {
    return (
      <div className="relative">
        <button
          type="button"
          className={cn(
            "inline-flex items-center justify-center gap-2 rounded text-sm font-medium",
            "transition-all duration-200 ease-in-out",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            "disabled:pointer-events-none disabled:opacity-50",
            "border border-input bg-card hover:bg-accent hover:text-accent-foreground",
            "h-9 px-3",
            "shadow-sm hover:shadow-md",
          )}
        >
          <Sun className="h-4 w-4 opacity-60" />
          <ChevronDown className="h-3 w-3 opacity-60" />
          <span className="sr-only">Toggle theme</span>
        </button>
      </div>
    );
  }

  const getCurrentIcon = () => {
    if (theme === "system") {
      return systemTheme === "dark" ? Moon : Sun;
    }
    return theme === "dark" ? Moon : Sun;
  };

  const getCurrentLabel = () => {
    if (theme === "system") {
      return `System (${systemTheme})`;
    }
    return theme === "dark" ? "Dark" : "Light";
  };

  const Icon = getCurrentIcon();

  const themeOptions = [
    { value: "light", label: "Light", icon: Sun },
    { value: "dark", label: "Dark", icon: Moon },
    { value: "system", label: "System", icon: Monitor },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded text-sm font-medium",
          "transition-all duration-200 ease-in-out",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          "border border-input bg-card hover:bg-accent hover:text-accent-foreground",
          "h-9 px-3",
          "shadow-sm hover:shadow-md hover:scale-105 active:scale-95",
          "group",
          isOpen && "bg-accent text-accent-foreground",
        )}
        aria-label="Theme selector"
        aria-expanded={isOpen}
        aria-haspopup="menu"
      >
        <Icon className="h-4 w-4 text-primary transition-all duration-200 group-hover:scale-110" />
        <span className="hidden sm:inline-block text-foreground">
          {getCurrentLabel()}
        </span>
        <ChevronDown
          className={cn(
            "h-3 w-3 text-muted-foreground transition-transform duration-200",
            isOpen && "rotate-180",
          )}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className={cn(
            "absolute right-0 mt-2 w-48 rounded-md border bg-card shadow-lg z-50",
            "animate-in fade-in-0 zoom-in-95 duration-200",
            "border-border shadow-md",
          )}
        >
          <div className="py-1" role="menu" aria-orientation="vertical">
            {themeOptions.map((option) => {
              const OptionIcon = option.icon;
              const isActive = theme === option.value;

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    setTheme(option.value);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "w-full flex items-center justify-between px-4 py-2 text-sm",
                    "transition-colors duration-150",
                    "hover:bg-accent hover:text-accent-foreground",
                    "focus:bg-accent focus:text-accent-foreground focus:outline-none",
                    isActive && "bg-accent/50 text-accent-foreground",
                  )}
                  role="menuitem"
                  aria-label={`Switch to ${option.label.toLowerCase()} theme`}
                >
                  <div className="flex items-center gap-3">
                    <OptionIcon className="h-4 w-4" />
                    <span>{option.label}</span>
                    {option.value === "system" && (
                      <span className="text-xs text-muted-foreground">
                        ({systemTheme})
                      </span>
                    )}
                  </div>
                  {isActive && <Check className="h-4 w-4 text-primary" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
