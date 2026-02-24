"use client";

import { ArrowDown, ArrowUp, ArrowUpDown, TrendingUp } from "lucide-react";
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
import { cn, formatCurrency } from "@/lib/utils";
import type { LeadData } from "./types";

interface LeadsTableProps {
  leads: LeadData[];
}

type SortColumn =
  | "released"
  | "priceEgc"
  | "driveAway"
  | "kms"
  | "color"
  | "age"
  | "delisted"
  | "sellerType"
  | "state";
type SortDirection = "asc" | "desc";

export function LeadsTable({ leads }: LeadsTableProps) {
  const [showActive, setShowActive] = useState(true);
  const [showDelisted, setShowDelisted] = useState(true);
  const [selectedDays, setSelectedDays] = useState<number>(60);
  const [selectedSellerType, setSelectedSellerType] = useState<string>("All");
  const [selectedState, setSelectedState] = useState<string>("All States");
  const [sortColumn, setSortColumn] = useState<SortColumn>("priceEgc");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

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

  const handleSort = (column: SortColumn) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("desc");
    }
  };

  const SortIcon = ({ column }: { column: SortColumn }) => {
    if (sortColumn !== column) {
      return <ArrowUpDown className="h-3 w-3 min-w-3 min-h-3 opacity-30" />;
    }

    return sortDirection === "asc" ? (
      <ArrowUp className="h-3 w-3 min-w-3 min-h-3" />
    ) : (
      <ArrowDown className="h-3 w-3 min-w-3 min-h-3" />
    );
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

  const sortedLeads = [...filteredLeads].sort((a, b) => {
    const multiplier = sortDirection === "asc" ? 1 : -1;

    switch (sortColumn) {
      case "released":
        return multiplier * moment(a.listedAt).diff(moment(b.listedAt));
      case "priceEgc":
        return (
          multiplier * (a.priceBeforeGovtCharges - b.priceBeforeGovtCharges)
        );
      case "driveAway":
        return multiplier * (a.driveAwayPrice - b.driveAwayPrice);
      case "kms":
        return multiplier * (a.kms - b.kms);
      case "color":
        return multiplier * a.color.localeCompare(b.color);
      case "age": {
        const ageA = a.removedAt
          ? moment(a.removedAt).diff(a.listedAt, "days")
          : moment().diff(a.listedAt, "days");
        const ageB = b.removedAt
          ? moment(b.removedAt).diff(b.listedAt, "days")
          : moment().diff(b.listedAt, "days");
        return multiplier * (ageA - ageB);
      }
      case "delisted": {
        const delistedA = a.removedAt ? moment(a.removedAt).valueOf() : 0;
        const delistedB = b.removedAt ? moment(b.removedAt).valueOf() : 0;
        return multiplier * (delistedA - delistedB);
      }
      case "sellerType":
        return multiplier * a.sellerType.localeCompare(b.sellerType);
      case "state":
        return multiplier * a.state.localeCompare(b.state);
      default:
        return 0;
    }
  });

  const formatKms = (kms: number) => {
    return new Intl.NumberFormat("en-AU").format(kms);
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
            <h3 className="font-medium">Market Leads ({sortedLeads.length})</h3>
          </div>
          <div className="flex flex-col xl:flex-row xl:items-center gap-6">
            <div className="flex flex-col xl:flex-row xl:items-center gap-3">
              <Select
                value={selectedDays.toString()}
                onChange={(e) => setSelectedDays(Number(e.target.value))}
                options={DAYS_FILTER_OPTIONS.map((days) => ({
                  value: days.toString(),
                  label: `${days} days`,
                }))}
                className="w-auto xl:min-w-[120px] bg-card"
              />
              <Select
                value={selectedSellerType}
                onChange={(e) => setSelectedSellerType(e.target.value)}
                options={SELLER_TYPE_OPTIONS.map((type) => ({
                  value: type,
                  label: type,
                }))}
                className="w-auto xl:min-w-[100px] bg-card"
              />
              <Select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                options={[...AUSTRALIAN_STATES]}
                className="w-auto xl:min-w-[130px] bg-card"
              />
            </div>
            <div className="flex flex-col xl:flex-row xl:items-center gap-3">
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
        {sortedLeads.length === 0 ? (
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
                  <TableHead
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => handleSort("released")}
                  >
                    <div className="flex items-center gap-1">
                      Released <SortIcon column="released" />
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => handleSort("priceEgc")}
                  >
                    <div className="flex items-center gap-1">
                      Price EGC <SortIcon column="priceEgc" />
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => handleSort("driveAway")}
                  >
                    <div className="flex items-center gap-1">
                      Drive Away <SortIcon column="driveAway" />
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => handleSort("kms")}
                  >
                    <div className="flex items-center gap-1">
                      Kms <SortIcon column="kms" />
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => handleSort("color")}
                  >
                    <div className="flex items-center gap-1">
                      Color <SortIcon column="color" />
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => handleSort("age")}
                  >
                    <div className="flex items-center gap-1">
                      Age <SortIcon column="age" />
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => handleSort("delisted")}
                  >
                    <div className="flex items-center gap-1">
                      Delisted <SortIcon column="delisted" />
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => handleSort("sellerType")}
                  >
                    <div className="flex items-center gap-1">
                      S <SortIcon column="sellerType" />
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => handleSort("state")}
                  >
                    <div className="flex items-center gap-1">
                      State <SortIcon column="state" />
                    </div>
                  </TableHead>
                  <TableHead>Sources</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedLeads.map((lead, index) => (
                  <TableRow
                    key={lead._id}
                    className={cn(
                      "hover:bg-muted-foreground/5",
                      lead.removedAt && "bg-warning/10 hover:bg-warning/20",
                    )}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell className="whitespace-nowrap">
                      <span className="text-sm">
                        {moment(lead.listedAt).format("MMM YYYY")}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">
                        {formatCurrency(lead.priceBeforeGovtCharges)}
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
                    <TableCell className="whitespace-nowrap">
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
                    <TableCell>
                      <span className="text-sm">
                        {lead.removedAt
                          ? moment(lead.removedAt).format("DD/MM/YYYY")
                          : "-"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm font-medium">
                        {lead.sellerType.charAt(0).toUpperCase()}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{lead.state}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-nowrap gap-1">
                        {lead.listingSources
                          .slice(0, 3)
                          .map((source, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="text-xs cursor-default"
                              title={source}
                            >
                              {source.slice(0, 3).toUpperCase()}
                            </Badge>
                          ))}
                        {lead.listingSources.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{lead.listingSources.length - 3}
                          </Badge>
                        )}
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
