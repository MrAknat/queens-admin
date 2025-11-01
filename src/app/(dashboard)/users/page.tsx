"use client";

import { Plus } from "lucide-react";
import { DashboardPageLayout } from "@/components/layout/dashboard-page-layout";
import { Button } from "@/components/ui/button";
import { UsersTable } from "@/components/users/users-table";

export default function UsersPage() {
  return (
    <DashboardPageLayout
      title="Users"
      description="Manage user accounts and permissions."
    >
      <UsersTable />
    </DashboardPageLayout>
  );
}
