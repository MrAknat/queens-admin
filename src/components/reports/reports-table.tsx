"use client";

import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useFetchReports } from "@/hooks/useFetchReports";

interface Vehicle {
  _id: string;
  modelId: string;
  vin: string;
  rego: string;
  odometer: number | null;
  description: string;
  createdAt: string;
  updatedAt: string;
}

interface Lead {
  _id: string;
  externalId: string;
  modelId: string;
  listedAt: string;
  removedAt: string;
  sellerType: string;
  state: string;
  driveAwayPrice: number;
  kms: number;
  listingSources: string[];
}

export interface Report {
  _id: string;
  vehicle: Vehicle;
  leads: Lead[];
  slope: number | null;
  intercept: number | null;
  lastOdometer: number | null;
  estimatedRetail: number | null;
  tradeInEstimate: number | null;
  isDraft: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ReportsTableProps {
  initialData?: Report[];
  complete?: boolean;
}

export function ReportsTable({
  initialData = [],
  complete = false,
}: ReportsTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredReports, setFilteredReports] = useState<Report[]>(initialData);

  const { reports, error, loading, fetchReports } = useFetchReports({
    initialData,
    complete,
  });

  useEffect(() => {
    if (!initialData.length) {
      fetchReports();
    }
  }, [initialData.length, fetchReports]);

  useEffect(() => {
    const filtered = reports.filter(
      (report) =>
        report.vehicle.description
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        report.vehicle.rego.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.vehicle.vin.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setFilteredReports(filtered);
  }, [reports, searchTerm]);

  const formatCurrency = (amount: number | null) => {
    if (amount === null) return "N/A";

    return new Intl.NumberFormat("en-AU", {
      style: "currency",
      currency: "AUD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-AU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const getStatusBadge = (isDraft: boolean) => {
    return (
      <Badge variant={isDraft ? "secondary" : "default"}>
        {isDraft ? "Draft" : "Complete"}
      </Badge>
    );
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Reports</h3>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Reports</h3>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              Error loading reports: {error}
            </p>
            <button
              type="button"
              onClick={fetchReports}
              className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
            >
              Try Again
            </button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">
            Reports ({filteredReports.length})
          </h3>
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search reports..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {filteredReports.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              {searchTerm
                ? "No reports match your search."
                : "No reports found."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vehicle</TableHead>
                  <TableHead>Registration</TableHead>
                  <TableHead>VIN</TableHead>
                  <TableHead>Total Leads</TableHead>
                  <TableHead>Estimated Retail</TableHead>
                  <TableHead>Trade-in Estimate</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReports.map((report) => (
                  <TableRow key={report._id} className="hover:bg-muted/50">
                    <TableCell>
                      <div className="font-medium">
                        {report.vehicle.description}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Model ID: {report.vehicle.modelId}
                      </div>
                    </TableCell>
                    <TableCell className="font-mono">
                      {report.vehicle.rego}
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      {report.vehicle.vin}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{report.leads.length}</Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">
                        {formatCurrency(report.estimatedRetail)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">
                        {formatCurrency(report.tradeInEstimate)}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(report.isDraft)}</TableCell>
                    <TableCell className="text-sm">
                      {formatDate(report.createdAt)}
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
