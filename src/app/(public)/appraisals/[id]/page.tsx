"use client";

import { useParams } from "next/navigation";
import { LeadsTable } from "@/components/appraisal/LeadsTable";
import { PhotoCarousel } from "@/components/appraisal/PhotoCarousel";
import { SummaryPanel } from "@/components/appraisal/SummaryPanel";
import { Loader } from "@/components/ui";
import { useAppraisal } from "@/hooks/useAppraisals";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function PublicAppraisalDetailsPage() {
  const params = useParams();

  const appraisalId = params.id as string;

  const { data: appraisal, isLoading } = useAppraisal(appraisalId, true);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6 items-start justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight">
            Loading Appraisal
          </h1>
          <p className="text-muted-foreground">
            Please wait while we load the appraisal details.
          </p>
        </div>
        <div className="text-center py-12">
          <Loader className="w-8 h-8" />
        </div>
      </div>
    );
  }

  if (!appraisal) {
    return (
      <div className="flex flex-col gap-6 items-start justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight">
            Appraisal Not Found
          </h1>
          <p className="text-muted-foreground">
            The requested appraisal could not be found.
          </p>
        </div>
      </div>
    );
  }

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

  const appraisalTitle = `${appraisal?.vehicle.description} • ${appraisal?.vehicle.rego} • ${appraisal?.vehicle.vin}`;

  return (
    <div className="flex flex-col gap-6 items-start justify-between">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">{appraisalTitle}</h1>
        <p className="text-muted-foreground">View details of your appraisal.</p>
      </div>
      <div className="flex w-full flex-col-reverse xl:flex-row gap-6">
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
    </div>
  );
}
