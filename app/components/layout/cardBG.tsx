// cardbg.tsx
import { getLinkUrl } from "../utils/linkHelpers";
import imageField from "../fields/imageField";
import { urlFor } from "../fields/sanityImageUrl";

type CardBGProps = {
  card: {
    _key: string;
    heading?: string;
    text?: string;
    pills?: string[];
    image?: any; // The image field data
    button?: {
       targetBlank?: boolean;
      link?: any;
    };
  };
};

export default function CardBG({ card }: CardBGProps) {
  if (!card) return null;

  return (
    <section className="relative cardBG max-h-[50vh] h-[50vh]">
      <div className="mx-auto h-full">
        <div className="mx-auto grid h-full">
          <a
            key={card._key}
            href={card.button?.link ? getLinkUrl(card.button.link) : "#"}
target={card.button?.link?.openInNewTab ? "_blank" : undefined}
rel={card.button?.link?.openInNewTab ? "noopener noreferrer" : undefined}
            
            className="group relative rounded-3xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 hover-lift h-full"
          >
            {/* Thumbnail Background */}
            {card.image && (
              <img
                src={urlFor(card.image).width(800).url()}
                alt={card.image.alt || `${card.heading} website screenshot`}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            )}
            {/* Overlay */}
            <div className="absolute inset-0 bg-background/60 group-hover:bg-background/80 transition-all duration-300" />
            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-8">
              <div className="flex flex-wrap gap-2 mb-3">
                {card.pills?.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded-full bg-primary/20 backdrop-blur-sm text-xs font-medium text-primary-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="text-2xl font-bold mb-1 group-hover:text-primary transition-colors">
                {card.heading}
              </h3>
              {card.text && (
                <p className="text-sm text-muted-foreground">{card.text}</p>
              )}
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
