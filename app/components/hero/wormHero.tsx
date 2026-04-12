import Image from "next/image";
import { PortableText } from "next-sanity";
import Button from "../fields/button";

const FLOATING_EMOJIS = [
  { emoji: "🪱", floatDuration: "3s",   floatDelay: "0s",    floatRotate: "15deg"  },
  { emoji: "🌿", floatDuration: "3.5s", floatDelay: "0.3s",  floatRotate: "-12deg" },
  { emoji: "🌻", floatDuration: "4s",   floatDelay: "0.6s",  floatRotate: "10deg"  },
  { emoji: "🍂", floatDuration: "3.2s", floatDelay: "0.9s",  floatRotate: "-15deg" },
  { emoji: "🌱", floatDuration: "3.8s", floatDelay: "1.2s",  floatRotate: "12deg"  },
  { emoji: "🐛", floatDuration: "3.4s", floatDelay: "1.5s",  floatRotate: "-10deg" },
];

// const TRUST_BADGES = [
//   { icon: "✅", label: "Live arrival guaranteed" },
//   { icon: "🚚", label: "Fast priority shipping" },
//   { icon: "⭐", label: "4.9 stars (2k+ reviews)" },
// ];

export default function WormHero({ hero }: { hero: any }) {
  return (
    <section
      className="relative overflow-hidden bg-primary/5"
      style={{ minHeight: "calc(100dvh - var(--nav-height))" }}
    >

      {/* Background image with overlay */}
      {hero.heroImage?.url && (
        <div className="absolute inset-0">
          <Image
            src={hero.heroImage.url}
            alt={hero.heroImage.alt ?? "Hero background"}
            fill
            className="object-cover opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/80 to-primary/20" />
        </div>
      )}

      {/* Floating emojis */}
      {FLOATING_EMOJIS.map(({ emoji, floatDuration, floatDelay, floatRotate }, i) => (
        <span
          key={i}
          className="pointer-events-none absolute text-3xl md:text-5xl opacity-20 animate-float"
          style={{
            left: `${10 + i * 14}%`,
            top: `${15 + (i % 3) * 25}%`,
            "--float-duration": floatDuration,
            "--float-delay": floatDelay,
            "--float-rotate": floatRotate,
          } as React.CSSProperties}
        >
          {emoji}
        </span>
      ))}

      <div className="container relative mx-auto px-4 py-20 md:py-32 flex items-center min-h-[calc(100dvh-var(--nav-height))] md:min-h-0 md:block">
        <div className="flex flex-col items-center text-center">

          {/* Icon image */}
          {hero.iconImage?.url && (
            <div className="mb-6 animate-scale-in">
              <Image
                src={hero.iconImage.url}
                alt={hero.iconImage.alt ?? ""}
                width={256}
                height={256}
                className="object-contain"
              />
            </div>
          )}

          {/* Eyebrow badge */}
          {hero.eyebrow?.badge && (
            <span
              className="mb-4 inline-block rounded-full bg-warm/20 px-5 py-1.5 text-sm font-semibold text-accent animate-fade-up"
              style={{ animationDelay: "0.2s" }}
            >
              {hero.eyebrow.badge}
              {hero.eyebrow?.sub && (
                <span className="ml-1 opacity-70">{hero.eyebrow.sub}</span>
              )}
            </span>
          )}

          {/* Heading */}
          <div
            className="mb-6 max-w-3xl animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            <PortableText value={hero.advancedText.content} />
          </div>

          {/* Subheading */}
          {hero.subheading && (
            <p
              className="mb-10 max-w-lg text-lg text-muted-foreground animate-fade-up"
              style={{ animationDelay: "0.5s" }}
            >
              {hero.subheading}
            </p>
          )}

          {/* CTAs */}
          {hero.buttons && hero.buttons.length > 0 && (
            <div
              className="flex flex-col gap-4 sm:flex-row animate-fade-up"
              style={{ animationDelay: "0.6s" }}
            >
              {hero.buttons.map((btn: any) => (
                <Button key={btn._key} button={btn} />
              ))}
            </div>
          )}

          {/* Trust badges */}
          <div
            className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground animate-fade-up"
            style={{ animationDelay: "0.9s" }}
          >
            {/* {TRUST_BADGES.map(({ icon, label }) => (
              <span key={label} className="flex items-center gap-1.5">
                {icon} {label}
              </span>
            ))} */}
          </div>

        </div>
      </div>
    </section>
  );
}
