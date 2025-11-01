import { AppraisalsTable } from "@/components/appraisals/AppraisalsTable";
import { DashboardPageLayout } from "@/components/layout/dashboard-page-layout";

export default function PastAppraisalsPage() {
  return (
    <DashboardPageLayout
      title="Past Appraisals"
      description="Monitor and manage past appraisals."
    >
      <AppraisalsTable />
    </DashboardPageLayout>
  );
}
