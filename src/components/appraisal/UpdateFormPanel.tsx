"use client";

import { Save } from "lucide-react";
import { type Control, Controller } from "react-hook-form";
import { FormField, Input, LoadingButton } from "@/components/ui";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Prices, type PricesProps } from "../ui/Prices";
import type { AppraisalFormData } from "./types";

interface UpdateFormPanelProps {
  data: PricesProps;
  onSubmit: (e: React.FormEvent) => void;
  control: Control<AppraisalFormData>;
  isSubmitting: boolean;
  isValid: boolean;
  hasUnsavedChanges: boolean;
}

export function UpdateFormPanel({
  data,
  onSubmit,
  control,
  isSubmitting,
  isValid,
  hasUnsavedChanges,
}: UpdateFormPanelProps) {
  return (
    <Card className="block self-center xl:self-start xl:sticky top-22 space-y-6 h-fit min-w-70 w-70">
      <CardHeader>
        <Prices
          maxOffer={data.maxOffer}
          estimatedRetail={data.estimatedRetail}
          estimatedTrade={data.estimatedTrade}
          maxOfferConfig={data.maxOfferConfig}
        />
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <Controller
              name="lastOdometer"
              control={control}
              rules={{
                validate: {
                  isNumber: (value) =>
                    !Number.isNaN(Number(value)) || "Must be a valid number",
                  isPositive: (value) =>
                    Number(value) >= 0 || "Cannot be negative",
                  isWholeNumber: (value) =>
                    Number.isInteger(Number(value)) || "Must be a whole number",
                },
              }}
              render={({ field, fieldState: { error } }) => (
                <FormField
                  id="lastOdometer"
                  label="Odometer (km)"
                  error={error?.message}
                >
                  <Input
                    {...field}
                    type="number"
                    step="1000"
                    placeholder="Enter current odometer"
                    value={field.value || ""}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value ? Number(e.target.value) : "",
                      )
                    }
                  />
                </FormField>
              )}
            />
            <Controller
              name="managerMaxOffer"
              control={control}
              rules={{
                validate: {
                  isNumber: (value) =>
                    !Number.isNaN(Number(value)) || "Must be a valid number",
                  isPositive: (value) =>
                    Number(value) >= 0 || "Cannot be negative",
                  isWholeNumber: (value) =>
                    Number.isInteger(Number(value)) || "Must be a whole number",
                },
              }}
              render={({ field, fieldState: { error } }) => (
                <FormField
                  id="managerMaxOffer"
                  label="Manager's Offer ($)"
                  error={error?.message}
                >
                  <Input
                    {...field}
                    type="number"
                    step="500"
                    placeholder="Enter maximum offer"
                    value={field.value || ""}
                    onChange={(e) =>
                      field.onChange(
                        e.target.value ? Number(e.target.value) : "",
                      )
                    }
                  />
                </FormField>
              )}
            />
          </div>

          {/* <div className="border-t pt-6">
            <div className="flex flex-row gap-2 align-center">
              <Construction className="h-4 w-4 text-warning" />
              <h4 className="text-sm font-medium mb-4">Reconditioning</h4>
              <Construction className="h-4 w-4 text-warning" />
            </div>
            <div className="flex flex-col gap-4">
              <Controller
                name="detail"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <FormField id="detail" label="Detail" error={error?.message}>
                    <Textarea
                      {...field}
                      placeholder="Describe the interior and exterior detail work needed..."
                      rows={2}
                      className="resize-none"
                    />
                  </FormField>
                )}
              />
              <Controller
                name="paintPanel"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <FormField
                    id="paintPanel"
                    label="Paint & Panel"
                    error={error?.message}
                  >
                    <Textarea
                      {...field}
                      placeholder="Describe any paint or panel work required..."
                      rows={2}
                      className="resize-none"
                    />
                  </FormField>
                )}
              />
              <Controller
                name="rwc"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <FormField
                    id="rwc"
                    label="RWC (Roadworthy Certificate)"
                    error={error?.message}
                  >
                    <Textarea
                      {...field}
                      placeholder="List any work needed to pass RWC inspection..."
                      rows={2}
                      className="resize-none"
                    />
                  </FormField>
                )}
              />
              <Controller
                name="registration"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <FormField
                    id="registration"
                    label="Registration"
                    error={error?.message}
                  >
                    <Textarea
                      {...field}
                      placeholder="Note registration status and any requirements..."
                      rows={2}
                      className="resize-none"
                    />
                  </FormField>
                )}
              />
            </div>
          </div> */}

          <LoadingButton
            type="submit"
            variant="secondary"
            loading={isSubmitting}
            loadingText="Updating..."
            disabled={!isValid || isSubmitting || !hasUnsavedChanges}
            icon={Save}
            label="Update data"
          />
        </form>
      </CardContent>
    </Card>
  );
}
