import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
  createdAt: string;
  lastLoginAt: string | null;
};

type AuthState = {
  user: User | null;
  isLoading: boolean;
  login: (creds: {
    email: string;
    password: string;
  }) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
  verifyAuth: () => Promise<void>;
};

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        login: async ({
          email,
          password,
        }: {
          email: string;
          password: string;
          remember?: boolean;
        }) => {
          set({ isLoading: true });

          try {
            const response = await fetch("/api/auth/login", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
              body: JSON.stringify({
                email,
                password,
              }),
            });

            const data = await response.json();

            if (response.ok && data.success) {
              const user = {
                id: data.user.id,
                email: data.user.email,
                firstName: data.user.firstName,
                lastName: data.user.lastName,
                roles: data.user.roles,
                createdAt: data.user.createdAt,
                lastLoginAt: data.user.lastLoginAt,
              };

              set({ user, isLoading: false });

              return { success: true };
            } else {
              set({ isLoading: false });

              return {
                success: false,
                message: data.message || "Login failed",
              };
            }
          } catch (error) {
            console.error("Login error:", error);

            set({ isLoading: false });

            return {
              success: false,
              message: "Network error. Please try again.",
            };
          }
        },
        logout: async () => {
          try {
            await fetch("/api/auth/logout", {
              method: "POST",
              credentials: "include",
            });
          } catch (error) {
            console.error("Logout error:", error);
          } finally {
            set({ user: null });
          }
        },
        verifyAuth: async () => {
          try {
            const response = await fetch("/api/auth/profile", {
              method: "GET",
              credentials: "include",
            });

            if (response.ok) {
              const data = await response.json();

              if (data.success && data.user) {
                const user = {
                  id: data.user.id,
                  email: data.user.email,
                  firstName: data.user.firstName,
                  lastName: data.user.lastName,
                  roles: data.user.roles,
                  createdAt: data.user.createdAt,
                  lastLoginAt: data.user.lastLoginAt,
                };

                set({ user });
              } else {
                set({ user: null });
              }
            } else {
              set({ user: null });
            }
          } catch (error) {
            console.error("Auth verification error:", error);

            set({ user: null });
          }
        },
      }),
      {
        name: "auth",
        partialize: (state) => ({
          user: state.user,
        }),
        onRehydrateStorage: () => async (state) => {
          await state?.verifyAuth();
        },
      },
    ),
  ),
);

export const useUser = () => useAuthStore((state) => state.user);
export const useIsAuthenticated = () =>
  useAuthStore((state) => Boolean(state.user));
export const useLogin = () => useAuthStore((state) => state.login);
export const useLogout = () => useAuthStore((state) => state.logout);
export const useIsLoading = () => useAuthStore((state) => state.isLoading);
