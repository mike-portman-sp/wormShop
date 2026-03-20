import Image from "next/image";
import { PortableText } from "next-sanity";
import Button from "../fields/button";

const TRUST_BADGES = [
  { icon: "✦", label: "Free Shipping $50+" },
  { icon: "✦", label: "Live Guarantee" },
  { icon: "✦", label: "Organically Raised" },
  { icon: "✦", label: "Eco Packaging" },
];

export default function MainHero({ hero }: { hero: any }) {
  return (
    <section
      id="mainHero"
      className="relative overflow-hidden"
      style={{ minHeight: "calc(100dvh - var(--nav-height))" }}
    >
      {/* Warm ambient glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-48 right-0 w-150 h-150 rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle, hsl(35 72% 40%) 0%, transparent 65%)",
          }}
        />
        <div
          className="absolute top-1/2 -left-32 w-100 h-100 rounded-full opacity-12"
          style={{
            background:
              "radial-gradient(circle, hsl(22 65% 48%) 0%, transparent 65%)",
          }}
        />
        {/* Subtle vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 50%, hsl(35 30% 80% / 0.5) 100%)",
          }}
        />
      </div>

      <div className="container mx-auto max-w-6xl px-6 relative z-10 flex items-center py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full">

          {/* ── Left: copy ── */}
          <div className="flex flex-col gap-5">

            {/* Vintage stamp badge */}
            <div
              className="inline-flex items-center gap-3 w-fit animate-fade-up"
              style={{ animationDelay: "0.05s" }}
            >
              <div
                className="px-4 py-1.5 border border-accent/50 text-accent text-xs font-bold uppercase tracking-[0.2em]"
                style={{
                  clipPath:
                    "polygon(6px 0%, calc(100% - 6px) 0%, 100% 50%, calc(100% - 6px) 100%, 6px 100%, 0% 50%)",
                  background: "hsl(35 72% 40% / 0.12)",
                }}
              >
                Est. in Your Backyard
              </div>
              <span className="text-muted-foreground text-xs tracking-widest uppercase">
                Since 2024
              </span>
            </div>

            {/* Heading */}
            <div
              className="animate-fade-up"
              style={{ animationDelay: "0.15s" }}
            >
              {hero.advancedText?.content ? (
                <PortableText value={hero.advancedText.content} />
              ) : (
                <h1>
                  Turn Kitchen Scraps Into{" "}
                  <strong>Garden Gold</strong>
                </h1>
              )}
            </div>

            {/* Ornate divider */}
            <div
              className="divider-ornate text-sm animate-fade-up"
              style={{ animationDelay: "0.2s" }}
            >
              ◆
            </div>

            {/* Subheading */}
            {hero.subheading && (
              <p
                className="text-base md:text-lg text-muted-foreground leading-relaxed animate-fade-up"
                style={{ animationDelay: "0.25s" }}
              >
                {hero.subheading}
              </p>
            )}

            {/* CTAs */}
            {hero.buttons && hero.buttons.length > 0 && (
              <div
                className="flex flex-wrap gap-3 animate-fade-up"
                style={{ animationDelay: "0.35s" }}
              >
                {hero.buttons.map((btn: any) => (
                  <Button key={btn._key} button={btn} />
                ))}
              </div>
            )}

            {/* Trust row */}
            <div
              className="flex flex-wrap gap-x-5 gap-y-2 pt-1 animate-fade-up"
              style={{ animationDelay: "0.45s" }}
            >
              {TRUST_BADGES.map(({ icon, label }) => (
                <span
                  key={label}
                  className="flex items-center gap-1.5 text-xs text-muted-foreground"
                >
                  <span className="text-accent text-[10px]">{icon}</span>
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* ── Right: hero image ── */}
          {hero.heroImage?.url && (
            <div
              className="hidden lg:flex items-center justify-center animate-fade-up"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="relative w-full max-w-lg aspect-square rounded-3xl overflow-hidden border border-border/60 shadow-xl">
                <Image
                  src={hero.heroImage.url}
                  alt={hero.heroImage.alt ?? "Hero image"}
                  fill
                  className="object-cover"
                  sizes="512px"
                  priority
                />
              </div>
            </div>
          )}
 
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, hsl(38 42% 93%), transparent)",
        }}
      />
    </section>
  );
}

function VintageTag({
  position,
  text,
}: {
  position: "top" | "bottom" | "left" | "right";
  text: string;
}) {
  const posClass = {
    top:    "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2",
    bottom: "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2",
    left:   "left-0 top-1/2 -translate-y-1/2 -translate-x-1/2",
    right:  "right-0 top-1/2 -translate-y-1/2 translate-x-1/2",
  }[position];

  return (
    <div
      className={`absolute ${posClass} px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest whitespace-nowrap`}
      style={{
        background: "hsl(28 28% 18%)",
        border: "1px solid hsl(35 65% 38% / 0.5)",
        color: "hsl(38 45% 76%)",
      }}
    >
      {text}
    </div>
  );
}
