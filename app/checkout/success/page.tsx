import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { client } from "../../../studio/client";
import { pageQuery } from "../../queries/pageQuery";
import MainMenu from "../../components/layout/mainMenu";
import Footer from "../../components/layout/footer";
import ClearCartOnSuccess from "./ClearCartOnSuccess";

export const metadata = {
  title: "Order Confirmed | GotWormz",
  description: "Your worm order has been placed successfully.",
  robots: { index: false },
};

export default async function CheckoutSuccessPage() {
  const pageData = await client.fetch(pageQuery, { slug: "shop" }).catch(() => null);

  return (
    <>
      <MainMenu mainMenu={pageData?.mainMenu} siteName={pageData?.siteName} />
      <ClearCartOnSuccess />

      <main className="container mx-auto max-w-2xl px-6 py-24 text-center">
        <div className="flex flex-col items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center">
            <CheckCircle size={40} className="text-green-500" />
          </div>

          <div>
            <h1 className="text-foreground mb-2">Order Confirmed!</h1>
            <p className="text-muted-foreground text-xl">
              Thank you for your purchase. Your worms are getting ready to ship!
            </p>
          </div>

          <div className="bg-muted rounded-2xl p-6 w-full text-left flex flex-col gap-3">
            <h3 className="text-foreground">What happens next?</h3>
            <ul className="flex flex-col gap-3">
              {[
                "📧 You'll receive a confirmation email shortly",
                "📦 We'll carefully pack your live worms in eco-friendly packaging or email if selected local pickup",
                "🚚 Your order ships within 2-3 business days",
                "✅ Covered by our Live Delivery Guarantee",
              ].map((step) => (
                <li key={step} className="text-muted-foreground text-sm flex items-start gap-2">
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex gap-4 flex-wrap justify-center">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-gradient-to-r from-primary to-accent text-primary-foreground hover:scale-105 shadow-lg hover:shadow-xl h-12 px-5 text-base"
            >
              Continue Shopping
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
