"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import {
  ShoppingCart,
  LayoutDashboard,
  LogOut,
  LogIn,
  Store,
  Package,
} from "lucide-react";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const pathname = usePathname();

  if (
    pathname.startsWith("/admin") ||
    pathname === "/login" ||
    pathname === "/register"
  ) {
    return null; // hide navbar on admin and auth
  }

  return (
    <nav className="navbar">
      <div className="container flex-between">
        <div className="nav-links">
          <Link href="/" className="flex-center" style={{ gap: "0.5rem" }}>
            <span
              style={{
                fontSize: "1.5rem",
                fontWeight: 800,
                color: "var(--primary-color)",
              }}
            >
              GameVault
            </span>
          </Link>
          <div style={{ paddingLeft: "2rem" }} className="nav-links">
            <Link
              href="/"
              className={`nav-link ${pathname === "/" ? "active" : ""}`}
            >
              Home
            </Link>
            <Link
              href="/games"
              className={`nav-link ${pathname === "/games" ? "active" : ""}`}
            >
              Store
            </Link>
          </div>
        </div>

        <div className="nav-actions">
          {user ? (
            <>
              {user.role === "admin" && (
                <Link
                  href="/admin"
                  className="btn btn-secondary"
                  style={{ padding: "0.5rem 1rem" }}
                >
                  <LayoutDashboard size={18} />
                  Dashboard
                </Link>
              )}
              <Link
                href="/orders"
                className="btn-icon"
                style={{ position: "relative" }}
                title="My Orders"
              >
                <Package size={20} />
              </Link>
              <Link
                href="/cart"
                className="btn-icon"
                style={{ position: "relative" }}
              >
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span
                    style={{
                      position: "absolute",
                      top: "-5px",
                      right: "-5px",
                      background: "var(--accent-color)",
                      color: "white",
                      fontSize: "10px",
                      fontWeight: "bold",
                      width: "18px",
                      height: "18px",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {cartCount}
                  </span>
                )}
              </Link>
              <div
                className="flex-center"
                style={{
                  gap: "0.5rem",
                  marginLeft: "1rem",
                  borderLeft: "1px solid var(--glass-border)",
                  paddingLeft: "1rem",
                }}
              >
                <span className="nav-link" style={{ fontSize: "0.875rem" }}>
                  Hi, {user.username}
                </span>
                <button onClick={logout} className="btn-icon" title="Logout">
                  <LogOut size={18} color="var(--danger-color)" />
                </button>
              </div>
            </>
          ) : (
            <>
              <Link href="/login" className="btn btn-secondary">
                <LogIn size={18} /> Login
              </Link>
              <Link href="/register" className="btn btn-primary">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
