"use client";

import { ShoppingCart } from "lucide-react";
import { useCart } from "@/app/context/CartContext";

export default function CartIcon() {
  const { count, openCart } = useCart();

  return (
    <button
      onClick={openCart}
      aria-label={`Open cart (${count} items)`}
      className="relative p-2 text-muted-foreground hover:text-primary transition-colors duration-300 cursor-pointer"
    >
      <ShoppingCart size={24} />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground text-xs font-bold flex items-center justify-center leading-none">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </button>
  );
}
