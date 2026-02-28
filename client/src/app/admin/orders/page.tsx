"use client";
import React, { useEffect, useState } from "react";
import api from "../../../api";
import { format } from "date-fns";

export default function AdminOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const { data } = await api.get("/orders");
      setOrders(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      await api.put(`/orders/${id}/status`, { status: newStatus });
      fetchOrders();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div>Loading orders...</div>;

  return (
    <div>
      <div className="flex-between" style={{ marginBottom: "2rem" }}>
        <h1 className="title-xl gradient-text">Manage Orders</h1>
      </div>
      <div className="glass-panel" style={{ overflowX: "auto" }}>
        <table
          className="admin-table"
          style={{ width: "100%", borderCollapse: "collapse" }}
        >
          <thead>
            <tr
              style={{
                borderBottom: "1px solid var(--glass-border)",
                textAlign: "left",
              }}
            >
              <th style={{ padding: "1rem" }}>ID</th>
              <th style={{ padding: "1rem" }}>User ID</th>
              <th style={{ padding: "1rem" }}>Date</th>
              <th style={{ padding: "1rem" }}>Items</th>
              <th style={{ padding: "1rem" }}>Total</th>
              <th style={{ padding: "1rem" }}>Status</th>
              <th style={{ padding: "1rem" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order._id}
                style={{ borderBottom: "1px solid var(--glass-border)" }}
              >
                <td style={{ padding: "1rem" }}>
                  {order._id.substring(0, 8)}...
                </td>
                <td style={{ padding: "1rem" }}>
                  {order.userId.substring(0, 8)}...
                </td>
                <td style={{ padding: "1rem" }}>
                  {format(new Date(order.createdAt), "dd/MM/yyyy HH:mm")}
                </td>
                <td style={{ padding: "1rem" }}>
                  {order.items.map((i: any) => i.title || i).join(", ")}
                </td>
                <td style={{ padding: "1rem", color: "var(--accent-color)" }}>
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(order.totalAmount)}
                </td>
                <td style={{ padding: "1rem" }}>
                  <span
                    className="badge"
                    style={{
                      background:
                        order.status === "paid"
                          ? "rgba(16, 185, 129, 0.2)"
                          : order.status === "pending"
                            ? "rgba(245, 158, 11, 0.2)"
                            : "rgba(239, 68, 68, 0.2)",
                      color:
                        order.status === "paid"
                          ? "#10b981"
                          : order.status === "pending"
                            ? "#f59e0b"
                            : "#ef4444",
                    }}
                  >
                    {order.status.toUpperCase()}
                  </span>
                </td>
                <td style={{ padding: "1rem" }}>
                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(order._id, e.target.value)}
                    className="form-input"
                    style={{ padding: "0.5rem", width: "auto" }}
                  >
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                    <option value="failed">Failed</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
