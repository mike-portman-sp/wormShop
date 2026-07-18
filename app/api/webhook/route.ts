import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";
import { getPostHogClient } from "@/app/lib/posthog-server";

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2026-02-25.clover",
  });
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Missing signature or webhook secret" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Webhook signature verification failed:", message);
    return NextResponse.json({ error: `Webhook Error: ${message}` }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const resend = new Resend(process.env.RESEND_API_KEY!);
      const customerEmail = session.customer_details?.email;
      const amountTotal = session.amount_total
        ? `$${(session.amount_total / 100).toFixed(2)}`
        : "N/A";
      const amountTotalNumber = session.amount_total
        ? session.amount_total / 100
        : 0;
      const shippingName = session.customer_details?.name ?? "";
      const shippingAddress = session.customer_details?.address;
      const addressLine = shippingAddress
        ? `${shippingAddress.line1}, ${shippingAddress.city}, ${shippingAddress.state} ${shippingAddress.postal_code}`
        : "N/A";

      await resend.emails.send({
        from: "mikeportmanj@gmail.com",
        to: process.env.CONTACT_EMAIL!,
        subject: `New Order — ${amountTotal} from ${shippingName}`,
        text: [
          `New order received!`,
          ``,
          `Order ID: ${session.id}`,
          `Customer: ${shippingName} (${customerEmail})`,
          `Ship to: ${addressLine}`,
          `Total: ${amountTotal}`,
          ``,
          `View in Stripe: https://dashboard.stripe.com/payments/${session.payment_intent}`,
        ].join("\n"),
      });

      const posthog = getPostHogClient();
      posthog.capture({
        distinctId: session.id,
        event: "order_completed",
        properties: {
          order_id: session.id,
          amount_total: amountTotalNumber,
          currency: session.currency ?? "usd",
          payment_intent: session.payment_intent,
          shipping_country: shippingAddress?.country ?? null,
        },
      });
      await posthog.flush();

      console.log("Order completed:", session.id);
      break;
    }

    case "payment_intent.payment_failed": {
      const intent = event.data.object as Stripe.PaymentIntent;
      console.error("Payment failed:", intent.id);
      break;
    }

    default:
      // Unhandled event type — safe to ignore
      break;
  }

  return NextResponse.json({ received: true });
}
