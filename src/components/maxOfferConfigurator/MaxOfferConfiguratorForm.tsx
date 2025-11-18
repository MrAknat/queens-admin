"use client";

import { DollarSign, RefreshCw, Save, Settings } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  useGetMaxOfferConfiguration,
  useUpdateMaxOfferConfiguration,
} from "@/hooks/useValuations";
import { formatDateTime } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardHeader,
  FormField,
  FormGrid,
  FormSection,
} from "../ui";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Loader } from "../ui/loader";

export interface MaxOfferConfiguration {
  reconditioning_percentage: number;
  reconditioning_fixed: number;
  profit_margin_percentage: number;
  profit_margin_fixed: number;
  lot_percentage: number;
  lot_fixed: number;
  transport_percentage: number;
  transport_fixed: number;
  admin_percentage: number;
  admin_fixed: number;
}

const CONFIG_SECTIONS = [
  {
    key: "reconditioning" as const,
    label: "Reconditioning",
    description: "Vehicle reconditioning costs",
  },
  {
    key: "profit_margin" as const,
    label: "Profit Margin",
    description: "Expected profit margin",
  },
  {
    key: "lot" as const,
    label: "Lot Fees",
    description: "Auction lot and handling fees",
  },
  {
    key: "transport" as const,
    label: "Transport",
    description: "Transportation and logistics costs",
  },
  {
    key: "admin" as const,
    label: "Admin Fees",
    description: "Administrative processing fees",
  },
];

export function MaxOfferConfiguratorForm() {
  const [lastSaved, setLastSaved] = useState<string | null>(null);

  const { data, isLoading: isDataLoading } = useGetMaxOfferConfiguration();
  const { mutate, isPending } = useUpdateMaxOfferConfiguration();

  const {
    control,
    handleSubmit,
    formState: { isDirty, isValid },
    reset,
  } = useForm<MaxOfferConfiguration>({
    mode: "onChange",
    defaultValues: {
      reconditioning_percentage: data?.reconditioning_percentage || 0,
      reconditioning_fixed: data?.reconditioning_fixed || 0,
      profit_margin_percentage: data?.profit_margin_percentage || 0,
      profit_margin_fixed: data?.profit_margin_fixed || 0,
      lot_percentage: data?.lot_percentage || 0,
      lot_fixed: data?.lot_fixed || 0,
      transport_percentage: data?.transport_percentage || 0,
      transport_fixed: data?.transport_fixed || 0,
      admin_percentage: data?.admin_percentage || 0,
      admin_fixed: data?.admin_fixed || 0,
    },
  });

  useEffect(() => {
    if (data && !isDirty) {
      reset(data);

      const date =
        data.updatedAt || data.createdAt
          ? formatDateTime(data.updatedAt || data.createdAt)
          : null;

      setLastSaved(date);
    }
  }, [data, reset, isDirty]);

  if (isDataLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <Loader size="lg" className="mr-2" />
          Loading configuration...
        </CardContent>
      </Card>
    );
  }

  const onSubmit = async (formData: MaxOfferConfiguration) => {
    try {
      mutate(formData, {
        onSuccess: (response) => {
          const updatedData = response?.data || formData;

          setLastSaved(
            formatDateTime(
              response?.data?.updatedAt ||
                response?.data?.createdAt ||
                new Date().toLocaleTimeString(),
            ),
          );

          reset(updatedData, { keepValues: true });

          console.log("Configuration updated successfully");
        },
        onError: (error) => {
          console.error("Error updating configuration:", error);
        },
      });
    } catch (error) {
      console.error("Error updating configuration:", error);
    }
  };

  const handleReset = () => {
    if (data) {
      reset(data);
    }
  };

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Settings className="h-5 w-5 text-primary" />
          <div>
            <h3 className="text-lg font-semibold">Max Offer Configuration</h3>
            <p className="text-sm text-muted-foreground">
              Configure cost factors for maximum offer calculations
            </p>
          </div>
        </div>
        {lastSaved && (
          <div className="text-sm text-muted-foreground">
            Last saved: {lastSaved}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FormSection title="Cost Configuration" icon={DollarSign}>
            <div className="space-y-6">
              {CONFIG_SECTIONS.map((section) => (
                <div
                  key={section.key}
                  className="flex flex-col md:flex-row w-full"
                >
                  <div className="flex-1 mb-4">
                    <h4 className="font-medium text-sm">{section.label}</h4>
                    <p className="text-xs text-muted-foreground">
                      {section.description}
                    </p>
                  </div>

                  <FormGrid columns={2} className="flex-0 basis-[50%]">
                    <Controller
                      name={
                        `${section.key}_percentage` as keyof MaxOfferConfiguration
                      }
                      control={control}
                      rules={{
                        required: "Percentage is required",
                        min: {
                          value: 0,
                          message: "Percentage cannot be negative",
                        },
                      }}
                      render={({ field, fieldState: { error } }) => (
                        <FormField
                          id={`${section.key}-percentage`}
                          label="Percentage (%)"
                          required
                          error={error?.message}
                        >
                          <Input
                            {...field}
                            type="number"
                            step="0.1"
                            min="0"
                            max="100"
                            placeholder="0.0"
                            onFocus={(e) => {
                              if (field.value === 0) {
                                e.target.value = "";
                              }
                            }}
                            onBlur={(e) => {
                              if (!field.value) {
                                e.target.value = "0";
                              }

                              e.target.value = Number(
                                e.target.value,
                              ).toString();
                            }}
                            onChange={(e) => {
                              const newValue = e.target.value;
                              field.onChange(
                                newValue === "" ? 0 : Number(newValue) || 0,
                              );
                            }}
                          />
                        </FormField>
                      )}
                    />

                    <Controller
                      name={
                        `${section.key}_fixed` as keyof MaxOfferConfiguration
                      }
                      control={control}
                      rules={{
                        required: "Fixed amount is required",
                        min: {
                          value: 0,
                          message: "Amount cannot be negative",
                        },
                      }}
                      render={({ field, fieldState: { error } }) => (
                        <FormField
                          id={`${section.key}-fixed`}
                          label="Fixed Amount ($)"
                          required
                          error={error?.message}
                        >
                          <Input
                            {...field}
                            type="number"
                            step="1"
                            min="0"
                            placeholder="0"
                            onFocus={(e) => {
                              if (field.value === 0) {
                                e.target.value = "";
                              }
                            }}
                            onBlur={(e) => {
                              if (!field.value) {
                                e.target.value = "0";
                              }

                              e.target.value = Number(
                                e.target.value,
                              ).toString();
                            }}
                            onChange={(e) => {
                              const newValue = e.target.value;
                              field.onChange(
                                newValue === "" ? 0 : Number(newValue) || 0,
                              );
                            }}
                          />
                        </FormField>
                      )}
                    />
                  </FormGrid>

                  {section.key !== "admin" && <hr className="my-4" />}
                </div>
              ))}
            </div>
          </FormSection>

          <div className="flex gap-3 pt-4 justify-end">
            <Button
              type="submit"
              disabled={!isDirty || !isValid || isPending}
              className="min-w-[120px]"
            >
              {isPending ? (
                <>
                  <Loader size="sm" className="mr-2" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Config
                </>
              )}
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
              disabled={!isDirty || isPending}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset Changes
            </Button>
          </div>

          <div className="text-xs text-muted-foreground bg-muted/20 p-3 rounded">
            <p className="mb-2">
              <strong>How it works:</strong> For each cost category, you can
              specify both a percentage and a fixed amount.
            </p>
            <p>
              The system will automatically use the{" "}
              <strong>higher value</strong> between the percentage calculation
              and the fixed amount when calculating the maximum offer.
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
