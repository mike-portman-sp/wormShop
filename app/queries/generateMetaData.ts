import { Metadata } from "next";

type SEOData = {
  metaTitle?: string;
  metaDescription?: string;
  metaImage?: {
    asset?: {
      url?: string;
    };
  };
  noIndex?: boolean;
};

type GenerateMetadataProps = {
  title?: string;
  description?: string;
  image?: string;
  seo?: SEOData;
  defaultSeo?: SEOData;
  siteName?: string;
  path?: string;
  siteUrl?: string;
};

export function generateMetadata({
  title,
  description,
  image,
  seo,
  defaultSeo,
  siteName = "Your Site",
  path = "",
  siteUrl = "",
}: GenerateMetadataProps): Metadata {
  const metaTitle =
    seo?.metaTitle || title || defaultSeo?.metaTitle || siteName;
  const metaDescription =
    seo?.metaDescription || description || defaultSeo?.metaDescription || "";
  const metaImage =
    seo?.metaImage?.asset?.url ||
    image ||
    defaultSeo?.metaImage?.asset?.url ||
    "";
  const url = `${siteUrl}${path}`;
  const noIndex = seo?.noIndex ?? false;

  return {
    title: metaTitle,
    description: metaDescription,
    robots: noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url,
      siteName,
      images: metaImage ? [metaImage] : [],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: metaImage ? [metaImage] : [],
    },
  };
}
