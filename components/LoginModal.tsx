"use client";
import React, { useState } from "react";
import { Modal, Button, Input } from "@heroui/react";
import axiosClient from "@/lib/axiosClient";

interface LoginModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

const LoginModal = ({ isOpen, onOpenChange }: LoginModalProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await axiosClient.post("/auth/login", { email, password });
      localStorage.setItem("access_token", response.data.accessToken);
      localStorage.setItem("refresh_token", response.data.refreshToken);
      onOpenChange(false);
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <div className="p-6 bg-white rounded-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        {error && <p className="text-danger mb-2">{error}</p>}
        <form onSubmit={handleSubmit}>
          <Input
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
            className="mb-4"
          />
          <Input
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
            className="mb-4"
          />
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
        <Button
          variant="ghost"
          onPress={() => onOpenChange(false)}
          className="mt-4 w-full"
        >
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default LoginModal;
