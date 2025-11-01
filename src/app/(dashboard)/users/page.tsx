"use client";

import { DashboardPageLayout } from "@/components/layout/dashboard-page-layout";
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
