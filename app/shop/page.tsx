import { client } from "../../studio/client";
import { allProductsQuery } from "../queries/productQuery";
import { pageQuery } from "../queries/pageQuery";
import MainMenu from "../components/layout/mainMenu";
import Footer from "../components/layout/footer";
import ProductCard from "../components/shop/ProductCard";
import CartDrawer from "../components/shop/CartDrawer";
import type { Product } from "../types/sanity";

export const metadata = {
  title: "Shop Compostable Worms | wormShop",
  description:
    "Premium live composting worms shipped to your door. Red Wigglers, Nightcrawlers, Worm Castings and more.",
};

const CATEGORY_LABELS: Record<string, string> = {
  "red-wigglers": "Red Wigglers",
  "european-nightcrawlers": "European Nightcrawlers",
  "african-nightcrawlers": "African Nightcrawlers",
  "canadian-nightcrawlers": "Canadian Nightcrawlers",
  castings: "Worm Castings",
  kits: "Composting Kits",
  accessories: "Accessories",
};

export default async function ShopPage() {
  const [products, pageData] = await Promise.all([
    client.fetch<Product[]>(allProductsQuery),
    client.fetch(pageQuery, { slug: "shop" }).catch(() => null),
  ]);

  // Group products by category for display
  const categories = [...new Set(products?.map((p) => p.category).filter(Boolean))] as string[];

  return (
    <>
      <MainMenu mainMenu={pageData?.mainMenu} siteName={pageData?.siteName} />
      <CartDrawer />

      <main>
        {/* Hero */}
        <section className="container mx-auto max-w-6xl px-6 py-16 text-center">
          <p className="text-primary font-semibold uppercase tracking-widest text-sm mb-4">
            Live · Compostable · Shipped Fresh
          </p>
          <h1 className="text-foreground mb-4">
            Premium <strong>Composting Worms</strong>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-xl">
            All worms are raised organically, packed carefully, and shipped
            with a live delivery guarantee. Transform your food waste into
            rich compost today.
          </p>
        </section>

        {/* Products */}
        <section className="container mx-auto max-w-6xl px-6 pb-20">
          {!products || products.length === 0 ? (
            <div className="text-center py-20">
              <span className="text-7xl block mb-4">🪱</span>
              <h2 className="text-foreground mb-2">Products Coming Soon</h2>
              <p className="text-muted-foreground">
                Check back soon — we&apos;re getting our worms ready!
              </p>
            </div>
          ) : categories.length > 1 ? (
            // Show by category if multiple categories exist
            <div className="flex flex-col gap-16">
              {categories.map((cat) => {
                const catProducts = products.filter((p) => p.category === cat);
                if (catProducts.length === 0) return null;
                return (
                  <div key={cat}>
                    <h2 className="text-foreground mb-6 pb-3 border-b border-border">
                      {CATEGORY_LABELS[cat] || cat}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {catProducts.map((product) => (
                        <ProductCard key={product._id} product={product} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            // Flat grid for single category or mixed
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </section>

        {/* Trust badges */}
        <section className="bg-muted border-t border-border py-12">
          <div className="container mx-auto max-w-6xl px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { icon: "🚚", title: "Fast Shipping", desc: "3–7 business days" },
                { icon: "✅", title: "Live Guarantee", desc: "Arrive alive or we reship" },
                { icon: "🌱", title: "Organically Raised", desc: "No chemicals, ever" },
                { icon: "📦", title: "Eco Packaging", desc: "100% compostable packaging" },
              ].map((badge) => (
                <div key={badge.title} className="flex flex-col items-center gap-2">
                  <span className="text-4xl">{badge.icon}</span>
                  <h3 className="text-foreground text-base font-bold m-0">{badge.title}</h3>
                  <p className="text-muted-foreground text-sm m-0">{badge.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer footer={pageData?.footer} mainMenu={pageData?.mainMenu} siteName={pageData?.siteName} />
    </>
  );
}
