"use client";

import { Car } from "lucide-react";
import { type Control, Controller } from "react-hook-form";
import { FormField, Input } from "@/components/ui";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import type { AppraisalFormData } from "./types";

interface VehicleInfoCardProps {
  control: Control<AppraisalFormData>;
  vehicle: {
    description: string;
    rego: string;
    vin: string;
    modelId: string;
    odometer: number;
  };
}

export function VehicleInfoCard({ control, vehicle }: VehicleInfoCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Car className="h-4 w-4 text-primary" />
          <h3 className="font-medium">Vehicle Information</h3>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Read-only vehicle details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <span className="text-sm font-medium text-gray-700">
              Description
            </span>
            <p className="mt-1 text-sm text-gray-900">{vehicle.description}</p>
          </div>
          <div>
            <span className="text-sm font-medium text-gray-700">
              Registration
            </span>
            <p className="mt-1 text-sm text-gray-900 font-mono">
              {vehicle.rego}
            </p>
          </div>
          <div>
            <span className="text-sm font-medium text-gray-700">VIN</span>
            <p className="mt-1 text-sm text-gray-900 font-mono">
              {vehicle.vin}
            </p>
          </div>
          <div>
            <span className="text-sm font-medium text-gray-700">Model ID</span>
            <p className="mt-1 text-sm text-gray-900">{vehicle.modelId}</p>
          </div>
        </div>

        {/* Editable fields */}
        <div className="border-t pt-6">
          <h4 className="text-sm font-medium text-gray-700 mb-4">
            Editable Fields
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Controller
              name="odometer"
              control={control}
              rules={{
                required: "Odometer reading is required",
                min: { value: 0, message: "Odometer cannot be negative" },
                max: { value: 999999, message: "Odometer reading too high" },
              }}
              render={({ field, fieldState: { error } }) => (
                <FormField
                  id="odometer"
                  label="Odometer (km)"
                  required
                  error={error?.message}
                >
                  <Input
                    {...field}
                    type="number"
                    placeholder="Enter current odometer reading"
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
              name="maxOffer"
              control={control}
              rules={{
                required: "Maximum offer is required",
                min: { value: 0, message: "Offer cannot be negative" },
                max: { value: 999999, message: "Offer amount too high" },
              }}
              render={({ field, fieldState: { error } }) => (
                <FormField
                  id="maxOffer"
                  label="Maximum Offer ($)"
                  required
                  error={error?.message}
                >
                  <Input
                    {...field}
                    type="number"
                    placeholder="Enter maximum offer amount"
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
        </div>
      </CardContent>
    </Card>
  );
}
