"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import MenuLinks from "../utils/menuLinks";

type MainMenuProps = {
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
  };
};

export default function MainMenu({ mainMenu }: MainMenuProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (!mainMenu?.menuItems) return null;

  return (
    <nav className="fixed sticky relative top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 py-4 max-w-6xl">
        <div className="flex items-center justify-between">
          <a
            href="/"
            className="text-2xl font-handwritten font-bold text-primary"
          >
            Mike Portman ✨
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <MenuLinks 
              items={mainMenu.menuItems}
              className="flex items-center gap-8"
              linkClassName="text-muted-foreground hover:text-primary transition-colors duration-300 font-medium"
            />
            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-gradient-to-r from-primary to-accent text-primary-foreground font-bold hover:scale-105 shadow-lg hover:shadow-xl h-9 px-4">
              Let's Chat! 💬
            </button>
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
              <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-gradient-to-r from-primary to-accent text-primary-foreground font-bold hover:scale-105 shadow-lg hover:shadow-xl h-9 px-4">
                Let's Chat! 💬
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}