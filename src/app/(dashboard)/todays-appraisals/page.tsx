"use client";

import { AppraisalSubmissionPanel } from "@/components/appraisals/AppraisalSubmissionPanel";
import { AppraisalsTable } from "@/components/appraisals/AppraisalsTable";
import { DashboardPageLayout } from "@/components/layout/dashboard-page-layout";

export default function TodaysAppraisalsPage() {
  return (
    <DashboardPageLayout
      title="Today's Appraisals"
      description="Monitor and manage today's appraisals."
    >
      <AppraisalSubmissionPanel />

      <AppraisalsTable showDraftsOnly />
    </DashboardPageLayout>
  );
}
