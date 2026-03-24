import { getLinkUrl, getLinkTarget, getLinkRel } from "../utils/linkHelpers";
import { PortableText } from "next-sanity";
import MenuLinks from "../utils/menuLinks";

type FooterProps = {
  siteName?: string;
  footer?: {
    title?: string;
    advancedText?: {
      content?: any[];
    };
    footerItems?: Array<{
      _key: string;
      _type: string;
      title: string;
      link: any;
    }>;
  };
  mainMenu?: {
    menuItems?: Array<{
      _key: string;
      _type: string;
      title: string;
      link?: any;
    }>;
  };
};

const customComponents = {
  block: {
    normal: ({ children }: any) => (
      <p className="text-xs text-muted-foreground mt-2 font-handwritten">{children}</p>
    ),
  }
};

export default function Footer({ footer, mainMenu, siteName }: FooterProps) {
  if (!footer) return null;

  return (
    <footer className="py-12 bg-background border-t border-border">
      <div className="flex flex-col items-center gap-6">
        <a href="/" className="text-3xl font-handwritten font-bold text-primary">
          {siteName || "Mike Portman"}
        </a>

        {/* Footer Social Links */}
        {footer.footerItems && footer.footerItems.length > 0 && (
          <nav className="flex gap-4">
            {footer.footerItems.map((item) => (
              <a
                key={item._key}
                href={getLinkUrl(item.link)}
                target={getLinkTarget(item.link)}
                rel={getLinkRel(item.link)}
                className="px-4 py-2 rounded-full bg-muted text-sm text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
              >
                {item.title}
              </a>
            ))}
          </nav>
        )}

        {/* Copyright Text */}
        {footer.advancedText?.content && (
          <div className="pt-6 border-t border-border w-full text-center text-xs">
            <PortableText value={footer.advancedText.content} components={customComponents}/>
          </div>
        )}
      </div>
    </footer>
  );
}