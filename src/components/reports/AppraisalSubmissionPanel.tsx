"use client";

import { Car, Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useCreateDraftReport } from "@/hooks/use-reports";
import { Card, CardContent, CardHeader } from "../ui/Card";
import { FormField } from "../ui/form-field";
import { FormGrid } from "../ui/form-grid";
import { FormSection } from "../ui/form-section";
import { Input } from "../ui/input";
import { LoadingButton } from "../ui/loading-button";

interface AppraisalFormData {
  rego: string;
  region: string;
  state: string;
}

export function AppraisalSubmissionPanel() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<AppraisalFormData>({
    mode: "onChange",
    defaultValues: {
      region: "au",
      state: "QLD",
    },
  });

  const { mutate } = useCreateDraftReport();

  const onSubmit = async (data: AppraisalFormData) => {
    setIsSubmitting(true);

    mutate(
      { plateNumber: data.rego, region: data.region, state: data.state },
      {
        onSuccess: () => {
          reset();
        },
        onSettled: () => {
          setIsSubmitting(false);
        },
      },
    );
  };

  return (
    <Card>
      <CardHeader variant="admin">
        <h3 className="text-lg font-semibold">Manual Appraisal Submission</h3>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FormSection title="Vehicle Information" icon={Car}>
            <FormGrid columns={2}>
              <FormField
                id="rego"
                label="Registration Plate Number"
                required
                error={errors.rego?.message}
              >
                <Input
                  id="rego"
                  {...register("rego", {
                    required: "Registration plate number is required",
                  })}
                  placeholder="Enter registration plate number"
                  className={errors.rego ? "border-destructive" : ""}
                />
              </FormField>

              <FormField
                id="region"
                label="Region"
                required
                error={errors.region?.message}
              >
                <Input
                  id="region"
                  {...register("region", {
                    required: "Region is required",
                  })}
                  placeholder="Enter region"
                  className={errors.region ? "border-destructive" : ""}
                />
              </FormField>

              <FormField
                id="state"
                label="State"
                required
                error={errors.state?.message}
              >
                <Input
                  id="state"
                  {...register("state", {
                    required: "State is required",
                  })}
                  placeholder="Enter state"
                  className={errors.state ? "border-destructive" : ""}
                />
              </FormField>
            </FormGrid>
          </FormSection>

          <div className="flex justify-end pt-4">
            <LoadingButton
              label="Submit Draft Appraisal"
              type="submit"
              disabled={!isValid || isSubmitting}
              loading={isSubmitting}
              loadingText="Submitting..."
              icon={Send}
            />
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
