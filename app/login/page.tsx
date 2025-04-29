"use client";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

import { title } from "@/components/primitives";
import axiosClient from "@/lib/axiosClient";

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

  // Handle localStorage in useEffect
  useEffect(() => {
    const handleLoginSuccess = (event: any) => {
      const { accessToken, refreshToken } = event.detail;

      // Store in localStorage for API requests
      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("refresh_token", refreshToken);
    };

    window.addEventListener("login-success", handleLoginSuccess);

    return () =>
      window.removeEventListener("login-success", handleLoginSuccess);
  }, []);

  return (
    <div>
      <h1 className={title()}>Login</h1>
      <form onSubmit={handleSubmit}>
        <Input
          required
          className="mb-4"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          required
          className="mb-4"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button className="w-full" disabled={loading} type="submit">
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>
    </div>
  );
}
