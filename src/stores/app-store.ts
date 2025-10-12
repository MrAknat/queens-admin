import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user" | "moderator";
}

interface AppState {
  // User state
  user: User | null;
  isAuthenticated: boolean;

  // UI state
  sidebarOpen: boolean;
  theme: "light" | "dark" | "system";

  // Loading states
  isLoading: boolean;

  // Actions
  setUser: (user: User | null) => void;
  login: (user: User) => void;
  logout: () => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setTheme: (theme: "light" | "dark" | "system") => void;
  setLoading: (loading: boolean) => void;
}

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set, _get) => ({
        // Initial state
        user: null,
        isAuthenticated: false,
        sidebarOpen: true,
        theme: "system",
        isLoading: false,

        // Actions
        setUser: (user) =>
          set(
            {
              user,
              isAuthenticated: !!user,
            },
            false,
            "setUser",
          ),

        login: (user) =>
          set(
            {
              user,
              isAuthenticated: true,
            },
            false,
            "login",
          ),

        logout: () =>
          set(
            {
              user: null,
              isAuthenticated: false,
            },
            false,
            "logout",
          ),

        toggleSidebar: () =>
          set(
            (state) => ({ sidebarOpen: !state.sidebarOpen }),
            false,
            "toggleSidebar",
          ),

        setSidebarOpen: (open) =>
          set({ sidebarOpen: open }, false, "setSidebarOpen"),

        setTheme: (theme) => set({ theme }, false, "setTheme"),

        setLoading: (loading) =>
          set({ isLoading: loading }, false, "setLoading"),
      }),
      {
        name: "queens-admin-storage",
        partialize: (state) => ({
          user: state.user,
          isAuthenticated: state.isAuthenticated,
          sidebarOpen: state.sidebarOpen,
          theme: state.theme,
        }),
      },
    ),
    {
      name: "queens-admin-store",
    },
  ),
);

// Selectors for better performance
export const useUser = () => useAppStore((state) => state.user);
export const useIsAuthenticated = () =>
  useAppStore((state) => state.isAuthenticated);
export const useSidebarOpen = () => useAppStore((state) => state.sidebarOpen);
export const useTheme = () => useAppStore((state) => state.theme);
export const useIsLoading = () => useAppStore((state) => state.isLoading);

// Action selectors
export const useAppActions = () =>
  useAppStore((state) => ({
    setUser: state.setUser,
    login: state.login,
    logout: state.logout,
    toggleSidebar: state.toggleSidebar,
    setSidebarOpen: state.setSidebarOpen,
    setTheme: state.setTheme,
    setLoading: state.setLoading,
  }));
