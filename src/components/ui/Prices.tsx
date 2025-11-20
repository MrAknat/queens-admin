import { Info } from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";
import type { MaxOfferConfiguration } from "../maxOfferConfigurator/MaxOfferConfiguratorForm";
import { SimpleTooltip } from "./SimpleTooltip";

export interface PricesProps {
  maxOffer?: number | null;
  maxOfferConfig?: MaxOfferConfiguration | null;
  estimatedRetail?: number | null;
  estimatedTrade?: number | null;
}

export const Prices = ({
  maxOffer,
  maxOfferConfig,
  estimatedRetail,
  estimatedTrade,
}: PricesProps) => {
  const configItems = [
    { label: "Reconditioning", key: "reconditioning" },
    { label: "Profit Margin", key: "profit_margin" },
    { label: "Lot fees", key: "lot" },
    { label: "Transport", key: "transport" },
    { label: "Admin fees", key: "admin" },
  ] as const;

  const maxOfferConfigContent = maxOfferConfig ? (
    <div className="flex flex-col gap-1 items-start">
      {configItems.map(({ label, key }) => {
        const percentage = maxOfferConfig[
          `${key}_percentage` as keyof MaxOfferConfiguration
        ] as number | undefined;
        const fixed = maxOfferConfig[
          `${key}_fixed` as keyof MaxOfferConfiguration
        ] as number | undefined;

        return (
          <div key={key}>
            {label}: {`${percentage || 0}% / ${formatCurrency(fixed || 0)}`}
          </div>
        );
      })}
    </div>
  ) : null;

  return (
    <div className="flex w-full">
      <StaticValue
        label="Max Offer"
        color="!border-badge-offer"
        value={maxOffer}
        renderTooltip={
          maxOfferConfig && (
            <div className="text-xs text-muted-foreground">
              {maxOfferConfigContent}
            </div>
          )
        }
      />
      <StaticValue
        label="Est. Trade"
        color="!border-badge-trade"
        value={estimatedTrade}
      />
      <StaticValue
        label="Est. Retail"
        color="!border-badge-retail"
        value={estimatedRetail}
      />
    </div>
  );
};

interface StaticValueProps {
  label: string;
  color: "!border-badge-offer" | "!border-badge-retail" | "!border-badge-trade";
  value?: number | null;
  renderTooltip?: React.ReactNode;
}

const StaticValue = ({
  label,
  color,
  value,
  renderTooltip,
}: StaticValueProps) => {
  return (
    <div className={cn("text-sm flex-1 flex flex-col border-b-4", color)}>
      <div className="flex items-center gap-1 min-h-5">
        <span className="text-xs">{label}</span>
        {renderTooltip ? (
          <SimpleTooltip
            trigger={<Info className="h-3 w-3 text-warning" />}
            content={renderTooltip}
            side="top"
            align="start"
            className="w-max"
          />
        ) : null}
      </div>
      <span>{value ? formatCurrency(value) : "N/A"}</span>
    </div>
  );
};
