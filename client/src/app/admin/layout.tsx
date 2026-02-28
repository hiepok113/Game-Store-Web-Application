"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Gamepad2,
  Users,
  FolderTree,
  LogOut,
  ShoppingCart,
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading) {
      if (!user || user.role !== "admin") {
        router.push("/");
      }
    }
  }, [user, loading, router]);

  if (loading || !user || user.role !== "admin")
    return (
      <div
        className="container"
        style={{ padding: "5rem", textAlign: "center" }}
      >
        Checking Clearance...
      </div>
    );

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "var(--bg-darker)",
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          width: "280px",
          borderRight: "1px solid var(--glass-border)",
          background: "rgba(2, 6, 23, 0.95)",
          padding: "2rem 1.5rem",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ marginBottom: "3rem", paddingLeft: "1rem" }}>
          <span
            className="gradient-text"
            style={{ fontSize: "1.75rem", fontWeight: 800 }}
          >
            GV Admin
          </span>
        </div>

        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            flex: 1,
          }}
        >
          <NavLink
            href="/admin"
            icon={<LayoutDashboard size={20} />}
            active={pathname === "/admin"}
            label="Dashboard"
          />
          <NavLink
            href="/admin/games"
            icon={<Gamepad2 size={20} />}
            active={pathname === "/admin/games"}
            label="Manage Games"
          />
          <NavLink
            href="/admin/orders"
            icon={<ShoppingCart size={20} />}
            active={pathname === "/admin/orders"}
            label="Orders"
          />
          <NavLink
            href="/admin/categories"
            icon={<FolderTree size={20} />}
            active={pathname === "/admin/categories"}
            label="Categories"
          />
          <NavLink
            href="/admin/users"
            icon={<Users size={20} />}
            active={pathname === "/admin/users"}
            label="Users"
          />
        </nav>

        <div
          style={{
            marginTop: "auto",
            borderTop: "1px solid var(--glass-border)",
            paddingTop: "1.5rem",
          }}
        >
          <button
            onClick={logout}
            className="btn"
            style={{
              width: "100%",
              justifyContent: "flex-start",
              color: "var(--text-secondary)",
              background: "transparent",
            }}
          >
            <LogOut size={20} color="var(--danger-color)" /> Return to Login
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: "3rem", overflowY: "auto" }}>
        {children}
      </main>
    </div>
  );
}

const NavLink = ({
  href,
  icon,
  active,
  label,
}: {
  href: string;
  icon: any;
  active: boolean;
  label: string;
}) => (
  <Link
    href={href}
    style={{
      display: "flex",
      alignItems: "center",
      gap: "1rem",
      padding: "1rem",
      borderRadius: "0.75rem",
      background: active
        ? "linear-gradient(135deg, rgba(99, 102, 241, 0.2), transparent)"
        : "transparent",
      color: active ? "white" : "var(--text-secondary)",
      borderLeft: active
        ? "3px solid var(--primary-color)"
        : "3px solid transparent",
      transition: "all 0.2s",
    }}
  >
    {icon}
    <span style={{ fontWeight: 500 }}>{label}</span>
  </Link>
);
