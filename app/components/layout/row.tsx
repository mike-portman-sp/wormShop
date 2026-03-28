import Column from "./column";
import Card from "./card";
import CardBG from "./cardBG";
import InnerRow from "./innerRow";
import { getGridClass } from "../utils/gridUtils";

type RowProps = {
  columns?: any[];
  columnLayout?: string;
  title?: string;
  backgroundColor?: string;
};

export default function Row({ columns, columnLayout, title, backgroundColor }: RowProps) {
  const gridClass = getGridClass(columnLayout);

  return (
    <section id={title?.toLowerCase()} className={`row py-md mx-auto ${backgroundColor}`}>
      <div className={`grid ${gridClass} container gap-8 container-custom mx-auto `}>
        {columns?.map((item) => {
          if (item._type === "card") {
            if (item.cardStyle === "card-image-bg") return <CardBG key={item._key} card={item} />;
            return <Card key={item._key} card={item} />;
          }

          if (item._type === "innerRow") {
            return (
              <InnerRow
                key={item._key}
                columns={item.contentBuilder}
                columnLayout={item.columnLayout}
                title={item.title}
              />
            );
          }

          return <Column key={item._key} column={item} />;
        })}
      </div>
    </section>
  );
}
