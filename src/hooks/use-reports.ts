import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Types
export interface Vehicle {
  _id: string;
  modelId: string;
  vin: string;
  rego: string;
  odometer: number | null;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface Lead {
  _id: string;
  externalId: string;
  modelId: string;
  listedAt: string;
  removedAt: string;
  sellerType: string;
  state: string;
  driveAwayPrice: number;
  kms: number;
  listingSources: string[];
}

export interface Report {
  _id: string;
  vehicle: Vehicle;
  leads: Lead[];
  slope: number | null;
  intercept: number | null;
  lastOdometer: number | null;
  estimatedRetail: number | null;
  tradeInEstimate: number | null;
  isDraft: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ReportsResponse {
  data: Report[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Query Keys
export const reportQueryKeys = {
  all: ["reports"] as const,
  lists: () => [...reportQueryKeys.all, "list"] as const,
  list: (filters: Record<string, any>) =>
    [...reportQueryKeys.lists(), { filters }] as const,
  details: () => [...reportQueryKeys.all, "detail"] as const,
  detail: (id: string) => [...reportQueryKeys.details(), id] as const,
};

// API Functions
async function fetchReports(params: {
  page?: number;
  limit?: number;
  isDraft?: "true" | "false";
  search?: string;
}): Promise<ReportsResponse> {
  const searchParams = new URLSearchParams();

  if (params.page) searchParams.set("page", params.page.toString());
  if (params.limit) searchParams.set("limit", params.limit.toString());
  if (params.search) searchParams.set("search", params.search);
  if (params.isDraft) searchParams.set("isDraft", params.isDraft);

  const response = await fetch(`/api/reports?${searchParams.toString()}`);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch reports: ${response.status} ${response.statusText}`,
    );
  }

  const data = await response.json();

  // If the API returns an array directly, wrap it in the expected format
  if (Array.isArray(data)) {
    return {
      data,
      total: data.length,
      page: params.page || 1,
      limit: params.limit || 10,
      totalPages: Math.ceil(data.length / (params.limit || 10)),
    };
  }

  return data;
}

// Custom Hooks
export interface UseReportsOptions {
  page?: number;
  limit?: number;
  isDraft?: "true" | "false";
  search?: string;
  enabled?: boolean;
}

export function useReports(options: UseReportsOptions = {}) {
  const {
    page = 1,
    limit = 10,
    isDraft = "true",
    search = "",
    enabled = true,
  } = options;

  return useQuery({
    queryKey: reportQueryKeys.list({ page, limit, search, isDraft }),
    queryFn: () => fetchReports({ page, limit, search, isDraft }),
    enabled,
    placeholderData: (previousData) => previousData,
    refetchInterval: 30000,
  });
}

export function useCreateDraftReport() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: {
      plateNumber: string;
      state: string;
      region: string;
    }) => {
      const response = await fetch("/api/reports", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to create draft report: ${response.status} ${response.statusText}`,
        );
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: reportQueryKeys.lists() });
    },
  });
}
