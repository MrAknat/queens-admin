import { useQuery } from "@tanstack/react-query";

interface ApiUsageResponse {
  stats: ApiUsageStats[];
}

export interface ApiUsageStats {
  endpoint: string;
  total: number;
  today: number;
  week: number;
  month: number;
  year: number;
}

export const apiUsageQueryKeys = {
  all: ["apiUsage"] as const,
  stats: () => [...apiUsageQueryKeys.all, "stats"] as const,
};

async function fetchApiUsageStats(): Promise<ApiUsageResponse> {
  const response = await fetch("/api/usage");

  if (!response.ok) {
    throw new Error(
      `Failed to fetch API usage stats: ${response.status} ${response.statusText}`,
    );
  }

  return response.json();
}

export function useApiUsageStats() {
  return useQuery({
    queryKey: apiUsageQueryKeys.stats(),
    queryFn: fetchApiUsageStats,
    refetchInterval: 60000, // Refetch every minute
  });
}
