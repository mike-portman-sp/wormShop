import { Metadata } from "next";
import imageUrlBuilder from "@sanity/image-url";
import { createClient } from "@sanity/client";

const builder = imageUrlBuilder(
  createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
    apiVersion: "v2025-12-20",
    useCdn: true,
  })
);

type SanityImage = {
  hotspot?: { x: number; y: number; width: number; height: number };
  crop?: { top: number; bottom: number; left: number; right: number };
  asset?: { _id?: string; url?: string };
};

type SEOData = {
  metaTitle?: string;
  metaDescription?: string;
  metaImage?: SanityImage;
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

function buildSocialImages(img: SanityImage | undefined, fallbackUrl?: string) {
  if (!img?.asset?._id && !fallbackUrl) return [];

  if (img?.asset?._id) {
    const base = builder.image(img);
    return [
      // OG — Facebook, LinkedIn, Discord, Slack, Pinterest, WhatsApp
      {
        url: base.width(1200).height(630).fit("crop").auto("format").url(),
        width: 1200,
        height: 630,
        alt: "",
      },
    ];
  }

  return fallbackUrl ? [fallbackUrl] : [];
}

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
  const metaImageData = seo?.metaImage ?? defaultSeo?.metaImage;
  const url = `${siteUrl}${path}`;
  const noIndex = seo?.noIndex ?? false;

  const ogImages = buildSocialImages(metaImageData, image);
  // Twitter accepts same format — 1200×630 works for summary_large_image
  const twitterImages = ogImages;

  return {
    title: metaTitle,
    description: metaDescription,
    robots: noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url,
      siteName,
      images: ogImages,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: twitterImages,
    },
  };
}
