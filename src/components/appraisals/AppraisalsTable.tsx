"use client";

import { pdf } from "@react-pdf/renderer";
import { Search, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
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
import { useAppraisals, useDeleteAppraisal } from "@/hooks/useAppraisals";
import { useIsAdminModeActive } from "@/stores/admin-store";
import { Loader } from "../ui";
import { AppraisalPdf } from "./AppraisalPdf";
import { PriceCell } from "./PriceCell";

interface AppraisalsTableProps {
  showDraftsOnly?: boolean;
}

export function AppraisalsTable({
  showDraftsOnly = false,
}: AppraisalsTableProps) {
  const router = useRouter();
  const isAdminModeActive = useIsAdminModeActive();

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
    data: appraisalsResponse,
    error,
    isLoading,
    isRefetching,
    isError,
    refetch,
  } = useAppraisals({
    page,
    limit,
    search: debouncedSearchTerm,
    isDraft: showDraftsOnly ? "true" : "false",
  });

  const { mutateAsync: deleteAppraisal, isPending: isDeleting } =
    useDeleteAppraisal();

  const appraisals = appraisalsResponse?.data || [];

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

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Appraisals</h3>
          <Loader size="sm" />
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
          <h3 className="text-lg font-semibold">Appraisals</h3>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              Error loading appraisals: {error?.message || "Unknown error"}
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
          <h3 className="text-lg font-semibold">
            Appraisals ({appraisals.length})
          </h3>
          {isRefetching && <Loader size="sm" />}
        </div>
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search appraisals..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </CardHeader>
      <CardContent>
        {appraisals.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              {searchTerm
                ? "No appraisals match your search."
                : "No appraisals found."}
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
                    <TableHead>Manager's Offer</TableHead>
                    <TableHead>Status</TableHead>
                    {isAdminModeActive && (
                      <TableHead className="w-[50px]"></TableHead>
                    )}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {appraisals.map((appraisal) => (
                    <TableRow key={appraisal._id} className="hover:bg-muted/50">
                      <TableCell>
                        <div className="font-medium">
                          {appraisal.vehicle.description}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {`${appraisal.vehicle.rego}${
                            appraisal.lastOdometer
                              ? ` • ${appraisal.lastOdometer} km`
                              : ""
                          }`}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {appraisal.vehicle.vin}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">
                        <div className="font-medium">
                          {formatDate(appraisal.createdAt)}
                        </div>
                        <div className="text-sm">
                          {formatTime(appraisal.createdAt)}
                        </div>
                      </TableCell>
                      <PriceCell
                        value={appraisal.estimatedRetail}
                        className="bg-badge-retail text-primary-foreground hover:bg-badge-retail/80"
                      />
                      <PriceCell
                        value={appraisal.maxOffer}
                        className="bg-badge-offer text-primary-foreground hover:bg-badge-offer/80"
                      />
                      <PriceCell
                        value={appraisal.managerMaxOffer}
                        className="bg-badge-man-offer text-primary-foreground hover:bg-badge-man-offer/80"
                      />
                      <TableCell>
                        <Badge
                          variant={appraisal.isDraft ? "secondary" : "default"}
                          className="cursor-pointer"
                          onClick={async () => {
                            if (!appraisal.isDraft) {
                              const blob = await pdf(
                                <AppraisalPdf appraisal={appraisal} />,
                              ).toBlob();

                              const url = URL.createObjectURL(blob);

                              window.open(url, "_blank");
                            } else {
                              router.push(`todays-appraisals/${appraisal._id}`);
                            }
                          }}
                        >
                          {appraisal.isDraft ? "Draft" : "Drafted"}
                        </Badge>
                      </TableCell>
                      {isAdminModeActive && (
                        <TableCell>
                          <button
                            type="button"
                            disabled={isDeleting}
                            onClick={async (e) => {
                              e.stopPropagation();

                              if (
                                window.confirm(
                                  "Are you sure you want to delete this appraisal? This action cannot be undone.",
                                )
                              ) {
                                try {
                                  await deleteAppraisal(appraisal._id);
                                } catch (error) {
                                  console.error(
                                    "Failed to delete appraisal:",
                                    error,
                                  );
                                }
                              }
                            }}
                            className="p-2 text-muted-foreground hover:text-destructive transition-colors disabled:opacity-50 cursor-pointer"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination Controls */}
            {appraisalsResponse && appraisalsResponse.totalPages > 1 && (
              <div className="flex items-center justify-between px-2 py-4">
                <div className="text-sm text-muted-foreground">
                  Showing {(page - 1) * limit + 1} to{" "}
                  {Math.min(page * limit, appraisalsResponse.total)} of{" "}
                  {appraisalsResponse.total} results
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
                    Page {page} of {appraisalsResponse.totalPages}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setPage((p) =>
                        Math.min(appraisalsResponse.totalPages, p + 1),
                      )
                    }
                    disabled={page >= appraisalsResponse.totalPages}
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
