import { useUser } from "@/stores/auth-store";

export const useUserRoles = () => {
  const user = useUser();

  return {
    roles: user?.roles || [],
    hasRole: (role: string) => {
      return user?.roles?.includes(role) ?? false;
    },
    hasAnyRole: (roles: string[]) => {
      if (!roles || roles.length === 0) {
        return true;
      }

      return roles.some((role) => user?.roles?.includes(role));
    },
    hasEveryRole: (roles: string[]) => {
      return roles.every((role) => user?.roles?.includes(role));
    },
    hasAdminRole: () => {
      return user?.roles?.includes("admin") ?? false;
    },
  };
};
