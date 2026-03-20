"use client";

import { useEffect } from "react";
import { useCart } from "@/app/context/CartContext";

export default function ClearCartOnSuccess() {
  const { clearCart } = useCart();
  useEffect(() => {
    clearCart();
  }, [clearCart]);
  return null;
}
