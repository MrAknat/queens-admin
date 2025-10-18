"use client";

import { redirect } from "next/navigation";
import * as React from "react";
import { type FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useIsLoading, useLogin } from "@/stores/auth-store";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useLogin();
  const isLoading = useIsLoading();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    const res = await login({ email, password });

    if (!res.success) {
      setError(res.message || "Login failed");
    } else {
      redirect("/dashboard");
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="text-center">
          <div className="text-2xl font-bold">Queens</div>
          <div className="text-sm text-muted-foreground">Control Panel</div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Checkbox
                id="remember"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              <Label htmlFor="remember">Remember me</Label>
            </div>
            <a className="text-sm text-primary hover:underline" href="/">
              Forgot password?
            </a>
          </div>

          {error && <div className="text-sm text-destructive">{error}</div>}

          <CardFooter>
            <Button
              type="submit"
              variant="primary"
              className="w-full"
              loading={isLoading}
            >
              Sign In
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
