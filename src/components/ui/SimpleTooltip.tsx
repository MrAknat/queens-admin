"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface SimpleTooltipProps {
  trigger: React.ReactNode;
  content: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
  className?: string;
  defaultOpen?: boolean;
}

export function SimpleTooltip({
  trigger,
  content,
  side = "top",
  align = "center",
  className,
  defaultOpen = false,
}: SimpleTooltipProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const getPositionClasses = () => {
    switch (side) {
      case "top":
        return "bottom-full mb-2";
      case "bottom":
        return "top-full mt-2";
      case "left":
        return "right-full mr-2";
      case "right":
        return "left-full ml-2";
      default:
        return "bottom-full mb-2";
    }
  };

  const getAlignClasses = () => {
    if (side === "left" || side === "right") {
      switch (align) {
        case "start":
          return "top-0";
        case "center":
          return "top-1/2 -translate-y-1/2";
        case "end":
          return "bottom-0";
        default:
          return "top-1/2 -translate-y-1/2";
      }
    } else {
      switch (align) {
        case "start":
          return "left-0";
        case "center":
          return "left-1/2 -translate-x-1/2";
        case "end":
          return "right-0";
        default:
          return "left-1/2 -translate-x-1/2";
      }
    }
  };

  return (
    <div className="relative inline-block" ref={containerRef}>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="cursor-pointer"
      >
        {trigger}
      </button>
      {isOpen && (
        <button
          type="button"
          className={cn(
            "absolute z-50 w-fit rounded-md border border-border bg-card p-3 text-card-foreground shadow-md outline-none animate-in fade-in-0 zoom-in-95",
            getPositionClasses(),
            getAlignClasses(),
            className,
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {content}
        </button>
      )}
    </div>
  );
}
