import MainHero from "./mainHero";
import WormHero from "./wormHero";
import SubPageHero from "./subPageHero";

export default function Hero({ hero }: { hero: any }) {
  if (!hero) return null;

  switch (hero.heroStyle) {
    case "main-hero":
      return <MainHero hero={hero} />;
    case "worm-hero":
      return <WormHero hero={hero} />;
    case "sub-page-hero":
      return <SubPageHero hero={hero} />;
    default:
      return <MainHero hero={hero} />;
  }
}
