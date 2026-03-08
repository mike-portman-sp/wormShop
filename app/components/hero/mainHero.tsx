import { PortableText } from "next-sanity";
import Blobs from "../fields/blobs";
import Button from "../fields/button";
import "../../../styles/sass/components/hero.scss";
import { ArrowDown } from "lucide-react";

export default function MainHero({ hero }: { hero: any }) {
  return (
    <section
      id="mainHero"
      className="relative overflow-hidden flex items-center"
      style={{ minHeight: "calc(100dvh - var(--nav-height))" }}
    >
      {hero.blobs && <Blobs />}

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <div
            className="font-bold leading-tight mt-6 mb-4 animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            {hero.advancedText?.content && (
              <PortableText value={hero.advancedText.content} />
            )}
          </div>

          <p
            className="text-2xl md:text-3xl text-muted-foreground mb-6 font-handwritten animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            {hero.subheading}
          </p>

          <div
            className="flex flex-wrap justify-center gap-4 animate-fade-up"
            style={{ animationDelay: "0.5s" }}
          >
            {hero.buttons?.map((btn: any) => (
              <Button key={btn._key} button={btn} />
            ))}
          </div>
        </div>
        {/* Scroll indicator */}
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce-soft">
        <a
          href="#about"
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
        >
          <span className="text-sm font-handwritten">scroll down!</span>
          <ArrowDown size={20} />
        </a>
      </div>
    </section>
  );
}
