import { LogOut } from "lucide-react";
import { redirect } from "next/navigation";
import { useLogout } from "@/stores/auth-store";
import { Button } from "./button";

export const LogoutButton = () => {
  const logout = useLogout();

  const handleClick = async () => {
    await logout();

    redirect("/login");
  };

  return (
    <Button
      variant="outline"
      className="text-destructive hover:bg-destructive"
      onClick={handleClick}
    >
      <LogOut className="mr-2 h-4 w-4" />
      Logout
    </Button>
  );
};
