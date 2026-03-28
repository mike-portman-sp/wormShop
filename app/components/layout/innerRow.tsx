import Column from "./column";
import Card from "./card";
import CardBG from "./cardBG";
import { getGridClass, getOrphanWidth } from "../utils/gridUtils";

type RowProps = {
  columns?: any[];
  columnLayout?: string;
  title?: string;
};

export default function InnerRow({ columns, columnLayout, title }: RowProps) {
  const colCount = parseInt(columnLayout || "1");
  const gridClass = getGridClass(columnLayout);
  const orphanWidth = getOrphanWidth(colCount);
  const isOrphan = !!columns?.length && columns.length % colCount === 1;

  const renderItem = (item: any) => {
    if (item._type === "card") {
      if (item.cardStyle === "card-image-bg") return <CardBG card={item} />;
      return <Card card={item} />;
    }
    return <Column column={item} />;
  };

  return (
    <section
      id={title?.toLowerCase()}
      className="row inner-row py-md w-full mx-auto"
    >
      <div
        className={`grid ${gridClass} container gap-8 container-custom mx-auto`}
      >
        {columns?.map((item, index) => {
          if (isOrphan && index === columns.length - 1) {
            return (
              <div key={item._key} className="col-span-full flex justify-center">
                <div className={`w-full ${orphanWidth}`}>
                  {renderItem(item)}
                </div>
              </div>
            );
          }

          if (item._type === "card") {
            if (item.cardStyle === "card-image-bg") return <CardBG key={item._key} card={item} />;
            return <Card key={item._key} card={item} />;
          }

          return <Column key={item._key} column={item} />;
        })}
      </div>
    </section>
  );
}
