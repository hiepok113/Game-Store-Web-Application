"use client";
import React, { useEffect, useState } from "react";
import api from "../../api";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { Trash2, CreditCard } from "lucide-react";
import { motion } from "framer-motion";

export default function Cart() {
  const { user } = useAuth();
  const { fetchCart } = useCart();
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadCartData = async () => {
    if (!user) return;
    try {
      const { data: carts } = await api.get(`/carts/${user._id}`);

      const gamePromises = carts.map((c: any) => api.get(`/games/${c.gameId}`));
      const gamesResponses = await Promise.all(gamePromises);
      const items = gamesResponses.map((res: any) => res.data);
      setCartItems(items);
    } catch (err: any) {
      if (err.response?.status !== 401) {
        console.error("Error loading cart data", err);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCartData();
  }, [user]);

  const handleRemove = async (gameId: string) => {
    if (!user) return;
    try {
      await api.delete(`/carts/${user._id}/${gameId}`);
      await fetchCart();
      await loadCartData();
    } catch (err: any) {
      if (err.response?.status !== 401) {
        console.error("Error removing from cart", err);
      }
    }
  };

  const handleCheckout = async () => {
    if (!user) return;
    try {
      const orderItems = cartItems.map((item) => item._id);
      const { data: order } = await api.post("/orders", {
        userId: user._id,
        items: orderItems,
        totalAmount: total,
      });

      const { data } = await api.post("/payment/create_payment_url", {
        amount: total,
        orderInfo: order._id,
      });
      if (data.paymentUrl) {
        window.location.href = data.paymentUrl;
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!user)
    return (
      <div
        className="container"
        style={{ padding: "5rem", textAlign: "center" }}
      >
        Please login to view your cart.
      </div>
    );
  if (loading)
    return (
      <div
        className="container"
        style={{ padding: "5rem", textAlign: "center" }}
      >
        Loading cart...
      </div>
    );

  const total = cartItems.reduce((acc, curr) => acc + (curr.price || 0), 0);

  return (
    <div className="container" style={{ paddingBottom: "4rem" }}>
      <h1 className="title-xl gradient-text" style={{ marginBottom: "3rem" }}>
        Your Vault ({cartItems.length})
      </h1>
      {cartItems.length === 0 ? (
        <div
          className="glass-panel"
          style={{ textAlign: "center", padding: "4rem" }}
        >
          <h2 className="title-lg">Your cart is empty</h2>
        </div>
      ) : (
        <div style={{ display: "flex", gap: "3rem", flexWrap: "wrap" }}>
          <div style={{ flex: "2", minWidth: "300px" }}>
            {cartItems.map((item, idx) => (
              <motion.div
                className="glass-panel"
                key={`${item._id}-${idx}`}
                style={{
                  display: "flex",
                  gap: "1.5rem",
                  marginBottom: "1.5rem",
                  alignItems: "center",
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <img
                  src={item.image}
                  style={{
                    width: "120px",
                    height: "80px",
                    objectFit: "cover",
                    borderRadius: "0.5rem",
                  }}
                  alt={item.title}
                />
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: 600 }}>
                    {item.title}
                  </h3>
                  <span className="badge">{item.category}</span>
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
                  }).format(item.price)}
                </div>
                <button
                  onClick={() => handleRemove(item._id)}
                  className="btn-icon"
                  style={{ padding: "1rem", color: "var(--danger-color)" }}
                >
                  <Trash2 size={24} />
                </button>
              </motion.div>
            ))}
          </div>

          <div style={{ flex: "1", minWidth: "300px" }}>
            <div
              className="glass-panel"
              style={{ position: "sticky", top: "100px" }}
            >
              <h2 className="title-lg" style={{ marginBottom: "1.5rem" }}>
                Summary
              </h2>
              <div
                className="flex-between"
                style={{ marginBottom: "1rem", fontSize: "1.125rem" }}
              >
                <span style={{ color: "var(--text-secondary)" }}>Subtotal</span>
                <span>
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(total)}
                </span>
              </div>
              <div
                className="flex-between"
                style={{ marginBottom: "2rem", fontSize: "1.125rem" }}
              >
                <span style={{ color: "var(--text-secondary)" }}>Taxes</span>
                <span>
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(0)}
                </span>
              </div>
              <div
                className="flex-between"
                style={{
                  marginBottom: "2rem",
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  borderTop: "1px solid var(--glass-border)",
                  paddingTop: "1rem",
                }}
              >
                <span>Total</span>
                <span className="gradient-text">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(total)}
                </span>
              </div>
              <button
                onClick={handleCheckout}
                className="btn btn-primary"
                style={{ width: "100%", padding: "1rem", fontSize: "1.125rem" }}
              >
                <CreditCard size={20} /> Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
