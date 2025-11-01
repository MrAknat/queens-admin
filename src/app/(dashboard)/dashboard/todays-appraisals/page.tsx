import { AppraisalSubmissionPanel } from "@/components/reports/AppraisalSubmissionPanel";
import { ReportsTable } from "@/components/reports/ReportsTable";

export default function TodaysAppraisalsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          Today's Appraisals
        </h2>
        <p className="text-muted-foreground">
          Monitor and manage today's appraisals.
        </p>
      </div>

      <AppraisalSubmissionPanel />

      <ReportsTable showDraftsOnly />
    </div>
  );
}
