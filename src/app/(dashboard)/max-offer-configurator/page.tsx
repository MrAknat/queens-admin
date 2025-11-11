import { DashboardPageLayout } from "@/components/layout/dashboard-page-layout";
import { MaxOfferConfiguratorForm } from "@/components/maxOfferConfigurator/MaxOfferConfiguratorForm";

export default function MaxOfferConfiguratorPage() {
  return (
    <DashboardPageLayout
      title="Max Offer Configurator"
      description="Configure maximum offer settings for appraisals."
    >
      <MaxOfferConfiguratorForm />
    </DashboardPageLayout>
  );
}
