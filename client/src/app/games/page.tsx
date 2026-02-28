"use client";
import React, { useEffect, useState } from "react";
import api from "../../api";
import Link from "next/link";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

export default function Games() {
  const [games, setGames] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  const fetchGames = async (query = "") => {
    try {
      const res = await api.get(`/games${query ? `?title=${query}` : ""}`);
      setGames(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchGames(search);
  };

  return (
    <div className="container" style={{ paddingBottom: "4rem" }}>
      <div
        className="flex-between"
        style={{ marginBottom: "3rem", flexWrap: "wrap", gap: "2rem" }}
      >
        <h1 className="title-xl gradient-text" style={{ margin: 0 }}>
          All Games
        </h1>
        <form
          onSubmit={handleSearch}
          className="flex-center"
          style={{ gap: "0.5rem", flex: "1", maxWidth: "400px" }}
        >
          <input
            type="text"
            className="form-input"
            placeholder="Search titles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            type="submit"
            className="btn btn-primary"
            style={{ padding: "0.75rem" }}
          >
            <Search size={20} />
          </button>
        </form>
      </div>

      <div className="grid-cards">
        {games.map((g, idx) => (
          <motion.div
            className="game-card"
            key={g._id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
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
                  View Game
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
