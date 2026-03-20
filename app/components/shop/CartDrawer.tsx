"use client";

import { useEffect, useRef, useState } from "react";
import { X, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/app/context/CartContext";
import type { CartItem } from "@/app/types/sanity";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, total, clearCart } =
    useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [closeCart]);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleCheckout = async () => {
    if (items.length === 0) return;
    setIsCheckingOut(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Checkout failed");
      window.location.href = data.url;
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
      setIsCheckingOut(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className={`fixed right-0 top-0 h-full w-full max-w-md z-50 bg-background border-l border-border flex flex-col shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-primary" />
            <h2 className="text-lg font-bold text-foreground">
              Your Cart {items.length > 0 && `(${items.reduce((s, i) => s + i.quantity, 0)})`}
            </h2>
          </div>
          <button
            onClick={closeCart}
            className="p-2 text-muted-foreground hover:text-primary transition-colors"
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <span className="text-7xl">🪱</span>
              <p className="text-muted-foreground text-lg">Your cart is empty</p>
              <button
                onClick={closeCart}
                className="text-primary hover:underline text-sm"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <ul className="flex flex-col gap-4">
              {items.map((item) => (
                <CartLineItem
                  key={`${item._id}-${item.selectedWeight ?? "base"}`}
                  item={item}
                  onRemove={() => removeItem(item._id, item.selectedWeight)}
                  onQuantityChange={(q) =>
                    updateQuantity(item._id, q, item.selectedWeight)
                  }
                />
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border px-6 py-5 flex flex-col gap-4">
            {error && (
              <p className="text-sm text-red-400 bg-red-900/20 border border-red-500/30 rounded-xl px-3 py-2">
                {error}
              </p>
            )}

            {/* Subtotal */}
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="text-xl font-bold text-foreground">
                ${total.toFixed(2)}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Shipping & taxes calculated at checkout
            </p>

            {/* Checkout button */}
            <button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full py-3 px-6 rounded-full font-semibold text-base bg-gradient-to-r from-primary to-accent text-primary-foreground hover:scale-105 transition-all duration-300 shadow-lg disabled:opacity-70 disabled:cursor-wait disabled:scale-100"
            >
              {isCheckingOut ? "Redirecting to Checkout…" : "Checkout with Stripe"}
            </button>

            {/* Clear cart */}
            <button
              onClick={clearCart}
              className="flex items-center justify-center gap-1 text-xs text-muted-foreground hover:text-red-400 transition-colors mx-auto"
            >
              <Trash2 size={12} />
              Clear cart
            </button>
          </div>
        )}
      </div>
    </>
  );
}

function CartLineItem({
  item,
  onRemove,
  onQuantityChange,
}: {
  item: CartItem;
  onRemove: () => void;
  onQuantityChange: (q: number) => void;
}) {
  return (
    <li className="flex gap-3 items-start bg-muted rounded-xl p-3">
      {/* Image */}
      <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-card">
        {item.image ? (
          <Image src={item.image} alt={item.name} fill className="object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-2xl">
            🪱
          </div>
        )}
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-foreground text-sm leading-tight truncate">
          {item.name}
        </p>
        {item.selectedWeight && (
          <p className="text-xs text-muted-foreground mt-0.5">
            {item.selectedWeight}
          </p>
        )}
        <p className="text-sm font-bold text-primary mt-1">
          ${(item.price * item.quantity).toFixed(2)}
        </p>

        {/* Quantity controls */}
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => onQuantityChange(item.quantity - 1)}
            className="w-6 h-6 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
          >
            <Minus size={10} />
          </button>
          <span className="text-sm font-bold text-foreground w-6 text-center">
            {item.quantity}
          </span>
          <button
            onClick={() => onQuantityChange(item.quantity + 1)}
            className="w-6 h-6 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
          >
            <Plus size={10} />
          </button>
          <button
            onClick={onRemove}
            className="ml-auto text-muted-foreground hover:text-red-400 transition-colors"
            aria-label="Remove item"
          >
            <X size={14} />
          </button>
        </div>
      </div>
    </li>
  );
}
