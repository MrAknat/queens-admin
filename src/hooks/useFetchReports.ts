import { useCallback, useState } from "react";
import type { Report } from "@/components/reports/reports-table";

interface UseFetchReportsProps {
  initialData: Report[];
  complete: boolean;
}

export const useFetchReports = ({
  initialData,
  complete,
}: UseFetchReportsProps) => {
  const [reports, setReports] = useState<Report[]>(initialData);
  const [loading, setLoading] = useState(!initialData.length);
  const [error, setError] = useState<string | null>(null);

  const fetchReports = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/reports?isDraft=${!complete}`);

      if (!response.ok) {
        throw new Error("Failed to fetch reports");
      }

      const data = await response.json();

      setReports(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  }, [complete]);

  return { reports, error, loading, fetchReports };
};
