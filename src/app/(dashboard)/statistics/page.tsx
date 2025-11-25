"use client";

import { DashboardPageLayout } from "@/components/layout/dashboard-page-layout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useApiUsageStats } from "@/hooks/useApiUsage";

export default function StatisticsPage() {
  const { data, isLoading } = useApiUsageStats();

  return (
    <DashboardPageLayout
      title="Statistics"
      description="Overview of third-party API usage, key performance indicators and metrics."
    >
      <div className="space-y-8">
        <div>
          <h2 className="text-lg font-semibold mb-4">AutoGrab API Usage</h2>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Endpoint</TableHead>
                  <TableHead className="text-right">Today</TableHead>
                  <TableHead className="text-right">Week</TableHead>
                  <TableHead className="text-right">Month</TableHead>
                  <TableHead className="text-right">Year</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : data?.stats.length ? (
                  data.stats.map((stat) => (
                    <TableRow key={stat.endpoint}>
                      <TableCell className="font-medium">
                        {stat.endpoint}
                      </TableCell>
                      <TableCell className="text-right">{stat.today}</TableCell>
                      <TableCell className="text-right">{stat.week}</TableCell>
                      <TableCell className="text-right">{stat.month}</TableCell>
                      <TableCell className="text-right">{stat.year}</TableCell>
                      <TableCell className="text-right">{stat.total}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center">
                      No data available
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </DashboardPageLayout>
  );
}
