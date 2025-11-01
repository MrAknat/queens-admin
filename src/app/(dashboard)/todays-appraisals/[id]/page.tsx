"use client";

import { useParams, useRouter } from "next/navigation";
import { DashboardPageLayout } from "@/components/layout/dashboard-page-layout";
import { Loader } from "@/components/ui";
import type { BreadcrumbItem } from "@/components/ui/Breadcrumbs";
import { useAppraisal } from "@/hooks/useAppraisals";

export default function TodaysAppraisalEditPage() {
  const params = useParams();
  const router = useRouter();

  const appraisalId = params.id as string;

  const {
    data: appraisal,
    isLoading,
    isRefetching,
  } = useAppraisal(appraisalId);

  // Custom breadcrumbs for this detail page
  const breadcrumbs: BreadcrumbItem[] = [
    {
      label: "Today's Appraisals",
      href: "/todays-appraisals",
    },
    {
      label: `${appraisal?.vehicle.description || ""}`,
      isCurrentPage: true,
      ...(isRefetching || isLoading ? { icon: Loader } : {}),
    },
  ];

  return (
    <DashboardPageLayout
      title={`Draft Appraisal`}
      description="Modify the details of the selected appraisal."
      breadcrumbs={breadcrumbs}
    >
      <span>Edit form for appraisal ID: {appraisalId}</span>
    </DashboardPageLayout>
  );
}
