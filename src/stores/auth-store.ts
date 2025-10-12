import { create } from "zustand";

type User = {
  id: string;
  email: string;
  name?: string;
};

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (creds: {
    email: string;
    password: string;
    remember?: boolean;
  }) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
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
}));
