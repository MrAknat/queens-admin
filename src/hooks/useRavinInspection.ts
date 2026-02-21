import { useMutation, useQuery } from "@tanstack/react-query";

export interface RavinLinkResponse {
  url: string;
}

export interface RavinStatusResponse {
  found: boolean;
  appraisalId?: string;
  vehicleId?: string;
}

export const ravinQueryKeys = {
  all: ["ravin-inspection"] as const,
  status: (plateNumber: string) =>
    [...ravinQueryKeys.all, "status", plateNumber] as const,
};

/**
 * Hook to request a Ravin One-Time Link (OTL)
 */
export function useRequestRavinLink() {
  return useMutation({
    mutationFn: async (plateNumber: string) => {
      const response = await fetch("/api/ravin-inspection", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ plateNumber }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(
          data.message || "Failed to request Ravin inspection link",
        );
      }

      return response.json() as Promise<RavinLinkResponse>;
    },
  });
}

/**
 * Hook to poll for inspection status
 */
export function useRavinInspectionStatus(
  plateNumber: string,
  enabled: boolean = false,
) {
  return useQuery({
    queryKey: ravinQueryKeys.status(plateNumber),
    queryFn: async () => {
      const response = await fetch(
        `/api/ravin-inspection?plateNumber=${plateNumber}`,
      );

      if (!response.ok) {
        throw new Error("Failed to check inspection status");
      }

      return response.json() as Promise<RavinStatusResponse>;
    },
    enabled: enabled && !!plateNumber,
    refetchInterval: (query) => {
      // Stop polling if we found the appraisal
      return query.state.data?.found ? false : 3000;
    },
  });
}
