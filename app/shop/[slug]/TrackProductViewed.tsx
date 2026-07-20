"use client";

import { useEffect } from "react";
import posthog from "posthog-js";

type TrackProductViewedProps = {
  productId: string;
  name: string;
  category?: string;
};

export default function TrackProductViewed({ productId, name, category }: TrackProductViewedProps) {
  useEffect(() => {
    posthog.capture("product_viewed", {
      product_id: productId,
      product_name: name,
      product_category: category ?? null,
    });
  }, [productId, name, category]);

  return null;
}
