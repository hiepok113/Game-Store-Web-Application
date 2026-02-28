"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../api";
import { useAuth } from "./AuthContext";

type CartItem = {
  _id: string;
  gameId: string;
  userId: string;
};

type CartContextType = {
  cartCount: number;
  fetchCart: () => void;
  addToCart: (gameId: string) => Promise<void>;
};

const CartContext = createContext<CartContextType>({
  cartCount: 0,
  fetchCart: () => {},
  addToCart: async () => {},
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartCount, setCartCount] = useState(0);
  const { user } = useAuth();

  const fetchCart = async () => {
    if (!user) {
      setCartCount(0);
      return;
    }
    try {
      const res = await api.get(`/carts/${user._id}`);
      setCartCount(res.data.length);
    } catch (err: any) {
      if (err.response?.status !== 401) {
        console.error("Error fetching cart", err);
      }
    }
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  const addToCart = async (gameId: string) => {
    if (!user) throw new Error("Please log in to add to cart");
    try {
      await api.post("/carts", { userId: user._id, gameId });
      await fetchCart();
    } catch (err: any) {
      if (err.response?.status === 409) {
        throw new Error("Game already exists in cart");
      }
      throw new Error("Failed to add to cart");
    }
  };

  return (
    <CartContext.Provider value={{ cartCount, fetchCart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
