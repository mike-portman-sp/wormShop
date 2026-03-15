"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import MenuLinks from "../utils/menuLinks";
import Button from "../fields/button";
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
        internal?: {
          slug?: {
            current: string;
          };
        };
        file?: any;
      };
    }>;
    ctaButton?: ButtonField;
  };
};

export default function MainMenu({ mainMenu, siteName }: MainMenuProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const updateNavHeight = () => {
      if (navRef.current) {
        document.documentElement.style.setProperty(
          "--nav-height",
          `${navRef.current.offsetHeight}px`,
        );
      }
    };
    updateNavHeight();
    const observer = new ResizeObserver(updateNavHeight);
    if (navRef.current) observer.observe(navRef.current);
    return () => observer.disconnect();
  }, []);

  if (!mainMenu?.menuItems) return null;

  return (
    <nav
      ref={navRef}
      className="sticky top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border"
    >
      <div className="container mx-auto px-6 py-4 max-w-6xl">
        <div className="flex items-center justify-between">
          <a
            href="/"
            className="text-2xl font-handwritten font-bold text-primary"
          >
            {siteName || "Mike Portman"}
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <MenuLinks
              items={mainMenu.menuItems}
              className="flex items-center gap-8"
              linkClassName="text-muted-foreground hover:text-primary transition-colors duration-300 font-medium"
            />
            {mainMenu.ctaButton && <Button button={mainMenu.ctaButton} />}
          </div>

          <button
            className="md:hidden text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col gap-4">
              <MenuLinks
                items={mainMenu.menuItems}
                className="flex flex-col gap-4"
                linkClassName="text-center text-muted-foreground hover:text-primary transition-colors duration-300 font-medium py-2"
                onLinkClick={() => setIsMobileMenuOpen(false)}
              />
              {mainMenu.ctaButton && <Button button={mainMenu.ctaButton} />}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
