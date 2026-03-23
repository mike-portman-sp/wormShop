import { groq } from "next-sanity";

const productImageProjection = `
  "url": asset->url,
  alt
`;

export const allProductsQuery = groq`
  *[_type == "product" && inStock == true && !(category in ["castings", "kits"])] | order(_createdAt desc) {
    _id,
    name,
    "slug": slug.current,
    category,
    badge,
    shortDescription,
    price,
    compareAtPrice,
    inStock,
    weightOptions,
    "image": images[0]{
      ${productImageProjection}
    }
  }
`;

export const productsByCategoryQuery = groq`
  *[_type == "product" && inStock == true && category == $category && !(category in ["castings", "kits"])] | order(_createdAt desc) {
    _id,
    name,
    "slug": slug.current,
    category,
    badge,
    shortDescription,
    price,
    compareAtPrice,
    inStock,
    weightOptions,
    "image": images[0]{
      ${productImageProjection}
    }
  }
`;

export const productDetailQuery = groq`
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    category,
    badge,
    shortDescription,
    description,
    features,
    careInstructions,
    price,
    compareAtPrice,
    inStock,
    stockQuantity,
    weightOptions,
    "image": images[0]{
      ${productImageProjection}
    },
    "images": images[]{
      ${productImageProjection}
    },
    seo
  }
`;

export const featuredProductsQuery = groq`
  *[_type == "product" && _id in $ids] {
    _id,
    name,
    "slug": slug.current,
    category,
    badge,
    shortDescription,
    price,
    compareAtPrice,
    inStock,
    weightOptions,
    "image": images[0]{
      ${productImageProjection}
    }
  }
`;
