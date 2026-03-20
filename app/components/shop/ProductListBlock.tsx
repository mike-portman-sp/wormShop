import { client } from "../../../studio/client";
import {
  allProductsQuery,
  productsByCategoryQuery,
  featuredProductsQuery,
} from "../../queries/productQuery";
import ProductCard from "./ProductCard";
import type { Product } from "../../types/sanity";

type ProductListBlockProps = {
  block: {
    title?: string;
    showAllProducts?: boolean;
    featuredProducts?: Array<{ _ref: string }>;
    filterCategory?: string;
    backgroundColor?: string;
  };
};

export default async function ProductListBlock({ block }: ProductListBlockProps) {
  let products: Product[] = [];

  if (block.featuredProducts && block.featuredProducts.length > 0) {
    const ids = block.featuredProducts.map((ref) => ref._ref);
    products = await client.fetch(featuredProductsQuery, { ids });
  } else if (block.filterCategory) {
    products = await client.fetch(productsByCategoryQuery, {
      category: block.filterCategory,
    });
  } else {
    products = await client.fetch(allProductsQuery);
  }

  if (!products || products.length === 0) return null;

  return (
    <section
      className={`py-16 ${block.backgroundColor || ""}`}
    >
      <div className="container mx-auto max-w-6xl px-6">
        {block.title && (
          <h2 className="text-foreground mb-10 text-center">{block.title}</h2>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
