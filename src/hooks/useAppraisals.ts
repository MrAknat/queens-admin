import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { PhotoData } from "@/components/appraisal/types";

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

export interface Appraisal {
  _id: string;
  vehicle: Vehicle;
  leads: Lead[];
  slope: number | null;
  intercept: number | null;
  lastOdometer: number | null;
  avgLeadsOdometer: number | null;
  estimatedRetail: number | null;
  estimatedTrade: number | null;
  avgLeadsEstimatedRetail: number | null;
  tradeInEstimate: number | null;
  maxOffer: number | null;
  managerMaxOffer: number | null;
  isDraft: boolean;
  createdAt: string;
  updatedAt: string;
  photos: PhotoData[];
}

export interface AppraisalsResponse {
  data: Appraisal[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Query Keys
export const appraisalQueryKeys = {
  all: ["appraisals"] as const,
  lists: () => [...appraisalQueryKeys.all, "list"] as const,
  list: (filters: Record<string, any>) =>
    [...appraisalQueryKeys.lists(), { filters }] as const,
  details: () => [...appraisalQueryKeys.all, "detail"] as const,
  detail: (id: string) => [...appraisalQueryKeys.details(), id] as const,
};

// API Functions
async function fetchAppraisals(params: {
  page?: number;
  limit?: number;
  isDraft?: "true" | "false";
  search?: string;
}): Promise<AppraisalsResponse> {
  const searchParams = new URLSearchParams();

  if (params.page) searchParams.set("page", params.page.toString());
  if (params.limit) searchParams.set("limit", params.limit.toString());
  if (params.search) searchParams.set("search", params.search);
  if (params.isDraft) searchParams.set("isDraft", params.isDraft);

  const response = await fetch(`/api/appraisals?${searchParams.toString()}`);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch appraisals: ${response.status} ${response.statusText}`,
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
export interface UseAppraisalsOptions {
  page?: number;
  limit?: number;
  isDraft?: "true" | "false";
  search?: string;
  enabled?: boolean;
}

export function useAppraisals(options: UseAppraisalsOptions = {}) {
  const {
    page = 1,
    limit = 10,
    isDraft = "true",
    search = "",
    enabled = true,
  } = options;

  return useQuery({
    queryKey: appraisalQueryKeys.list({ page, limit, search, isDraft }),
    queryFn: () => fetchAppraisals({ page, limit, search, isDraft }),
    enabled,
    placeholderData: (previousData) => previousData,
    refetchInterval: 30000,
  });
}

export function useCreateDraftAppraisal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: {
      plateNumber: string;
      state: string;
      region: string;
      lastOdometer?: string;
    }) => {
      const response = await fetch("/api/appraisals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to create draft appraisal: ${response.status} ${response.statusText}`,
        );
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: appraisalQueryKeys.lists() });
    },
  });
}

export function useAppraisal(id: string) {
  return useQuery({
    queryKey: appraisalQueryKeys.detail(id),
    queryFn: async () => {
      const response = await fetch(`/api/appraisals/${id}`);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch appraisal: ${response.status} ${response.statusText}`,
        );
      }

      return response.json();
    },
    enabled: !!id,
  });
}

export function useUpdateAppraisal(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: Partial<Appraisal>) => {
      const response = await fetch(`/api/appraisals/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to update appraisal: ${response.status} ${response.statusText}`,
        );
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: appraisalQueryKeys.detail(id),
      });
      queryClient.invalidateQueries({ queryKey: appraisalQueryKeys.lists() });
    },
  });
}

export function useCompleteAppraisal(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await fetch(`/api/appraisals/complete/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(
          `Failed to complete appraisal: ${response.status} ${response.statusText}`,
        );
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: appraisalQueryKeys.detail(id),
      });
      queryClient.invalidateQueries({ queryKey: appraisalQueryKeys.lists() });
    },
  });
}

export function useUploadPhoto(appraisalId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      formData.append("appraisalId", appraisalId);

      const response = await fetch(`/api/photos/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(
          `Failed to upload photo: ${response.status} ${response.statusText}`,
        );
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: appraisalQueryKeys.detail(appraisalId),
      });
    },
  });
}

export function useUpdatePhoto(appraisalId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      photoId,
      title,
    }: {
      photoId: string;
      title: string;
    }) => {
      const response = await fetch(`/api/photos/${photoId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to update photo: ${response.status} ${response.statusText}`,
        );
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: appraisalQueryKeys.detail(appraisalId),
      });
    },
  });
}
