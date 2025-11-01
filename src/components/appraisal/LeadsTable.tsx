"use client";

import { ExternalLink, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { LeadData } from "./types";

interface LeadsTableProps {
  leads: LeadData[];
}

export function LeadsTable({ leads }: LeadsTableProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-AU", {
      style: "currency",
      currency: "AUD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-AU", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
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
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            <h3 className="font-medium">Market Leads ({leads.length})</h3>
          </div>
          <div className="text-sm text-gray-500">
            Avg Price:{" "}
            {formatCurrency(
              leads.reduce((sum, lead) => sum + lead.driveAwayPrice, 0) /
                leads.length,
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>External ID</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Kilometers</TableHead>
                <TableHead>Seller Type</TableHead>
                <TableHead>State</TableHead>
                <TableHead>Listed Date</TableHead>
                <TableHead>Sources</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.map((lead) => (
                <TableRow key={lead._id} className="hover:bg-muted/50">
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm">
                        {lead.externalId}
                      </span>
                      <ExternalLink className="h-3 w-3 text-gray-400" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">
                      {formatCurrency(lead.driveAwayPrice)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-mono">{formatKms(lead.kms)} km</span>
                  </TableCell>
                  <TableCell>{getSellerTypeBadge(lead.sellerType)}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{lead.state}</Badge>
                  </TableCell>
                  <TableCell className="text-sm">
                    {formatDate(lead.listedAt)}
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
                  <TableCell>
                    <Badge
                      variant={lead.removedAt ? "destructive" : "default"}
                      className="text-xs"
                    >
                      {lead.removedAt ? "Removed" : "Active"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Summary statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="text-center">
            <div className="text-lg font-semibold text-primary">
              {formatCurrency(Math.min(...leads.map((l) => l.driveAwayPrice)))}
            </div>
            <div className="text-sm text-gray-600">Lowest Price</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-primary">
              {formatCurrency(Math.max(...leads.map((l) => l.driveAwayPrice)))}
            </div>
            <div className="text-sm text-gray-600">Highest Price</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-primary">
              {formatKms(
                Math.round(
                  leads.reduce((sum, lead) => sum + lead.kms, 0) / leads.length,
                ),
              )}{" "}
              km
            </div>
            <div className="text-sm text-gray-600">Avg Kilometers</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-primary">
              {leads.filter((l) => !l.removedAt).length}
            </div>
            <div className="text-sm text-gray-600">Active Listings</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
