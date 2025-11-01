"use client";

import { useParams } from "next/navigation";
import { DashboardPageLayout } from "@/components/layout/dashboard-page-layout";
import type { BreadcrumbItem } from "@/components/ui/Breadcrumbs";

export default function TodaysAppraisalEditPage() {
  const params = useParams();
  const appraisalId = params.id as string;

  // Custom breadcrumbs for this detail page
  const breadcrumbs: BreadcrumbItem[] = [
    {
      label: "Today's Appraisals",
      href: "/todays-appraisals",
    },
    {
      label: `Appraisal #${appraisalId}`,
      isCurrentPage: true,
    },
  ];

  return (
    <DashboardPageLayout
      title={`Edit Appraisal #${appraisalId}`}
      description="Modify the details of the selected appraisal."
      breadcrumbs={breadcrumbs}
    >
      {/* Placeholder for Today's Appraisal Edit Form */}
      <div className="rounded-lg border bg-card p-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Appraisal Details</h3>
          <p className="text-muted-foreground">
            Today's Appraisal Edit Form goes here. This would include fields
            for:
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-4">
            <li>Vehicle Information</li>
            <li>Appraisal Values</li>
            <li>Assessment Notes</li>
            <li>Market Conditions</li>
            <li>Final Recommendations</li>
          </ul>
        </div>
      </div>
    </DashboardPageLayout>
  );
}
