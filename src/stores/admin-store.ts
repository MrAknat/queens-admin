"use client";

import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { useUser } from "./auth-store";

interface AdminState {
  adminModeEnabled: boolean;
  toggleAdminMode: () => void;
  setAdminMode: (enabled: boolean) => void;
}

export const useAdminStore = create<AdminState>()(
  devtools(
    persist(
      (set) => ({
        adminModeEnabled: true, // Default to enabled for admin users
        toggleAdminMode: () =>
          set((state) => ({ adminModeEnabled: !state.adminModeEnabled })),
        setAdminMode: (enabled) => set({ adminModeEnabled: enabled }),
      }),
      {
        name: "admin-mode",
        partialize: (state) => ({
          adminModeEnabled: state.adminModeEnabled,
        }),
      },
    ),
  ),
);

export const useAdminModeEnabled = () =>
  useAdminStore((state) => state.adminModeEnabled);

export const useToggleAdminMode = () =>
  useAdminStore((state) => state.toggleAdminMode);

export const useSetAdminMode = () =>
  useAdminStore((state) => state.setAdminMode);

export const useIsAdminModeActive = () => {
  const user = useUser();
  const adminModeEnabled = useAdminModeEnabled();

  const hasAdminRole = user?.roles?.includes("admin") ?? false;

  return hasAdminRole && adminModeEnabled;
};

export const useHasAdminRole = () => {
  const user = useUser();

  return user?.roles?.includes("admin") ?? false;
};
