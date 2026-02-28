"use client";
import React, { useEffect, useState } from "react";
import api from "../../../api";
import { Trash2, Edit3, Plus } from "lucide-react";

export default function AdminCategories() {
  const [categories, setCategories] = useState<any[]>([]);
  const [form, setForm] = useState({ _id: "", name: "", image: "" });
  const [isEditing, setIsEditing] = useState(false);

  const fetchData = async () => {
    try {
      const res = await api.get("/categories");
      setCategories(res.data);
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
      if (isEditing) {
        await api.put(`/categories/${form._id}`, {
          name: form.name,
          image: form.image,
        });
      } else {
        await api.post("/categories", { name: form.name, image: form.image });
      }
      setForm({ _id: "", name: "", image: "" });
      setIsEditing(false);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return;
    try {
      await api.delete(`/categories/${id}`);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (c: any) => {
    setForm(c);
    setIsEditing(true);
  };

  return (
    <div>
      <h1 className="title-lg" style={{ marginBottom: "2rem" }}>
        Manage Categories
      </h1>

      <div className="glass-panel" style={{ marginBottom: "3rem" }}>
        <h2 style={{ marginBottom: "1.5rem", fontSize: "1.25rem" }}>
          {isEditing ? "Edit Category" : "Add New Category"}
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
            <label className="form-label">Category Name</label>
            <input
              className="form-input"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div>
            <label className="form-label">Image URL</label>
            <input
              className="form-input"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
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
              <Plus size={18} />{" "}
              {isEditing ? "Update Category" : "Save Category"}
            </button>
            {isEditing && (
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setForm({ _id: "", name: "", image: "" });
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
              <th>Name</th>
              <th style={{ textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((c) => (
              <tr key={c._id}>
                <td>
                  <img
                    src={c.image || "https://via.placeholder.com/50"}
                    alt={c.name}
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                      borderRadius: "0.25rem",
                    }}
                  />
                </td>
                <td style={{ fontWeight: 500, color: "var(--accent-color)" }}>
                  {c.name}
                </td>
                <td style={{ textAlign: "right" }}>
                  <button
                    onClick={() => handleEdit(c)}
                    className="btn-icon"
                    style={{ display: "inline-flex", marginRight: "0.5rem" }}
                  >
                    <Edit3 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(c._id)}
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
