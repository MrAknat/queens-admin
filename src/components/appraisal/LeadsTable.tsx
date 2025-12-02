"use client";

import { TrendingUp } from "lucide-react";
import moment from "moment";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Checkbox } from "@/components/ui/checkbox";
import { Select } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AUSTRALIAN_STATES,
  DAYS_FILTER_OPTIONS,
  SELLER_TYPE_OPTIONS,
} from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { LeadData } from "./types";

interface LeadsTableProps {
  leads: LeadData[];
}

export function LeadsTable({ leads }: LeadsTableProps) {
  const [showActive, setShowActive] = useState(true);
  const [showDelisted, setShowDelisted] = useState(true);
  const [selectedDays, setSelectedDays] = useState<number>(60);
  const [selectedSellerType, setSelectedSellerType] = useState<string>("All");
  const [selectedState, setSelectedState] = useState<string>("All States");

  const handleActiveChange = (checked: boolean) => {
    if (!checked && !showDelisted) {
      setShowDelisted(true);
      setShowActive(false);
    } else {
      setShowActive(checked);
    }
  };

  const handleDelistedChange = (checked: boolean) => {
    if (!checked && !showActive) {
      setShowActive(true);
      setShowDelisted(false);
    } else {
      setShowDelisted(checked);
    }
  };

  const filteredLeads = leads.filter((lead) => {
    const isDelisted = !!lead.removedAt;
    const isActive = !lead.removedAt;

    let passesActiveFilter = false;
    if (showActive && showDelisted) {
      passesActiveFilter = true;
    } else if (showActive && isActive) {
      passesActiveFilter = true;
    } else if (showDelisted && isDelisted) {
      passesActiveFilter = true;
    }

    if (!passesActiveFilter) {
      return false;
    }

    if (lead.removedAt) {
      const daysSinceRemoved = moment().diff(moment(lead.removedAt), "days");
      if (daysSinceRemoved > selectedDays) {
        return false;
      }
    }

    if (selectedSellerType !== "All") {
      if (selectedSellerType === "P/D") {
        if (
          lead.sellerType.toLowerCase() !== "private" &&
          lead.sellerType.toLowerCase() !== "dealer"
        ) {
          return false;
        }
      } else if (
        lead.sellerType.toLowerCase() !== selectedSellerType.toLowerCase()
      ) {
        return false;
      }
    }

    if (selectedState !== "All States" && lead.state !== selectedState) {
      return false;
    }

    return true;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-AU", {
      style: "currency",
      currency: "AUD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatKms = (kms: number) => {
    return new Intl.NumberFormat("en-AU").format(kms);
  };

  const getSellerTypeBadge = (sellerType: string) => {
    const variants: Record<
      string,
      "default" | "secondary" | "destructive" | "outline"
    > = {
      dealer: "default",
      private: "secondary",
      auction: "outline",
    };

    return (
      <Badge variant={variants[sellerType.toLowerCase()] || "outline"}>
        {sellerType}
      </Badge>
    );
  };

  if (!leads || leads.length === 0) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            <h3 className="font-medium">Market Leads</h3>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center h-32 text-gray-500">
            <TrendingUp className="h-8 w-8 mb-2 text-gray-400" />
            <p>No market leads available</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex w-full items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            <h3 className="font-medium">
              Market Leads ({filteredLeads.length})
            </h3>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <Select
                value={selectedDays.toString()}
                onChange={(e) => setSelectedDays(Number(e.target.value))}
                options={DAYS_FILTER_OPTIONS.map((days) => ({
                  value: days.toString(),
                  label: `${days} days`,
                }))}
                className="w-auto min-w-[120px] bg-card"
              />
              <Select
                value={selectedSellerType}
                onChange={(e) => setSelectedSellerType(e.target.value)}
                options={SELLER_TYPE_OPTIONS.map((type) => ({
                  value: type,
                  label: type,
                }))}
                className="w-auto min-w-[100px] bg-card"
              />
              <Select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                options={AUSTRALIAN_STATES.map((state) => ({
                  value: state,
                  label: state,
                }))}
                className="w-auto min-w-[130px] bg-card"
              />
            </div>
            <div className="flex items-center gap-3">
              <Checkbox
                label="Active"
                checked={showActive}
                onChange={(e) => handleActiveChange(e.target.checked)}
              />
              <Checkbox
                label="Delisted"
                checked={showDelisted}
                onChange={(e) => handleDelistedChange(e.target.checked)}
              />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {filteredLeads.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 text-gray-500">
            <TrendingUp className="h-8 w-8 mb-2 text-gray-400" />
            <p>No market leads match the selected filters</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Drive Away</TableHead>
                  <TableHead>Kms</TableHead>
                  <TableHead>Color</TableHead>
                  <TableHead>Age</TableHead>
                  <TableHead>Seller Type</TableHead>
                  <TableHead>State</TableHead>
                  <TableHead>Sources</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLeads.map((lead, index) => (
                  <TableRow
                    key={lead._id}
                    className={cn(
                      "hover:bg-muted-foreground/5",
                      lead.removedAt && "bg-warning/10 hover:bg-warning/20",
                    )}
                  >
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{index + 1}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">
                        {formatCurrency(lead.driveAwayPrice)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="whitespace-nowrap">
                        {formatKms(lead.kms)} km
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{lead.color}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">
                        {lead.removedAt
                          ? `${moment(lead.removedAt).diff(
                              lead.listedAt,
                              "days",
                            )}d`
                          : `${moment().diff(lead.listedAt, "days")}d`}
                      </span>
                    </TableCell>
                    <TableCell>{getSellerTypeBadge(lead.sellerType)}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{lead.state}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {lead.listingSources.map((source, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="text-xs"
                          >
                            {source}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
