import React from "react";

export const Footer = () => {
  return (
    <footer
      style={{
        marginTop: "auto",
        padding: "3rem 0",
        background: "rgba(2, 6, 23, 0.9)",
        borderTop: "1px solid var(--glass-border)",
      }}
    >
      <div
        className="container flex-between"
        style={{ flexDirection: "column", gap: "1rem", textAlign: "center" }}
      >
        <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>
          &copy; {new Date().getFullYear()} GameVault
        </p>
      </div>
    </footer>
  );
};
