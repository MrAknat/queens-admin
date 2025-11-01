import { DashboardPageLayout } from "@/components/layout/dashboard-page-layout";
import { ReportsTable } from "@/components/reports/ReportsTable";

export default function PastAppraisalsPage() {
  return (
    <DashboardPageLayout
      title="Past Appraisals"
      description="Monitor and manage past appraisals."
    >
      <ReportsTable />
    </DashboardPageLayout>
  );
}
