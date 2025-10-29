import { AppraisalSubmissionPanel } from "@/components/reports/AppraisalSubmissionPanel";
import { ReportsTable } from "@/components/reports/ReportsTable";

export default function PendingEvaluationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          Pending Evaluations
        </h2>
        <p className="text-muted-foreground">
          Monitor and manage pending vehicle evaluation reports.
        </p>
      </div>

      <AppraisalSubmissionPanel />

      <ReportsTable showDraftsOnly />
    </div>
  );
}
