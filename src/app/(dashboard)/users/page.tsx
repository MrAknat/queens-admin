import { UsersTable } from "@/components/users/users-table";

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Users</h2>
        <p className="text-muted-foreground">
          Manage user accounts and permissions.
        </p>
      </div>

      <UsersTable />
    </div>
  );
}
