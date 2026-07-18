"use client";

import { useEffect } from "react";
import posthog from "posthog-js";

export default function TrackCancelled() {
  useEffect(() => {
    posthog.capture("checkout_cancelled");
  }, []);
  return null;
}
