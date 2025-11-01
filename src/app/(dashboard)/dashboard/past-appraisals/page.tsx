import { ReportsTable } from "@/components/reports/ReportsTable";

export default function PastAppraisalsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Past Appraisals</h2>
        <p className="text-muted-foreground">
          Monitor and manage past appraisals.
        </p>
      </div>

      <ReportsTable />
    </div>
  );
}
