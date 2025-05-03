"use client";
import React, { useState } from "react";
import { Modal, Button, Input } from "@heroui/react";

import axiosClient from "@/lib/axiosClient";
import { authEvents } from "@/lib/authEvents";
import LoadingSpinner from "@/components/LoadingSpinner";

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
      const response = await axiosClient.post("/users/login", {
        email,
        password,
      });

      localStorage.setItem("access_token", response.data.accessToken);
      localStorage.setItem("refresh_token", response.data.refreshToken);

      // Emit login event to update navbar
      authEvents.emitLogin();

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
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <LoadingSpinner color="secondary" size="sm" />
                <span>Logging in...</span>
              </div>
            ) : (
              "Login"
            )}
          </Button>
        </form>
        <Button
          className="mt-4 w-full"
          variant="ghost"
          onPress={() => onOpenChange(false)}
        >
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default LoginModal;
