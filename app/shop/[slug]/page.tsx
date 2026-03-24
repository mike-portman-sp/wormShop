import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle, ChevronLeft, Leaf } from "lucide-react";
import { client } from "../../../studio/client";
import { productDetailQuery } from "../../queries/productQuery";
import { pageQuery } from "../../queries/pageQuery";
import MainMenu from "../../components/layout/mainMenu";
import Footer from "../../components/layout/footer";
import CartDrawer from "../../components/shop/CartDrawer";
import AddToCart from "../../components/shop/AddToCart";
import PageBuilder from "../../pagebuilder";
import AdvancedText from "../../components/fields/advancedText";
import type { Product } from "../../types/sanity";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await client.fetch<Product>(productDetailQuery, { slug });
  if (!product) return { title: "Product Not Found" };
  return {
    title: product.seo?.metaTitle || `${product.name} | wormShop`,
    description:
      product.seo?.metaDescription ||
      product.shortDescription ||
      `Buy ${product.name} from wormShop. Premium live composting worms.`,
    robots: product.seo?.noIndex ? { index: false } : undefined,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  const [product, pageData] = await Promise.all([
    client.fetch<Product>(productDetailQuery, { slug }),
    client.fetch(pageQuery, { slug: "shop" }).catch(() => null),
  ]);

  if (!product) notFound();

  const hasMultipleImages = product.images && product.images.length > 1;

  return (
    <>
      <MainMenu mainMenu={pageData?.mainMenu} siteName={pageData?.siteName} />
      <CartDrawer />

      <main className="container mx-auto max-w-6xl px-6 py-10">
        {/* Breadcrumb */}
        <Link
          href="/shop"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ChevronLeft size={16} />
          Back to Shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 py-md">
          {/* Images */}
          <div className="flex flex-col gap-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted">
              {product.image?.url ? (
                <Image
                  src={product.image.url}
                  alt={product.image.alt || product.name}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-8xl">
                  🪱
                </div>
              )}
              {product.badge && (
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-bold bg-gradient-to-r from-primary to-accent text-primary-foreground shadow">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Thumbnail gallery */}
            {hasMultipleImages && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images!.map((img, i) => (
                  <div
                    key={i}
                    className="relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden border-2 border-border hover:border-primary transition-colors"
                  >
                    <Image
                      src={img.url}
                      alt={img.alt || `${product.name} image ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product info */}
          <div className="flex flex-col gap-6">
            {/* Category */}
            {product.category && (
              <p className="text-primary text-sm font-semibold uppercase tracking-widest">
                {product.category.replace(/-/g, " ")}
              </p>
            )}

            <h1 className="text-foreground leading-tight mb-0">{product.name}</h1>

            {product.shortDescription && (
              <p className="text-muted-foreground text-lg leading-relaxed mb-0">
                {product.shortDescription}
              </p>
            )}

            {/* Add to cart (client component with weight selector + quantity) */}
            <AddToCart product={product} />

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div className="bg-muted rounded-2xl p-5">
                <h3 className="text-foreground text-base font-bold mb-3">
                  Why You&apos;ll Love These Worms
                </h3>
                <ul className="flex flex-col gap-2">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle
                        size={16}
                        className="text-primary flex-shrink-0 mt-0.5"
                      />
                      <span className="text-muted-foreground text-sm">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Care instructions */}
            {product.careInstructions && (
              <div className="flex items-start gap-3 bg-primary/5 border border-primary/20 rounded-2xl p-4">
                <Leaf size={20} className="text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-foreground text-sm font-bold mb-1">
                    Care Instructions
                  </h4>
                  <p className="text-muted-foreground text-sm m-0">
                    {product.careInstructions}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Full description */}
        {product.description?.content && product.description.content.length > 0 && (
          <div className="border-t border-border pt-12 py-md">
              <AdvancedText content={product.description.content} />
          </div>
        )}

        {/* Page builder blocks */}
        {product.pageBuilder && <PageBuilder blocks={product.pageBuilder} />}
      </main>

      <Footer
        footer={pageData?.footer}
        mainMenu={pageData?.mainMenu}
        siteName={pageData?.siteName}
      />
    </>
  );
}
