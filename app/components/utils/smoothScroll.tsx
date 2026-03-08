"use client";

import { useEffect } from "react";

export default function SmoothScroll() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href?.startsWith("#")) return;

      const el = document.querySelector(href);
      if (!el) return;

      e.preventDefault();
      const start = window.scrollY;
      const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--nav-height")) || 0;
      const top = el.getBoundingClientRect().top + start - navHeight;
      const duration = 400;
      const startTime = performance.now();

      const ease = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2;

      const step = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        window.scrollTo(0, start + (top - start) * ease(progress));
        if (progress < 1) requestAnimationFrame(step);
      };

      requestAnimationFrame(step);
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
