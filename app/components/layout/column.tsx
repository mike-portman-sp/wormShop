import Heading from "../fields/heading";
import ImageField from "../fields/imageField";
import AdvancedText from "../fields/advancedText";
import Button from "../fields/button";
import Form from "../layout/form";
import Pill from "../fields/pill";
import type { ContentBlock } from "../../types/sanity";

type ColumnProps = {
  column: {
    columnContent?: ContentBlock[];
    customClass?: string;
    columnStyle?: string;
    colHorizontalAlign?: string;
    colVerticalAlign?: string;
    colTextAlign?: string;
    colGap?: string;
  };
};

export default function Column({ column }: ColumnProps) {
  if (!column?.columnContent?.length) return null;

  const customClass = column.customClass || "";

  const shadowCard =
    column.columnStyle === "shadow"
      ? "bg-card border border-border md:p-12 p-4 md:p-8 rounded-3xl shadow-soft gap-8"
      : "";

  return (
    <div
      className={`p-4 max-w-6xl mx-auto column flex flex-col ${column.colGap} ${shadowCard} ${customClass} ${column.colHorizontalAlign || ""} ${column.colVerticalAlign || ""} ${column.colTextAlign || ""}`}
    >
      {column.columnContent.map((block) => {
        switch (block._type) {
          case "heading":
            return <Heading key={block._key} {...block} />;
          case "imageField":
            return <ImageField key={block._key} imageField={block} />;
          case "advancedText":
            return <AdvancedText key={block._key} content={block.content as any} />;
          case "button":
            return <Button key={block._key} button={block as any} />;
          case "form":
            return <Form key={block._key} form={block as any} />;
          case "pill":
            return <Pill key={block._key} pill={block} />;
          default:
            return null;
        }
      })}
    </div>
  );
}
