import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { MaxOfferConfiguration } from "@/components/maxOfferConfigurator/MaxOfferConfiguratorForm";

export function useUpdateMaxOfferConfiguration() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: MaxOfferConfiguration) => {
      const response = await fetch(`/api/max-offer-configuration`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to update max offer configuration: ${response.status} ${response.statusText}`,
        );
      }

      return response.json();
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["max-offer-configuration"], data);
    },
  });
}

export function useGetMaxOfferConfiguration() {
  return useQuery({
    queryKey: ["max-offer-configuration"],
    queryFn: async () => {
      const response = await fetch(`/api/max-offer-configuration`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(
          `Failed to fetch max offer configuration: ${response.status} ${response.statusText}`,
        );
      }

      return response.json();
    },
  });
}
