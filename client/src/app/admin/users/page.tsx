"use client";
import React, { useEffect, useState } from "react";
import api from "../../../api";
import { Trash2, Shield, User } from "lucide-react";

export default function AdminUsers() {
  const [users, setUsers] = useState<any[]>([]);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/users");
      setUsers(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Danger! Are you sure you want to delete this user?")) return;
    try {
      await api.delete(`/users/${id}`);
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1 className="title-lg" style={{ marginBottom: "2rem" }}>
        Manage Users
      </h1>
      <div className="glass-panel" style={{ padding: 0, overflow: "hidden" }}>
        <table className="data-table">
          <thead style={{ background: "rgba(0,0,0,0.2)" }}>
            <tr>
              <th>Role</th>
              <th>Username</th>
              <th>Email</th>
              <th style={{ textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td>
                  {u.role === "admin" ? (
                    <span
                      className="badge"
                      style={{
                        background: "rgba(236, 72, 153, 0.2)",
                        color: "var(--secondary-color)",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.25rem",
                      }}
                    >
                      <Shield size={14} /> Admin
                    </span>
                  ) : (
                    <span
                      className="badge"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.25rem",
                      }}
                    >
                      <User size={14} /> User
                    </span>
                  )}
                </td>
                <td style={{ fontWeight: 500 }}>{u.username}</td>
                <td style={{ color: "var(--text-secondary)" }}>{u.email}</td>
                <td style={{ textAlign: "right" }}>
                  <button
                    onClick={() => handleDelete(u._id)}
                    className="btn-icon"
                    style={{
                      display: "inline-flex",
                      color: "var(--danger-color)",
                    }}
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
