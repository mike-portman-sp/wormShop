import Link from "next/link";
import { XCircle } from "lucide-react";
import { client } from "../../../studio/client";
import { pageQuery } from "../../queries/pageQuery";
import MainMenu from "../../components/layout/mainMenu";
import Footer from "../../components/layout/footer";

export const metadata = {
  title: "Checkout Cancelled | GotWormz",
  robots: { index: false },
};

export default async function CheckoutCancelPage() {
  const pageData = await client.fetch(pageQuery, { slug: "shop" }).catch(() => null);

  return (
    <>
      <MainMenu mainMenu={pageData?.mainMenu} siteName={pageData?.siteName} />

      <main className="container mx-auto max-w-2xl px-6 py-24 text-center">
        <div className="flex flex-col items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-muted border border-border flex items-center justify-center">
            <XCircle size={40} className="text-muted-foreground" />
          </div>

          <div>
            <h1 className="text-foreground mb-2">Checkout Cancelled</h1>
            <p className="text-muted-foreground text-xl">
              No worries — your cart is still saved. Ready to continue whenever you are.
            </p>
          </div>

          <div className="flex gap-4 flex-wrap justify-center">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-gradient-to-r from-primary to-accent text-primary-foreground hover:scale-105 shadow-lg hover:shadow-xl h-12 px-5 text-base"
            >
              Return to Shop
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-card text-foreground border border-border hover:border-primary hover:scale-105 shadow-sm h-12 px-5 text-base"
            >
              Go Home
            </Link>
          </div>
        </div>
      </main>

      <Footer footer={pageData?.footer} mainMenu={pageData?.mainMenu} siteName={pageData?.siteName} />
    </>
  );
}
