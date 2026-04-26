"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../api";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const [games, setGames] = useState<any[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    api
      .get("/games")
      .then((res) => setGames(res.data.slice(0, 4)))
      .catch(console.error);
  }, []);

  return (
    <div className="container" style={{ paddingBottom: "5rem" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Store",
            name: "GameVault",
            description:
              "Premium digital game store for browsing and buying PC games.",
            url: "http://localhost:3000",
            acceptedPaymentMethod: "VNPay",
          }),
        }}
      />
      <section className="hero-section" aria-labelledby="home-hero-title">
        <div className="hero-bg"></div>
        <div className="hero-overlay"></div>
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span
            className="badge"
            style={{ marginBottom: "1rem", display: "inline-block" }}
          >
            CURATED DIGITAL GAMES
          </span>
          <h1 id="home-hero-title" className="title-xl">
            GameVault Game Store
          </h1>
          <p className="subtitle" style={{ marginBottom: "2rem" }}>
            Discover premium PC games, compare prices by genre, and checkout
            securely with VNPay.
          </p>
          <div style={{ display: "flex", gap: "1rem" }}>
            <Link
              href="/games"
              className="btn btn-primary"
              style={{ padding: "1rem 2rem", fontSize: "1.125rem" }}
            >
              Explore Store
            </Link>
            {!user && (
              <Link
                href="/register"
                className="btn btn-secondary"
                style={{ padding: "1rem 2rem", fontSize: "1.125rem" }}
              >
                Join the Vault
              </Link>
            )}
          </div>
        </motion.div>
      </section>

      <section aria-labelledby="trending-games-title">
        <div className="flex-between" style={{ marginBottom: "2rem" }}>
          <h2 id="trending-games-title" className="title-lg" style={{ margin: 0 }}>
            Trending Now
          </h2>
          <Link href="/games" className="btn btn-secondary">
            View All
          </Link>
        </div>

        <div className="grid-cards">
          {games.map((g, idx) => (
            <motion.article
              className="game-card"
              key={g._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
            >
              <div className="game-card-img-wrap">
                <img
                  src={
                    g.image ||
                    "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&q=80"
                  }
                  alt={g.title}
                  className="game-card-img"
                />
              </div>
              <div className="game-card-content">
                <span
                  className="badge"
                  style={{ alignSelf: "flex-start", marginBottom: "0.5rem" }}
                >
                  {g.category}
                </span>
                <h3 className="game-card-title">{g.title}</h3>
                <div className="game-card-footer">
                  <span className="game-card-price">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(g.price)}
                  </span>
                  <Link
                    href={`/games/${g._id}`}
                    className="btn btn-primary"
                    style={{ padding: "0.5rem 1rem" }}
                  >
                    View
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </div>
  );
}
