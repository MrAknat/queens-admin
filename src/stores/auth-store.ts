import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type User = {
  id: string;
  email: string;
  name?: string;
};

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  hasHydrated: boolean;
  setHasHydrated: (hydrated: boolean) => void;
  login: (creds: {
    email: string;
    password: string;
    remember?: boolean;
  }) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        hasHydrated: false,
        setHasHydrated: (hydrated) => set({ hasHydrated: hydrated }),
        login: async ({
          email,
          password,
          remember,
        }: {
          email: string;
          password: string;
          remember?: boolean;
        }) => {
          set({ isLoading: true });
          // Simulate API call
          await new Promise((r) => setTimeout(r, 1000));

          if (email === "admin@example.com" && password === "password") {
            const user = { id: "1", email, name: "Admin" };
            set({ user, isAuthenticated: true, isLoading: false });
            return { success: true };
          }

          set({ isLoading: false });
          return { success: false, message: "Invalid credentials" };
        },
        logout: () => set({ user: null, isAuthenticated: false }),
      }),
      {
        name: "auth-storage",
        partialize: (state) => ({
          user: state.user,
          isAuthenticated: state.isAuthenticated,
        }),
        onRehydrateStorage: () => (state) => {
          state?.setHasHydrated(true);
        },
      },
    ),
  ),
);

export const useUser = () => useAuthStore((state) => state.user);
export const useIsAuthenticated = () =>
  useAuthStore((state) => state.isAuthenticated);
export const useLogin = () => useAuthStore((state) => state.login);
export const useLogout = () => useAuthStore((state) => state.logout);
export const useIsLoading = () => useAuthStore((state) => state.isLoading);
export const useHasHydrated = () => useAuthStore((state) => state.hasHydrated);
