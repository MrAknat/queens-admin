"use client";

import { ArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { LeadsTable } from "@/components/appraisal/LeadsTable";
import { PhotoCarousel } from "@/components/appraisal/PhotoCarousel";
import { SummaryPanel } from "@/components/appraisal/SummaryPanel";
import { DashboardPageLayout } from "@/components/layout/dashboard-page-layout";
import { Loader } from "@/components/ui";
import { Button } from "@/components/ui/button";
import { useAppraisal } from "@/hooks/useAppraisals";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function PastAppraisalDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const appraisalId = params.id as string;

  const {
    data: appraisal,
    isLoading,
    isRefetching,
  } = useAppraisal(appraisalId);

  const handleBackNavigation = () => {
    router.push("/past-appraisals");
  };

  const breadcrumbs = [
    {
      label: "Past Appraisals",
      href: "/past-appraisals",
    },
    {
      label: appraisal?.vehicle.description || "Loading...",
      isCurrentPage: true,
      ...(isRefetching || isLoading ? { icon: Loader } : {}),
    },
  ];

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
            Back to Past Appraisals
          </Button>
        </div>
      </DashboardPageLayout>
    );
  }

  const appraisalTitle = `${appraisal?.vehicle.description} • ${appraisal?.vehicle.rego} • ${appraisal?.vehicle.vin}`;

  const renderPriceRow = (label: string, value: number | null | undefined) => (
    <div className="flex justify-between py-2 border-b last:border-0">
      <span className="text-gray-600">{label}</span>
      <span className="font-semibold">
        {value !== null && value !== undefined ? formatCurrency(value) : "-"}
      </span>
    </div>
  );

  const renderInfoRow = (
    label: string,
    value: string | number | null | undefined,
  ) => (
    <div className="flex justify-between py-2 border-b last:border-0">
      <span className="text-gray-600">{label}</span>
      <span className="font-medium">{value || "-"}</span>
    </div>
  );

  return (
    <DashboardPageLayout
      title={appraisalTitle}
      description="View details of this past appraisal."
      breadcrumbs={breadcrumbs}
      actions={
        <Button
          type="button"
          variant="outline"
          onClick={handleBackNavigation}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Past Appraisals
        </Button>
      }
    >
      <div className="flex flex-col-reverse xl:flex-row gap-6">
        <section className="flex-1 flex flex-col gap-6">
          <LeadsTable leads={appraisal?.leads} />

          <PhotoCarousel
            photos={appraisal?.photos || []}
            appraisalId={appraisalId}
            readOnly={true}
          />
        </section>
        <SummaryPanel
          date={formatDate(appraisal?.createdAt)}
          odometer={appraisal?.lastOdometer}
          estimatedRetail={appraisal?.estimatedRetail}
          managersMaxOffer={appraisal?.managerMaxOffer}
        />
      </div>
    </DashboardPageLayout>
  );
}
