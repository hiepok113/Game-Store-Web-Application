"use client";
import React, { useEffect, useState } from "react";
import api from "../../api";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ games: 0, users: 0, categories: 0 });

  useEffect(() => {
    Promise.all([api.get("/games"), api.get("/users"), api.get("/categories")])
      .then(([gamesRes, usersRes, catsRes]) => {
        setStats({
          games: gamesRes.data.length,
          users: usersRes.data.length,
          categories: catsRes.data.length,
        });
      })
      .catch(console.error);
  }, []);

  return (
    <div>
      <h1 className="title-lg" style={{ marginBottom: "2rem" }}>
        Overview
      </h1>

      <div
        className="grid-cards"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))" }}
      >
        <div className="glass-panel">
          <h3
            className="form-label"
            style={{ fontSize: "1rem", marginBottom: "1rem" }}
          >
            Total Games
          </h3>
          <div
            className="gradient-text"
            style={{ fontSize: "3rem", fontWeight: 800 }}
          >
            {stats.games}
          </div>
        </div>
        <div className="glass-panel">
          <h3
            className="form-label"
            style={{ fontSize: "1rem", marginBottom: "1rem" }}
          >
            Registered Users
          </h3>
          <div
            className="gradient-text"
            style={{
              fontSize: "3rem",
              fontWeight: 800,
              backgroundImage: "linear-gradient(135deg, #14b8a6, #3b82f6)",
            }}
          >
            {stats.users}
          </div>
        </div>
        <div className="glass-panel">
          <h3
            className="form-label"
            style={{ fontSize: "1rem", marginBottom: "1rem" }}
          >
            Categories
          </h3>
          <div
            className="gradient-text"
            style={{
              fontSize: "3rem",
              fontWeight: 800,
              backgroundImage: "linear-gradient(135deg, #ec4899, #8b5cf6)",
            }}
          >
            {stats.categories}
          </div>
        </div>
      </div>
    </div>
  );
}
