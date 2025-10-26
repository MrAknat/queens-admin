import { ReportsTable } from "@/components/reports/ReportsTable";

export default function CompletedEvaluationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">
          Complete Evaluations
        </h2>
        <p className="text-muted-foreground">
          Monitor and manage coplete vehicle evaluation reports.
        </p>
      </div>

      <ReportsTable />
    </div>
  );
}
