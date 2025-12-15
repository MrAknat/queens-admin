"use client";

import { Car, File, Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useCreateDraftAppraisal } from "@/hooks/useAppraisals";
import { AdminSection } from "../admin-section";
import { Card, CardContent, CardHeader } from "../ui/Card";
import { FormField } from "../ui/form-field";
import { FormGrid } from "../ui/form-grid";
import { FormSection } from "../ui/form-section";
import { Input } from "../ui/input";
import { LoadingButton } from "../ui/LoadingButton";

interface AppraisalFormData {
  rego: string;
  region: string;
  state: string;
  lastOdometer?: string;
}

export function AppraisalSubmissionPanel() {
  return (
    <AdminSection>
      <Card>
        <CardHeader variant="admin">
          <h3 className="text-lg font-semibold">Manual Appraisal Submission</h3>
        </CardHeader>
        <CardContent>
          <ManualAppraisalSubmissionForm />
        </CardContent>
      </Card>

      {/* <Card className="mt-6">
        <CardHeader variant="admin">
          <h3 className="text-lg font-semibold">Batch Appraisals Uploader</h3>
        </CardHeader>
        <CardContent>
          <BatchAppraisalsUploaderForm />
        </CardContent>
      </Card> */}
    </AdminSection>
  );
}

export function ManualAppraisalSubmissionForm() {
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
      lastOdometer: "",
    },
  });

  const { mutate } = useCreateDraftAppraisal();

  const onSubmit = async (data: AppraisalFormData) => {
    setIsSubmitting(true);

    mutate(
      {
        plateNumber: data.rego,
        region: data.region,
        state: data.state,
        lastOdometer: data.lastOdometer,
      },
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

          <FormField
            id="lastOdometer"
            label="Last Known Odometer"
            error={errors.lastOdometer?.message}
          >
            <Input
              id="lastOdometer"
              {...register("lastOdometer")}
              placeholder="Enter odometer readings"
              className={errors.lastOdometer ? "border-destructive" : ""}
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
  );
}

function BatchAppraisalsUploaderForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { handleSubmit } = useForm<AppraisalFormData>({
    mode: "onChange",
  });

  const onSubmit = async (_data: AppraisalFormData) => {
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <FormSection title="Upload CSV or XLSX File" icon={File}>
        <FormGrid columns={1}>
          <FormField id="file" label="File" required>
            <Input id="file" type="file" accept=".csv,.xlsx" className="" />
          </FormField>
        </FormGrid>
      </FormSection>

      <div className="flex justify-end pt-4">
        <LoadingButton
          label="Upload CSV"
          type="submit"
          disabled={isSubmitting}
          loading={isSubmitting}
          loadingText="Uploading..."
          icon={Send}
        />
      </div>
    </form>
  );
}
