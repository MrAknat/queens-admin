import { AppraisalSubmissionPanel } from "@/components/reports/AppraisalSubmissionPanel";
import { ReportsTable } from "@/components/reports/reports-table";

export default function PendingEvaluationsPage() {
  const isAdmin = true; // TODO: Replace with actual admin check logic

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

      {isAdmin && <AppraisalSubmissionPanel />}

      <ReportsTable showDraftsOnly />
    </div>
  );
}
