import Row from "./components/layout/row";
import Hero from "./components/hero/hero";
import BlogList from "./components/blog/blogList";
import ProductListBlock from "./components/shop/ProductListBlock";

export default function PageBuilder({ blocks }: { blocks: any[] }) {
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
          case "blogList":
            return <BlogList key={block._key} />;
          case "productList":
            return <ProductListBlock key={block._key} block={block} />;
          default:
            return null;
        }
      })}
    </>
  );
}
