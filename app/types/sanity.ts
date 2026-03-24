export type WeightOption = {
  label: string;
  priceModifier: number;
};

export type ProductImage = {
  url: string;
  alt?: string;
};

export type Product = {
  _id: string;
  name: string;
  slug: string;
  category?: string;
  badge?: string;
  shortDescription?: string;
  description?: {
    content?: any[];
  };
  features?: string[];
  careInstructions?: string;
  price: number;
  compareAtPrice?: number;
  inStock: boolean;
  stockQuantity?: number;
  weightOptions?: WeightOption[];
  image?: ProductImage;
  images?: ProductImage[];
  pageBuilder?: ContentBlock[];
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    noIndex?: boolean;
  };
};

export type CartItem = {
  _id: string;
  name: string;
  price: number;
  image?: string;
  quantity: number;
  slug: string;
  selectedWeight?: string;
};

export type LinkField = {
  _type?: string;
  linkType: "internal" | "external" | "file";
  external?: string;
  openInNewTab?: boolean;
  internal?: {
    _type?: string;
    slug?: {
      current: string;
    };
  };
  file?: {
    asset?: {
      url?: string;
    };
  };
};

export type ButtonField = {
  _key?: string;
  _type?: string;
  title: string;
  style?: string;
  targetBlank?: boolean;
  link?: LinkField;
};

export type ContentBlock = {
  _key: string;
  _type: string;
  [key: string]: unknown;
};
