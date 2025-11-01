"use client";

import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
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
import { useReports } from "@/hooks/use-reports";
import { Loader } from "../ui";

interface ReportsTableProps {
  showDraftsOnly?: boolean;
}

export function ReportsTable({ showDraftsOnly = false }: ReportsTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setPage(1);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const {
    data: reportsResponse,
    error,
    isLoading,
    isRefetching,
    isError,
    refetch,
  } = useReports({
    page,
    limit,
    search: debouncedSearchTerm,
    isDraft: showDraftsOnly ? "true" : "false",
  });

  const reports = reportsResponse?.data || [];

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

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("en-AU", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadge = (isDraft: boolean) => {
    return (
      <Badge
        variant={isDraft ? "secondary" : "default"}
        className="cursor-pointer"
      >
        {isDraft ? "Draft" : "Drafted"}
      </Badge>
    );
  };

  if (isLoading) {
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

  if (isError) {
    return (
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Reports</h3>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              Error loading reports: {error?.message || "Unknown error"}
            </p>
            <button
              type="button"
              onClick={() => refetch()}
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
      <CardHeader className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h3 className="text-lg font-semibold">Reports ({reports.length})</h3>
          {isRefetching && <Loader size="sm" />}
        </div>
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search reports..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </CardHeader>
      <CardContent>
        {reports.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              {searchTerm
                ? "No reports match your search."
                : "No reports found."}
            </p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Vehicle</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Est. Retail</TableHead>
                    <TableHead>Max Offer</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reports.map((report) => (
                    <TableRow key={report._id} className="hover:bg-muted/50">
                      <TableCell>
                        <div className="font-medium">
                          {report.vehicle.description}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {`${report.vehicle.rego}${report.lastOdometer ? ` • ${report.lastOdometer} km` : ""}`}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {report.vehicle.vin}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">
                        <div className="font-medium">
                          {formatDate(report.createdAt)}
                        </div>
                        <div className="text-sm">
                          {formatTime(report.createdAt)}
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
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination Controls */}
            {reportsResponse && reportsResponse.totalPages > 1 && (
              <div className="flex items-center justify-between px-2 py-4">
                <div className="text-sm text-muted-foreground">
                  Showing {(page - 1) * limit + 1} to{" "}
                  {Math.min(page * limit, reportsResponse.total)} of{" "}
                  {reportsResponse.total} results
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page <= 1}
                    className="px-3 py-1 text-sm border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted"
                  >
                    Previous
                  </button>
                  <span className="text-sm">
                    Page {page} of {reportsResponse.totalPages}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setPage((p) =>
                        Math.min(reportsResponse.totalPages, p + 1),
                      )
                    }
                    disabled={page >= reportsResponse.totalPages}
                    className="px-3 py-1 text-sm border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
