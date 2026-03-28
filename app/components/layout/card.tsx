import Button from "../fields/button";

export default function Card({ card }: { card: any }) {
  if (!card) return null;

  return (
    <div className="container mx-auto px-6">
      <div className="mx-auto">
        <div
          className={`group p-8 ${card.cardBG} rounded-3xl  border border-border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
        >
          <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
            {card.heading}
          </h3>
          <p className="text-muted-foreground mb-4">{card.text}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {card.pills?.map((tag: any) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-background/80 text-xs font-medium text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
          {card.button && <Button button={card.button} />}
        </div>
      </div>
    </div>
  );
}
