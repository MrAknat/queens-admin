import { cn } from "@/lib/utils";

interface AvgIconProps {
  className?: string;
  height?: number;
  textColor?: string;
  borderColor?: string;
}

export function AvgIcon({ className, height = 16 }: AvgIconProps) {
  const width = (height * 32) / 20;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 32 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("inline-block", className)}
      role="img"
      aria-label="Average Icon"
    >
      <rect
        x="1"
        y="1"
        width="30"
        height="18"
        rx="4"
        ry="4"
        // stroke={borderColor}
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <text
        x="16"
        y="14"
        textAnchor="middle"
        // fill={textColor}
        fill="currentColor"
        fontSize="12"
        fontWeight="600"
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        AVG
      </text>
    </svg>
  );
}
