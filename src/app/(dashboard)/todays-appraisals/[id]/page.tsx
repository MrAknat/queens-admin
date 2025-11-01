"use client";

import { ArrowLeft, Save } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { LeadsTable } from "@/components/appraisal/LeadsTable";
import { PhotoCarousel } from "@/components/appraisal/PhotoCarousel";
import { ReconditioningForm } from "@/components/appraisal/ReconditioningForm";
import type {
  AppraisalFormData,
  PhotoData,
} from "@/components/appraisal/types";
import { VehicleInfoCard } from "@/components/appraisal/VehicleInfoCard";
import { DashboardPageLayout } from "@/components/layout/dashboard-page-layout";
import {
  UnsavedChangesModal,
  useUnsavedChanges,
} from "@/components/UnsavedChangesModal";
import { Loader, LoadingButton } from "@/components/ui";
import type { BreadcrumbItem } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { useAppraisal } from "@/hooks/useAppraisals";

export default function TodaysAppraisalEditPage() {
  const params = useParams();
  const router = useRouter();
  const appraisalId = params.id as string;

  const {
    data: appraisal,
    isLoading,
    isRefetching,
  } = useAppraisal(appraisalId);

  const {
    control,
    handleSubmit,
    formState: { isValid, isDirty: hasUnsavedChanges },
    reset,
  } = useForm<AppraisalFormData>({
    mode: "onChange",
    defaultValues: {
      odometer: 0,
      maxOffer: 0,
      detail: "",
      paintPanel: "",
      rwc: "",
      registration: "",
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    showModal,
    handleNavigation,
    handleConfirmNavigation,
    handleCancelNavigation,
  } = useUnsavedChanges(hasUnsavedChanges);

  // Custom breadcrumbs for this detail page
  const breadcrumbs: BreadcrumbItem[] = [
    {
      label: "Today's Appraisals",
      href: "/todays-appraisals",
    },
    {
      label: `${appraisal?.vehicle.description || "Loading..."}`,
      isCurrentPage: true,
      ...(isRefetching || isLoading ? { icon: Loader } : {}),
    },
  ];

  // Mock data for demonstration
  const mockPhotos: PhotoData[] = [
    {
      id: "1",
      url: "https://picsum.photos/800/600?random=1",
      alt: "Vehicle exterior front view",
      caption: "Front exterior view",
    },
    {
      id: "2",
      url: "https://picsum.photos/800/600?random=2",
      alt: "Vehicle interior dashboard",
      caption: "Dashboard and interior",
    },
    {
      id: "3",
      url: "https://picsum.photos/800/600?random=3",
      alt: "Vehicle rear view",
      caption: "Rear exterior view",
    },
    {
      id: "4",
      url: "https://picsum.photos/800/600?random=4",
      alt: "Engine bay",
      caption: "Engine compartment",
    },
    {
      id: "5",
      url: "https://picsum.photos/800/600?random=5",
      alt: "Trunk space",
      caption: "Spacious trunk",
    },
    {
      id: "6",
      url: "https://picsum.photos/800/600?random=6",
      alt: "Side profile",
      caption: "Vehicle side profile",
    },
  ];

  // Update form when appraisal data loads
  useEffect(() => {
    if (appraisal) {
      reset({
        odometer: appraisal.vehicle.odometer || 0,
        maxOffer: 0, // This would come from appraisal data
        detail: "",
        paintPanel: "",
        rwc: "",
        registration: "",
      });
    }
  }, [appraisal, reset]);

  const onSubmit = async (data: AppraisalFormData) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Form submitted:", data);

      // Reset form dirty state after successful submission
      reset(data);

      // Show success message or redirect
      alert("Appraisal updated successfully!");
    } catch (error) {
      console.error("Submission error:", error);
      alert("Error updating appraisal. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackNavigation = () => {
    handleNavigation(() => router.back());
  };

  if (isLoading) {
    return (
      <DashboardPageLayout
        title="Loading Appraisal"
        description="Please wait while we load the appraisal details."
        breadcrumbs={breadcrumbs}
      >
        <div className="flex items-center justify-center h-64">
          <Loader className="w-8 h-8" />
        </div>
      </DashboardPageLayout>
    );
  }

  if (!appraisal) {
    return (
      <DashboardPageLayout
        title="Appraisal Not Found"
        description="The requested appraisal could not be found."
        breadcrumbs={breadcrumbs}
      >
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">Appraisal not found</p>
          <Button onClick={handleBackNavigation}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Appraisals
          </Button>
        </div>
      </DashboardPageLayout>
    );
  }

  return (
    <DashboardPageLayout
      title={`Edit Appraisal`}
      description="Complete the vehicle appraisal by updating the information below."
      breadcrumbs={breadcrumbs}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <VehicleInfoCard control={control} vehicle={appraisal.vehicle} />

        <PhotoCarousel photos={mockPhotos} />

        <ReconditioningForm control={control} />

        <LeadsTable leads={appraisal.leads} />

        <div className="flex items-center justify-between pt-6 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={handleBackNavigation}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Appraisals
          </Button>

          <div className="flex items-center gap-3">
            {hasUnsavedChanges && (
              <span className="text-sm text-amber-600">
                You have unsaved changes
              </span>
            )}
            <LoadingButton
              type="submit"
              loading={isSubmitting}
              loadingText="Saving..."
              disabled={!isValid || isSubmitting}
              icon={Save}
              label="Save Appraisal"
            />
          </div>
        </div>
      </form>

      <UnsavedChangesModal
        isOpen={showModal}
        onClose={handleCancelNavigation}
        onConfirm={handleConfirmNavigation}
        onCancel={handleCancelNavigation}
      />
    </DashboardPageLayout>
  );
}
