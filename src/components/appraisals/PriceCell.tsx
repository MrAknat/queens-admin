import { cn, formatCurrency } from "@/lib/utils";
import { Badge, TableCell } from "../ui";

interface PriceCellProps {
  value: number | null;
  className?: string;
}

export const PriceCell = ({ value, className }: PriceCellProps) => {
  if (value != null) {
    return (
      <TableCell>
        <Badge className={cn("text-xs !text-background", className)}>
          {formatCurrency(value)}
        </Badge>
      </TableCell>
    );
  }

  return (
    <TableCell>
      <span className="font-medium text-muted-foreground">N/A</span>
    </TableCell>
  );
};
