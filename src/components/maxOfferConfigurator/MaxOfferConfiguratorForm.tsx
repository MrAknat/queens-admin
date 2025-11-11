"use client";

import { DollarSign, RefreshCw, Save, Settings } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  useGetMaxOfferConfiguration,
  useUpdateMaxOfferConfiguration,
} from "@/hooks/useValuations";
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
import { Select } from "../ui/select";

interface ConfigItem {
  amount: number;
  type: "fixed" | "percentage";
}

export interface MaxOfferConfiguration {
  reconditioning: ConfigItem;
  profit_margin: ConfigItem;
  lot: ConfigItem;
  transport: ConfigItem;
  admin: ConfigItem;
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

const TYPE_OPTIONS = [
  { value: "fixed", label: "Fixed Amount ($)" },
  { value: "percentage", label: "Percentage (%)" },
];

export function MaxOfferConfiguratorForm() {
  const [lastSaved, setLastSaved] = useState<string | null>(null);

  const { data, isLoading: isDataLoading } = useGetMaxOfferConfiguration();
  const { mutate, isPending } = useUpdateMaxOfferConfiguration();

  const {
    control,
    handleSubmit,
    formState: { isDirty, isValid },
    watch,
    reset,
  } = useForm<MaxOfferConfiguration>({
    mode: "onChange",
    values: data?.data,
    defaultValues: {
      reconditioning: { amount: 0, type: "fixed" },
      profit_margin: { amount: 0, type: "fixed" },
      lot: { amount: 0, type: "fixed" },
      transport: { amount: 0, type: "fixed" },
      admin: { amount: 0, type: "fixed" },
    },
  });

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
        onSuccess: ({ data }) => {
          setLastSaved(new Date().toLocaleTimeString());

          reset(data);

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
    if (data?.data) {
      reset(data.data);
    }
    setLastSaved(null);
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
                      name={`${section.key}.type`}
                      control={control}
                      rules={{ required: "Type is required" }}
                      render={({ field, fieldState: { error } }) => (
                        <FormField
                          id={`${section.key}-type`}
                          label="Type"
                          required
                          error={error?.message}
                        >
                          <Select
                            {...field}
                            options={TYPE_OPTIONS}
                            placeholder="Select type"
                          />
                        </FormField>
                      )}
                    />

                    <Controller
                      name={`${section.key}.amount`}
                      control={control}
                      rules={{
                        required: "Amount is required",
                        min: {
                          value: 0,
                          message: "Amount cannot be negative",
                        },
                        max:
                          watch(`${section.key}.type`) === "percentage"
                            ? {
                                value: 100,
                                message: "Percentage cannot exceed 100%",
                              }
                            : undefined,
                      }}
                      render={({ field, fieldState: { error } }) => {
                        const isPercentage =
                          watch(`${section.key}.type`) === "percentage";
                        return (
                          <FormField
                            id={`${section.key}-amount`}
                            label={
                              isPercentage ? "Percentage (%)" : "Amount ($)"
                            }
                            required
                            error={error?.message}
                          >
                            <Input
                              {...field}
                              type="number"
                              step={isPercentage ? "0.1" : "1"}
                              min="0"
                              max={isPercentage ? "100" : undefined}
                              placeholder={isPercentage ? "0.0" : "0"}
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
                            />
                          </FormField>
                        );
                      }}
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

          <div className="text-xs text-muted-foreground bg-muted/20 p-3 rounded text-end">
            <p>
              <strong>Fixed amounts</strong> are subtracted as absolute dollar
              values.
              <strong> Percentages</strong> are calculated as a percentage of
              the vehicle's value.
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
