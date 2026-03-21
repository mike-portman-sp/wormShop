"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import MenuLinks from "../utils/menuLinks";
import Button from "../fields/button";
import CartIcon from "../shop/CartIcon";
import type { ButtonField } from "../../types/sanity";

type MainMenuProps = {
  siteName?: string;
  mainMenu?: {
    _key: string;
    _type: string;
    title: string;
    menuItems?: Array<{
      _key: string;
      _type: string;
      title: string;
      link?: {
        _type: string;
        linkType: "internal" | "external" | "file";
        external?: string;
        openInNewTab?: boolean;
        internal?: { slug?: { current: string } };
        file?: any;
      };
    }>;
    ctaButton?: ButtonField;
  };
};

export default function MainMenu({ mainMenu, siteName }: MainMenuProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const updateNavHeight = () => {
      if (navRef.current) {
        document.documentElement.style.setProperty(
          "--nav-height",
          `${navRef.current.offsetHeight}px`
        );
      }
    };
    updateNavHeight();
    const observer = new ResizeObserver(updateNavHeight);
    if (navRef.current) observer.observe(navRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header ref={navRef} className="sticky top-0 left-0 right-0 z-50">

      {/* ── Main nav ── */}
      <nav
        className="border-b border-border text-center transition-shadow duration-300"
        style={{
          background: "hsl(38 42% 92% / 0.97)",
          backdropFilter: "blur(12px)",
          boxShadow: scrolled
            ? "0 4px 24px hsl(28 30% 50% / 0.18)"
            : "none",
        }}
      >
        <div className="mx-auto px-6 py-3 max-w-7xl">
          <div className="flex justify-between gap-8">

            {/* Logo — vintage wordmark */}
            <a href="/" className="flex flex-col items-start shrink-0 group">
              <span
                className="text-[10px] font-bold uppercase tracking-[0.25em] leading-none mb-0.5 transition-colors"
                style={{ color: "hsl(35 65% 38% / 0.8)" }}
              >
              </span>
              <span
                className="text-2xl font-bold leading-none tracking-tight text-foreground group-hover:text-accent transition-colors duration-200"
              >
                {siteName || "wormShop"}
              </span>
            </a>

            {/* Desktop links */}
            {mainMenu?.menuItems && (
              <div className="hidden md:flex items-center gap-0.5 flex-1 justify-end">
                <MenuLinks
                  items={mainMenu.menuItems}
                  className="flex items-center gap-0.5"
                  linkClassName="px-4 py-2 text-lg font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 relative after:absolute after:bottom-0 after:left-4 after:right-4 after:h-px after:bg-accent after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200"
                />
              </div>
            )}

            {/* Right: cart + CTA */}
            <div className="hidden md:flex items-center gap-3 shrink-0">
              <CartIcon />
              {mainMenu?.ctaButton && <Button button={mainMenu.ctaButton} />}
            </div>

            {/* Mobile: cart + hamburger */}
            <div className="flex items-center gap-2 md:hidden">
              <CartIcon />
              <button
                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>

          {/* Mobile dropdown */}
          {isMobileMenuOpen && (
            <div className="md:hidden pt-3 pb-4 border-t items-center  border-border mt-3">
              {mainMenu?.menuItems && (
                <MenuLinks
                  items={mainMenu.menuItems}
                  className="flex flex-col"
                  linkClassName="px-2 py-3 text-md font-medium text-muted-foreground hover:text-foreground border-b border-border/50 last:border-0 transition-colors"
                  onLinkClick={() => setIsMobileMenuOpen(false)}
                />
              )}
              {mainMenu?.ctaButton && (
                <div className="mt-4">
                  <Button button={mainMenu.ctaButton} />
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
