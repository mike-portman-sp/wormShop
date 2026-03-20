"use client";

import { useState } from "react";
import { ShoppingCart, Minus, Plus } from "lucide-react";
import { useCart } from "@/app/context/CartContext";
import type { Product, WeightOption } from "@/app/types/sanity";

type AddToCartProps = {
  product: Product;
};

export default function AddToCart({ product }: AddToCartProps) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedWeight, setSelectedWeight] = useState<WeightOption | null>(
    product.weightOptions?.[0] ?? null
  );
  const [added, setAdded] = useState(false);

  const hasWeightOptions =
    product.weightOptions && product.weightOptions.length > 0;
  const finalPrice = product.price + (selectedWeight?.priceModifier ?? 0);

  const handleAdd = () => {
    if (!product.inStock) return;
    addItem({
      _id: product._id,
      name: product.name,
      price: finalPrice,
      image: product.image?.url,
      quantity,
      slug: product.slug,
      selectedWeight: selectedWeight?.label,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Weight options */}
      {hasWeightOptions && (
        <div>
          <p className="text-sm font-semibold text-foreground mb-2">
            Select Weight:
          </p>
          <div className="flex flex-wrap gap-2">
            {product.weightOptions!.map((opt) => (
              <button
                key={opt.label}
                onClick={() => setSelectedWeight(opt)}
                className={`px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200 ${
                  selectedWeight?.label === opt.label
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                }`}
              >
                {opt.label}
                {opt.priceModifier > 0 && (
                  <span className="ml-1 text-xs text-muted-foreground">
                    (+${opt.priceModifier.toFixed(2)})
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Price display */}
      <div className="flex items-center gap-3">
        <span className="text-3xl font-bold text-foreground">
          ${finalPrice.toFixed(2)}
        </span>
        {product.compareAtPrice && product.compareAtPrice > finalPrice && (
          <span className="text-lg text-muted-foreground line-through">
            ${product.compareAtPrice.toFixed(2)}
          </span>
        )}
        {product.compareAtPrice && product.compareAtPrice > finalPrice && (
          <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-red-500/90 text-white">
            Save ${(product.compareAtPrice - finalPrice).toFixed(2)}
          </span>
        )}
      </div>

      {/* Quantity + Add to Cart */}
      <div className="flex items-center gap-3">
        {/* Quantity selector */}
        <div className="flex items-center border border-border rounded-full overflow-hidden">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="p-3 text-muted-foreground hover:text-primary hover:bg-muted transition-colors"
            aria-label="Decrease quantity"
          >
            <Minus size={16} />
          </button>
          <span className="px-4 font-bold text-foreground min-w-[3rem] text-center">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="p-3 text-muted-foreground hover:text-primary hover:bg-muted transition-colors"
            aria-label="Increase quantity"
          >
            <Plus size={16} />
          </button>
        </div>

        {/* Add to Cart button */}
        <button
          onClick={handleAdd}
          disabled={!product.inStock}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-full font-semibold text-base transition-all duration-300 ${
            !product.inStock
              ? "bg-muted text-muted-foreground cursor-not-allowed"
              : added
              ? "bg-green-600 text-white scale-105"
              : "bg-gradient-to-r from-primary to-accent text-primary-foreground hover:scale-105 shadow-lg hover:shadow-xl"
          }`}
        >
          <ShoppingCart size={20} />
          {!product.inStock
            ? "Out of Stock"
            : added
            ? "Added to Cart!"
            : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
