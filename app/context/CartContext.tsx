"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import type { CartItem } from "@/app/types/sanity";

type CartContextType = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string, selectedWeight?: string) => void;
  updateQuantity: (id: string, quantity: number, selectedWeight?: string) => void;
  clearCart: () => void;
  total: number;
  count: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

const cartKey = (id: string, weight?: string) => `${id}::${weight || "__base__"}`;

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("worm-shop-cart");
      if (stored) setItems(JSON.parse(stored));
    } catch {}
    setHydrated(true);
  }, []);

  // Persist cart to localStorage whenever it changes
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem("worm-shop-cart", JSON.stringify(items));
    } catch {}
  }, [items, hydrated]);

  const addItem = useCallback((item: CartItem) => {
    setItems((prev) => {
      const key = cartKey(item._id, item.selectedWeight);
      const existing = prev.find(
        (i) => cartKey(i._id, i.selectedWeight) === key
      );
      if (existing) {
        return prev.map((i) =>
          cartKey(i._id, i.selectedWeight) === key
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }
      return [...prev, item];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((id: string, selectedWeight?: string) => {
    const key = cartKey(id, selectedWeight);
    setItems((prev) =>
      prev.filter((i) => cartKey(i._id, i.selectedWeight) !== key)
    );
  }, []);

  const updateQuantity = useCallback(
    (id: string, quantity: number, selectedWeight?: string) => {
      const key = cartKey(id, selectedWeight);
      if (quantity <= 0) {
        setItems((prev) =>
          prev.filter((i) => cartKey(i._id, i.selectedWeight) !== key)
        );
      } else {
        setItems((prev) =>
          prev.map((i) =>
            cartKey(i._id, i.selectedWeight) === key ? { ...i, quantity } : i
          )
        );
      }
    },
    []
  );

  const clearCart = useCallback(() => setItems([]), []);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const count = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        total,
        count,
        isOpen,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
