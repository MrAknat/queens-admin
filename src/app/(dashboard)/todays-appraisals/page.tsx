"use client";

import { DashboardPageLayout } from "@/components/layout/dashboard-page-layout";
import { AppraisalSubmissionPanel } from "@/components/reports/AppraisalSubmissionPanel";
import { ReportsTable } from "@/components/reports/ReportsTable";
import { AdminSection } from "@/components/ui";

export default function TodaysAppraisalsPage() {
  return (
    <DashboardPageLayout
      title="Today's Appraisals"
      description="Monitor and manage today's appraisals."
    >
      <AppraisalSubmissionPanel />

      <ReportsTable showDraftsOnly />
    </DashboardPageLayout>
  );
}
