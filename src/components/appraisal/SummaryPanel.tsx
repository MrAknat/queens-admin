"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { formatCurrency } from "@/lib/utils";

interface SummaryPanelProps {
  date: string;
  odometer: number;
  estimatedRetail: number;
  managersMaxOffer: number;
}

export function SummaryPanel({
  date,
  odometer,
  estimatedRetail,
  managersMaxOffer,
}: SummaryPanelProps) {
  return (
    <Card className="block self-center xl:self-start xl:sticky top-22 space-y-6 h-fit w-full xl:min-w-70 xl:w-70">
      <CardHeader>
        <h3 className="font-semibold">Pricing & Offer</h3>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex flex-row gap-2 justify-between">
            <h4 className="text-sm font-medium mb-4">Appraisal Date:</h4>
            <p className="text-sm font-medium mb-4">{date}</p>
          </div>
          <div className="flex flex-row gap-2 justify-between">
            <h4 className="text-sm font-medium mb-4">Odometer:</h4>
            <p className="text-sm font-medium mb-4">{odometer} km</p>
          </div>
          <div className="flex flex-row gap-2 justify-between">
            <h4 className="text-sm font-medium mb-4">Estimated Retail:</h4>
            <p className="text-sm font-medium mb-4">
              {formatCurrency(estimatedRetail)}
            </p>
          </div>
          <div className="flex flex-row gap-2 justify-between">
            <h4 className="text-sm font-medium mb-4">Manager's Offer:</h4>
            <p className="text-sm font-medium mb-4">
              {formatCurrency(managersMaxOffer)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
