import { formatCurrency } from "@/lib/utils";
import { AvgIcon, TableCell } from "../ui";

interface EstimatedRetailCellProps {
  value: number | null;
  fallbackValue?: number | null;
}

export const EstimatedRetailCell = ({
  value,
  fallbackValue,
}: EstimatedRetailCellProps) => {
  if (value != null) {
    return (
      <TableCell>
        <span className="font-medium">{formatCurrency(value)}</span>
      </TableCell>
    );
  }

  if (fallbackValue != null) {
    return (
      <TableCell>
        <div
          className="flex items-center space-x-1"
          title="Average market data estimate"
        >
          <span className="font-medium leading-[100%] text-muted-foreground">
            {formatCurrency(fallbackValue)}
          </span>
          <AvgIcon className="flex-shrink-0 text-warning" height={20} />
        </div>
      </TableCell>
    );
  }

  return (
    <TableCell>
      <span className="font-medium text-muted-foreground">N/A</span>
    </TableCell>
  );
};
