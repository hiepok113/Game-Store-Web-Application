"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "../../../api";
import { useCart } from "../../../context/CartContext";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";

export default function GameDetail() {
  const params = useParams();
  const id = params?.id as string;
  const [game, setGame] = useState<any>(null);
  const { addToCart } = useCart();
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (id) {
      api
        .get(`/games/${id}`)
        .then((res) => setGame(res.data))
        .catch(console.error);
    }
  }, [id]);

  if (!game)
    return (
      <div
        className="container"
        style={{ textAlign: "center", padding: "5rem" }}
      >
        Loading...
      </div>
    );

  const handleAddCart = async () => {
    try {
      await addToCart(game._id);
      setMessage("Added to cart successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (err: any) {
      setMessage(err.message || "Failed to add to cart");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <div className="container" style={{ paddingBottom: "4rem" }}>
      <motion.article
        className="glass-panel"
        style={{
          display: "flex",
          gap: "3rem",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div style={{ flex: "1", minWidth: "300px" }}>
          <img
            src={
              game.image ||
              "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&q=80"
            }
            alt={game.title}
            style={{
              width: "100%",
              borderRadius: "1rem",
              border: "1px solid var(--glass-border)",
            }}
          />
        </div>
        <div
          style={{
            flex: "1",
            minWidth: "300px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span
            className="badge"
            style={{ alignSelf: "flex-start", marginBottom: "1rem" }}
          >
            {game.category}
          </span>
          <h1 className="title-xl" style={{ maxWidth: "14ch" }}>
            {game.title}
          </h1>
          <p
            className="subtitle"
            style={{ fontSize: "1.25rem", marginBottom: "2rem" }}
          >
            {game.description ||
              game.feature ||
              "A mesmerizing adventure awaits in this highly rated gaming experience."}
          </p>

          <div
            style={{
              marginTop: "auto",
              background: "rgba(0,0,0,0.3)",
              padding: "2rem",
              borderRadius: "1rem",
              border: "1px solid var(--glass-border)",
            }}
          >
            <h2
              style={{
                fontSize: "2.5rem",
                color: "var(--accent-color)",
                fontWeight: 800,
                marginBottom: "1.5rem",
              }}
            >
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(game.price)}
            </h2>
            <button
              onClick={handleAddCart}
              className="btn btn-primary"
              style={{
                width: "100%",
                padding: "1.25rem",
                fontSize: "1.125rem",
              }}
            >
              <ShoppingCart size={24} /> Add to Cart
            </button>
            {message && (
              <p
                style={{
                  marginTop: "1rem",
                  textAlign: "center",
                  color: message.includes("success")
                    ? "var(--accent-color)"
                    : "var(--danger-color)",
                }}
              >
                {message}
              </p>
            )}
          </div>
        </div>
      </motion.article>
    </div>
  );
}
