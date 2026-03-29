import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/app/types/sanity";

type ProductCardProps = {
  product: Product;
};

const CATEGORY_LABELS: Record<string, string> = {
  "red-wigglers": "Red Wigglers",

  castings: "Worm Castings",
  kits: "Composting Kits",
  accessories: "Accessories",
};

export default function ProductCard({ product }: ProductCardProps) {
  const hasDiscount =
    product.compareAtPrice && product.compareAtPrice > product.price;
  const discountPct = hasDiscount
    ? Math.round(
        ((product.compareAtPrice! - product.price) / product.compareAtPrice!) *
          100
      )
    : 0;

  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group block bg-card border border-border rounded-2xl overflow-hidden hover-lift transition-all duration-300"
    >
      {/* Image */}
      <div className="relative h-96 bg-muted overflow-hidden">
        {product.image?.url && (
          <Image
            src={product.image.url}
            alt={product.image.alt || product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        )}
        {/* Badges
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {product.badge && (
            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-gradient-to-r from-primary to-accent text-primary-foreground shadow">
              {product.badge}
            </span>
          )}
          {hasDiscount && (
            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-red-500/90 text-white shadow">
              -{discountPct}%
            </span>
          )}
          {!product.inStock && (
            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-muted text-muted-foreground">
              Out of Stock
            </span>
          )}
        </div> */}
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col gap-2">
        {product.category && (
          <p className="text-xs text-primary font-medium uppercase tracking-wide">
            {CATEGORY_LABELS[product.category] || product.category}
          </p>
        )}
        <h3 className="text-foreground font-bold text-lg leading-tight group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        {product.shortDescription && (
          <p className="text-muted-foreground text-sm line-clamp-2 mb-1">
            {product.shortDescription}
          </p>
        )}

        {/* Weight options preview */}
        {product.weightOptions && product.weightOptions.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {product.weightOptions.slice(0, 4).map((opt) => (
              <span
                key={opt.label}
                className="text-xs px-2 py-0.5 border border-border rounded-full text-muted-foreground"
              >
                {opt.label}
              </span>
            ))}
          </div>
        )}

        {/* Price */}
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xl font-bold text-foreground">
            {product.weightOptions && product.weightOptions.length > 1 ? "From " : ""}${product.price.toFixed(2)}
          </span>
          {/* {hasDiscount && (
            <span className="text-sm text-muted-foreground line-through">
              ${product.compareAtPrice!.toFixed(2)}
            </span>
          )} */}
        </div>

        {/* CTA */}
        <div className="mt-2">
          {product.inStock ? (
            <span className="inline-flex items-center justify-center w-full py-2 px-4 rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground text-sm font-semibold transition-all duration-300">
              Shop Now
            </span>
          ) : (
            <span className="inline-flex items-center justify-center w-full py-2 px-4 rounded-full bg-muted text-muted-foreground text-sm font-semibold cursor-not-allowed">
              Out of Stock
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
