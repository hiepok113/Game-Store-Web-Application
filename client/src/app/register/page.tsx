"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "../../api";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";

export default function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      router.push("/");
    }
  }, [user, loading, router]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", { email, username, password });
      router.push("/login");
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Registration failed. Email may exist.",
      );
    }
  };

  return (
    <div
      className="flex-center"
      style={{ minHeight: "calc(100vh - 100px)", padding: "2rem" }}
    >
      <motion.div
        className="glass-panel"
        style={{ width: "100%", maxWidth: "400px" }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <h1
          className="title-lg gradient-text"
          style={{ textAlign: "center", marginBottom: "2rem" }}
        >
          Join the Vault
        </h1>
        {error && (
          <p
            style={{
              color: "var(--danger-color)",
              textAlign: "center",
              marginBottom: "1rem",
            }}
          >
            {error}
          </p>
        )}
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-input"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Choose a username"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-input"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: "100%", marginTop: "1rem" }}
          >
            Create Account
          </button>
        </form>
        <p
          style={{
            textAlign: "center",
            marginTop: "1.5rem",
            color: "var(--text-secondary)",
          }}
        >
          Already have an account?{" "}
          <Link href="/login" style={{ color: "var(--primary-color)" }}>
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
