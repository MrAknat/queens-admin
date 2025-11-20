import { formatCurrency } from "@/lib/utils";

interface PricesProps {
  maxOffer?: number | null;
  estimatedRetail?: number | null;
  estimatedTrade?: number | null;
}

export const Prices = ({
  maxOffer,
  estimatedRetail,
  estimatedTrade,
}: PricesProps) => {
  return (
    <div className="flex w-full">
      <StaticValue
        label="Max Offer"
        color="!border-badge-offer"
        value={maxOffer}
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
}

const StaticValue = ({ label, color, value }: StaticValueProps) => (
  <div className={`text-sm flex-1 flex flex-col border-b-4 ${color}`}>
    <span className="text-xs">{label}</span>
    <span>{value ? formatCurrency(value) : "N/A"}</span>
  </div>
);
