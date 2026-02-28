"use client";
import React, { useEffect, useState } from "react";
import api from "../../api";
import { format } from "date-fns";
import { useAuth } from "../../context/AuthContext";
import { motion } from "framer-motion";
import { Package } from "lucide-react";

export default function UserOrders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    if (!user) return;
    try {
      const { data } = await api.get(`/orders/user/${user._id}`);
      setOrders(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [user]);

  if (!user) {
    return (
      <div
        className="container"
        style={{ padding: "5rem", textAlign: "center" }}
      >
        Please login to view your orders.
      </div>
    );
  }

  if (loading) {
    return (
      <div
        className="container"
        style={{ padding: "5rem", textAlign: "center" }}
      >
        Loading your orders...
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingBottom: "4rem" }}>
      <h1 className="title-xl gradient-text" style={{ marginBottom: "3rem" }}>
        Order History
      </h1>

      {orders.length === 0 ? (
        <div
          className="glass-panel"
          style={{ textAlign: "center", padding: "4rem" }}
        >
          <Package
            size={64}
            style={{ color: "var(--text-secondary)", margin: "0 auto 1.5rem" }}
          />
          <h2 className="title-lg">No orders found</h2>
          <p className="subtitle">You haven't purchased anything yet!</p>
        </div>
      ) : (
        <div
          style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          {orders.map((order, idx) => (
            <motion.div
              key={order._id}
              className="glass-panel"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              style={{ padding: "2rem" }}
            >
              <div
                className="flex-between"
                style={{
                  borderBottom: "1px solid var(--glass-border)",
                  paddingBottom: "1.5rem",
                  marginBottom: "1.5rem",
                }}
              >
                <div>
                  <h3
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: 600,
                      marginBottom: "0.25rem",
                    }}
                  >
                    Order #
                    {order._id.substring(order._id.length - 8).toUpperCase()}
                  </h3>
                  <div
                    style={{
                      color: "var(--text-secondary)",
                      fontSize: "0.875rem",
                    }}
                  >
                    Placed on{" "}
                    {format(
                      new Date(order.createdAt),
                      "MMMM dd, yyyy 'at' HH:mm",
                    )}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
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
                      fontSize: "1rem",
                      padding: "0.5rem 1rem",
                    }}
                  >
                    {order.status.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="flex-between">
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      color: "var(--text-secondary)",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Games Purchased:
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "1rem",
                      marginBottom: "1rem",
                    }}
                  >
                    {order.items.map((game: any, i: number) => (
                      <div
                        key={i}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.75rem",
                          background: "rgba(255,255,255,0.05)",
                          padding: "0.5rem",
                          borderRadius: "0.5rem",
                        }}
                      >
                        {game.image && (
                          <img
                            src={game.image}
                            alt={game.title}
                            style={{
                              width: "40px",
                              height: "40px",
                              objectFit: "cover",
                              borderRadius: "0.25rem",
                            }}
                          />
                        )}
                        <span style={{ fontSize: "0.875rem", fontWeight: 500 }}>
                          {game.title || game}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div style={{ fontSize: "1rem" }}>
                    <span
                      style={{
                        color: "var(--text-secondary)",
                        marginRight: "0.5rem",
                      }}
                    >
                      Payment Method:
                    </span>
                    <strong>{order.paymentMethod}</strong>
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div
                    style={{
                      color: "var(--text-secondary)",
                      marginBottom: "0.25rem",
                    }}
                  >
                    Total Amount
                  </div>
                  <div
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: 700,
                      color: "var(--accent-color)",
                    }}
                  >
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(order.totalAmount)}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
