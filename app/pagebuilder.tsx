import Row from "./components/layout/row";
import Hero from "./components/hero/hero";
import ProductListBlock from "./components/shop/ProductListBlock";
import Form from "./components/layout/form";

export default function PageBuilder({ blocks }: { blocks: any[] | null }) {
  if (!blocks) return null;
  return (
    <>
      {blocks.map((block) => {
        switch (block._type) {
          case "hero":
            return <Hero key={block._key} hero={block} />;
          case "row":
            return (
              <Row
                key={block._key}
                columns={block.contentBuilder}
                columnLayout={block.columns}
                title={block.title}
                backgroundColor={block.backgroundColor ? `${block.backgroundColor}` : undefined}
              />
            );
          case "productList":
            return <ProductListBlock key={block._key} block={block} />;
          case "form":
            return <Form key={block._key} form={block} />;
          default:
            return null;
        }
      })}
    </>
  );
}
