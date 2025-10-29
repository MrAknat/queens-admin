import { useIsAdminModeActive } from "@/stores/admin-store";

export function useAdminContent() {
  const isAdminModeActive = useIsAdminModeActive();

  return {
    isAdminModeActive,
    renderIfAdmin: (
      adminContent: React.ReactNode,
      fallbackContent?: React.ReactNode,
    ) => {
      return isAdminModeActive ? adminContent : (fallbackContent ?? null);
    },
    getAdminClasses: (adminClasses: string, defaultClasses = "") => {
      return isAdminModeActive ? adminClasses : defaultClasses;
    },
  };
}
