"use client";

import { MoreHorizontal, RefreshCw, Search } from "lucide-react";
import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import type { User } from "@/stores/auth-store";

interface UsersTableProps {
  className?: string;
}

export const UsersTable: React.FC<UsersTableProps> = ({ className }) => {
  const [users, setUsers] = React.useState<User[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [search, setSearch] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [total, setTotal] = React.useState(0);
  const limit = 10;

  const fetchUsers = React.useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(search && { search }),
      });

      const response = await fetch(`/api/users?${params}`, {
        credentials: "include",
      });

      const data = await response.json();

      if (data.success) {
        setUsers(data.users || []);
        setTotal(data.total || 0);
      } else {
        setError(data.message || "Failed to fetch users");
      }
    } catch (err) {
      setError("Network error occurred");
      console.error("Users fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  React.useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Never";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            variant="outline"
            onClick={() => fetchUsers()}
            disabled={loading}
            className="flex items-center gap-2"
          >
            <RefreshCw className={cn("h-4 w-4", loading && "animate-spin")} />
            Refresh
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Last Login</TableHead>
              <TableHead className="w-[70px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <div className="h-4 w-32 animate-pulse rounded bg-muted" />
                  </TableCell>
                  <TableCell>
                    <div className="h-4 w-48 animate-pulse rounded bg-muted" />
                  </TableCell>
                  <TableCell>
                    <div className="h-4 w-20 animate-pulse rounded bg-muted" />
                  </TableCell>
                  <TableCell>
                    <div className="h-4 w-24 animate-pulse rounded bg-muted" />
                  </TableCell>
                  <TableCell>
                    <div className="h-4 w-24 animate-pulse rounded bg-muted" />
                  </TableCell>
                  <TableCell>
                    <div className="h-8 w-8 animate-pulse rounded bg-muted" />
                  </TableCell>
                </TableRow>
              ))
            ) : error ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  <div className="text-destructive">
                    <p className="text-sm font-medium">Error loading users</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {error}
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  <div className="text-muted-foreground">
                    <p className="text-sm font-medium">No users found</p>
                    <p className="text-xs mt-1">
                      {search
                        ? `No results for "${search}"`
                        : "No users to display"}
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">
                    <div>
                      <div className="font-medium">{`${user.firstName} ${user.lastName}`}</div>
                      <div className="text-xs text-muted-foreground">
                        ID: {user.id}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {user.roles.map((role) => (
                      <Badge key={role} variant="outline" className="mr-1">
                        {role}
                      </Badge>
                    ))}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {formatDate(user.createdAt)}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {user.lastLoginAt && formatDate(user.lastLoginAt)}
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {users.length} of {total} users
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1 || loading}
              className="h-8 px-3 text-sm"
            >
              Previous
            </Button>
            <div className="flex items-center space-x-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = i + 1;
                return (
                  <Button
                    key={pageNum}
                    variant={page === pageNum ? "primary" : "outline"}
                    onClick={() => setPage(pageNum)}
                    disabled={loading}
                    className="w-8 h-8 p-0 text-sm"
                  >
                    {pageNum}
                  </Button>
                );
              })}
            </div>
            <Button
              variant="outline"
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages || loading}
              className="h-8 px-3 text-sm"
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
