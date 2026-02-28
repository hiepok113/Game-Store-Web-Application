"use client";
import React, { useEffect, useState } from "react";
import api from "../../../api";
import { Trash2, Edit3, Plus } from "lucide-react";

export default function AdminGames() {
  const [games, setGames] = useState<any[]>([]);
  const [cats, setCats] = useState<any[]>([]);
  const [form, setForm] = useState({
    _id: "",
    title: "",
    price: "",
    category: "",
    image: "",
    rating: 5,
    feature: "",
    aboutImage: "",
    description: "",
    systemRequirements: {
      minimum: ["OS: Win 10"],
      recommended: ["OS: Win 10"],
    },
    logo: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  const fetchData = async () => {
    try {
      const [gRes, cRes] = await Promise.all([
        api.get("/games"),
        api.get("/categories"),
      ]);
      setGames(gRes.data);
      setCats(cRes.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { _id, createdAt, updatedAt, __v, ...rest } = form as any;
      const payloadToSave = { ...rest, price: Number(form.price) };
      if (isEditing) {
        await api.put(`/games/${_id}`, payloadToSave);
      } else {
        await api.post("/games", payloadToSave);
      }
      setForm({
        _id: "",
        title: "",
        price: "",
        category: "",
        image: "",
        rating: 5,
        feature: "",
        aboutImage: "",
        description: "",
        systemRequirements: {
          minimum: ["OS: Win 10"],
          recommended: ["OS: Win 10"],
        },
        logo: "",
      });
      setIsEditing(false);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      await api.delete(`/games/${id}`);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (g: any) => {
    setForm(g);
    setIsEditing(true);
  };

  return (
    <div>
      <div className="flex-between" style={{ marginBottom: "2rem" }}>
        <h1 className="title-lg" style={{ margin: 0 }}>
          Manage Games
        </h1>
      </div>

      <div className="glass-panel" style={{ marginBottom: "3rem" }}>
        <h2 style={{ marginBottom: "1.5rem", fontSize: "1.25rem" }}>
          {isEditing ? "Edit Game" : "Add New Game"}
        </h2>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1.5rem",
          }}
        >
          <div>
            <label className="form-label">Title</label>
            <input
              className="form-input"
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </div>
          <div>
            <label className="form-label">Price</label>
            <input
              type="number"
              step="0.01"
              className="form-input"
              required
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />
          </div>
          <div>
            <label className="form-label">Category</label>
            <select
              className="form-input"
              required
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              <option value="">Select Category</option>
              {cats.map((c) => (
                <option key={c._id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="form-label">Image URL</label>
            <input
              className="form-input"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
            />
          </div>
          <div style={{ gridColumn: "1 / -1" }}>
            <label className="form-label">Description</label>
            <textarea
              className="form-input"
              rows={4}
              style={{
                width: "100%",
                padding: "0.5rem",
                borderRadius: "0.375rem",
                border: "1px solid var(--border-color)",
                background: "var(--bg-secondary)",
                color: "var(--text-primary)",
              }}
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </div>
          <div
            style={{
              gridColumn: "1 / -1",
              display: "flex",
              gap: "1rem",
              marginTop: "1rem",
            }}
          >
            <button type="submit" className="btn btn-primary">
              <Plus size={18} /> {isEditing ? "Update Game" : "Save Game"}
            </button>
            {isEditing && (
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setForm({
                    _id: "",
                    title: "",
                    price: "",
                    category: "",
                    image: "",
                    rating: 5,
                    feature: "",
                    aboutImage: "",
                    description: "",
                    systemRequirements: {
                      minimum: ["OS: Win 10"],
                      recommended: ["OS: Win 10"],
                    },
                    logo: "",
                  });
                }}
                className="btn btn-secondary"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="glass-panel" style={{ padding: 0, overflow: "hidden" }}>
        <table className="data-table">
          <thead style={{ background: "rgba(0,0,0,0.2)" }}>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Category</th>
              <th>Price</th>
              <th style={{ textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {games.map((g) => (
              <tr key={g._id}>
                <td>
                  <img
                    src={g.image}
                    alt={g.title}
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                      borderRadius: "0.25rem",
                    }}
                  />
                </td>
                <td style={{ fontWeight: 500 }}>{g.title}</td>
                <td>
                  <span className="badge">{g.category}</span>
                </td>
                <td style={{ color: "var(--accent-color)", fontWeight: 600 }}>
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(g.price)}
                </td>
                <td style={{ textAlign: "right" }}>
                  <button
                    onClick={() => handleEdit(g)}
                    className="btn-icon"
                    style={{ display: "inline-flex", marginRight: "0.5rem" }}
                  >
                    <Edit3 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(g._id)}
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
