"use client";
import { Button } from "@heroui/react";
import { Input } from "@heroui/react";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Link } from "@heroui/react";

import { title } from "@/components/primitives";
import axiosClient from "@/lib/axiosClient";
import LoadingSpinner from "@/components/LoadingSpinner";
import { authEvents } from "@/lib/authEvents";

export default function LoginPage() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axiosClient.post("/users/login", {
        email,
        password,
      });

      // Save response data temporarily
      const { accessToken, refreshToken } = response.data;

      console.log("Login response:", response.data);
      // Use a custom event to handle storage in useEffect
      window.dispatchEvent(
        new CustomEvent("login-success", {
          detail: { accessToken, refreshToken },
        }),
      );

      // Use router for client-side navigation
      router.push("/");
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (token) {
      router.push("/");
    }
  }, [router]);

  // Handle localStorage in useEffect
  useEffect(() => {
    const handleLoginSuccess = (event: any) => {
      const { accessToken, refreshToken } = event.detail;

      // Store in localStorage for API requests
      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("refresh_token", refreshToken);

      // Emit login event for the navbar to detect
      authEvents.emitLogin();
    };

    window.addEventListener("login-success", handleLoginSuccess);

    return () =>
      window.removeEventListener("login-success", handleLoginSuccess);
  }, []);

  return (
    <div>
      <h1 className={title()}>Login</h1>
      <form className="mt-5 w-full" onSubmit={handleSubmit}>
        <Input
          required
          className="mb-4"
          fullWidth={true}
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          required
          className="mb-4"
          fullWidth={true}
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          className="w-full"
          color="primary"
          disabled={loading}
          type="submit"
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <LoadingSpinner color="secondary" size="sm" />
              <span>Logging in...</span>
            </div>
          ) : (
            "Login"
          )}
        </Button>
        <Link className="mt-4 block text-center" href="/register">
          Don&apos;t have an account? Register
        </Link>
        {error && <div className="mt-4 text-red-500 text-center">{error}</div>}
        <Link className="mt-4 block text-center" href="/forgot-password">
          Forgot Password?
        </Link>
      </form>
    </div>
  );
}
