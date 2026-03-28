import AdvancedText from "../fields/advancedText";
import "../../../styles/sass/components/hero.scss";

export default function SubPageHero({ hero }: { hero: any }) {
  return (
    <section id="subPageHero" className="relative overflow-hidden flex py-24">
      <div className="container mx-auto px-6 relative z-10">
        <div className="mx-auto text-center">
          <div
            className="font-bold leading-tight mt-6 mb-4"
            style={{ animationDelay: "0.2s" }}
          >
            {hero.advancedText?.content && (
              <AdvancedText content={hero.advancedText.content} />
            )}
          </div>

          <p
            className="text-2xl md:text-3xl text-muted-foreground mb-6 font-handwritten"
            style={{ animationDelay: "0.3s" }}
          >
            {hero.subheading}
          </p>
        </div>
      </div>
    </section>
  );
}
