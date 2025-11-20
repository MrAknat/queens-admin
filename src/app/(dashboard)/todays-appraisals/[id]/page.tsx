"use client";

import { ArrowLeft, Check } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { LeadsTable } from "@/components/appraisal/LeadsTable";
import { PhotoCarousel } from "@/components/appraisal/PhotoCarousel";
import type {
  AppraisalFormData,
  PhotoData,
} from "@/components/appraisal/types";
import { UpdateFormPanel } from "@/components/appraisal/UpdateFormPanel";
import { DashboardPageLayout } from "@/components/layout/dashboard-page-layout";
import {
  UnsavedChangesModal,
  useUnsavedChanges,
} from "@/components/UnsavedChangesModal";
import { Loader, LoadingButton } from "@/components/ui";
import type { BreadcrumbItem } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/button";
import {
  useAppraisal,
  useCompleteAppraisal,
  useUpdateAppraisal,
} from "@/hooks/useAppraisals";

export default function TodaysAppraisalEditPage() {
  const params = useParams();
  const router = useRouter();

  const appraisalId = params.id as string;

  const {
    data: appraisal,
    isLoading,
    isRefetching,
  } = useAppraisal(appraisalId);

  const { mutate: updateAppraisal } = useUpdateAppraisal(appraisalId);
  const { mutate: completeAppraisal } = useCompleteAppraisal(appraisalId);

  const initialFormData: AppraisalFormData = useMemo(
    () => ({
      lastOdometer: appraisal?.lastOdometer || null,
      managerMaxOffer: appraisal?.managerMaxOffer || null,
      detail: appraisal?.reconditioningData?.detail || "",
      paintPanel: appraisal?.reconditioningData?.paintPanel || "",
      rwc: appraisal?.reconditioningData?.rwc || "",
      registration: appraisal?.reconditioningData?.registration || "",
    }),
    [appraisal],
  );

  const {
    control,
    handleSubmit,
    formState: { isValid, isDirty: hasUnsavedChanges, isSubmitting },
    reset,
  } = useForm<AppraisalFormData>({
    mode: "onChange",
    values: initialFormData,
    defaultValues: initialFormData,
  });

  useEffect(() => {
    reset(initialFormData);
  }, [reset, initialFormData]);

  const onSubmit = async (data: AppraisalFormData) => {
    try {
      updateAppraisal(data);
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  const handleOkeyDraft = () => {
    try {
      completeAppraisal();

      router.back();
    } catch (error) {
      console.error("Okey Draft error:", error);
    }
  };

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

  const {
    showModal,
    handleNavigation,
    handleConfirmNavigation,
    handleCancelNavigation,
  } = useUnsavedChanges(hasUnsavedChanges);

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

  const appraisalTitle = `${appraisal?.vehicle.description} • ${appraisal?.vehicle.rego} • ${appraisal?.vehicle.vin}`;

  return (
    <DashboardPageLayout
      title={appraisalTitle}
      description="Complete the vehicle appraisal by updating the information below."
      breadcrumbs={breadcrumbs}
      actions={
        <div className="flex items-center justify-between gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={handleBackNavigation}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Appraisals
          </Button>
          <LoadingButton
            type="button"
            onClick={handleOkeyDraft}
            variant="primary"
            loading={isSubmitting}
            loadingText="Okey Draft"
            disabled={
              !appraisal?.lastOdometer ||
              !appraisal?.managerMaxOffer ||
              hasUnsavedChanges
            }
            icon={Check}
            label="Okey Draft"
          />
        </div>
      }
    >
      <div className="flex flex-col-reverse xl:flex-row gap-6">
        <section className="flex-1 flex flex-col gap-6">
          <LeadsTable leads={appraisal?.leads} />

          <PhotoCarousel photos={mockPhotos} />
        </section>
        <UpdateFormPanel
          data={{
            maxOffer: appraisal.maxOffer,
            maxOfferConfig: appraisal.appliedMaxOfferConfig,
            estimatedRetail: appraisal.estimatedRetail,
            estimatedTrade: appraisal.estimatedTrade,
          }}
          onSubmit={handleSubmit(onSubmit)}
          control={control}
          isSubmitting={isSubmitting}
          isValid={isValid}
          hasUnsavedChanges={hasUnsavedChanges}
        />
      </div>

      <UnsavedChangesModal
        isOpen={showModal}
        onClose={handleCancelNavigation}
        onConfirm={handleConfirmNavigation}
        onCancel={handleCancelNavigation}
      />
    </DashboardPageLayout>
  );
}
