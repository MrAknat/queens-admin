"use client";

import { Wrench } from "lucide-react";
import { type Control, Controller } from "react-hook-form";
import { FormField, Textarea } from "@/components/ui";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import type { AppraisalFormData } from "./types";

interface ReconditioningFormProps {
  control: Control<AppraisalFormData>;
}

export function ReconditioningForm({ control }: ReconditioningFormProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Wrench className="h-4 w-4 text-primary" />
          <h3 className="font-medium">Reconditioning</h3>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Controller
            name="detail"
            control={control}
            rules={{
              required: "Detail assessment is required",
              minLength: {
                value: 10,
                message: "Please provide more details (minimum 10 characters)",
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <FormField
                id="detail"
                label="Detail"
                required
                error={error?.message}
              >
                <Textarea
                  {...field}
                  placeholder="Describe the interior and exterior detail work needed..."
                  rows={4}
                  className="resize-none"
                />
              </FormField>
            )}
          />

          <Controller
            name="paintPanel"
            control={control}
            rules={{
              required: "Paint & Panel assessment is required",
              minLength: {
                value: 10,
                message: "Please provide more details (minimum 10 characters)",
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <FormField
                id="paintPanel"
                label="Paint & Panel"
                required
                error={error?.message}
              >
                <Textarea
                  {...field}
                  placeholder="Describe any paint or panel work required..."
                  rows={4}
                  className="resize-none"
                />
              </FormField>
            )}
          />

          <Controller
            name="rwc"
            control={control}
            rules={{
              required: "RWC assessment is required",
              minLength: {
                value: 5,
                message: "Please provide more details (minimum 5 characters)",
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <FormField
                id="rwc"
                label="RWC (Roadworthy Certificate)"
                required
                error={error?.message}
              >
                <Textarea
                  {...field}
                  placeholder="List any work needed to pass RWC inspection..."
                  rows={4}
                  className="resize-none"
                />
              </FormField>
            )}
          />

          <Controller
            name="registration"
            control={control}
            rules={{
              required: "Registration assessment is required",
              minLength: {
                value: 5,
                message: "Please provide more details (minimum 5 characters)",
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <FormField
                id="registration"
                label="Registration"
                required
                error={error?.message}
              >
                <Textarea
                  {...field}
                  placeholder="Note registration status and any requirements..."
                  rows={4}
                  className="resize-none"
                />
              </FormField>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
}
