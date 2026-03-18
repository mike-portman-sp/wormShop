import { createClient } from "next-sanity";
import { NextRequest, NextResponse } from "next/server";

const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "v2025-12-20",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

function key() {
  return Math.random().toString(36).slice(2, 10);
}

function block(text: string, style = "normal") {
  return {
    _type: "block",
    _key: key(),
    style,
    markDefs: [],
    children: [{ _type: "span", _key: key(), text, marks: [] }],
  };
}

export async function POST(req: NextRequest) {
  const { title, slug, publishedDate, hero, cards, seo } = await req.json();

  if (!title || !slug) {
    return NextResponse.json({ error: "Title and slug are required" }, { status: 400 });
  }

  const cardDocs = (cards ?? []).map((card: any) => ({
    _type: "card",
    _key: key(),
    cardStyle: "card-image-bg",
    heading: card.heading || "",
    pills: card.pills ? card.pills.split(",").map((p: string) => p.trim()).filter(Boolean) : [],
    ...(card.imageRef ? {
      image: {
        _type: "image",
        asset: { _type: "reference", _ref: card.imageRef },
      },
    } : {}),
    button: {
      _type: "button",
      title: card.linkTitle || card.url || "",
      link: {
        _type: "link",
        linkType: "external",
        external: card.url || "#",
        openInNewTab: true,
      },
    },
  }));

  const doc = {
    _type: "page",
    title,
    slug: { _type: "slug", current: slug },
    publishedDate: publishedDate || new Date().toISOString(),
    seo: {
      _type: "seo",
      metaTitle: seo?.metaTitle || title,
      metaDescription: seo?.metaDescription || "",
    },
    pageBuilder: [
      {
        _type: "hero",
        _key: key(),
        heroStyle: "sub-page-hero",
        advancedText: {
          _type: "advancedText",
          content: [
            block(hero?.heading || title, "h1"),
            ...(hero?.body ? [block(hero.body)] : []),
          ],
        },
      },
      {
        _type: "row",
        _key: key(),
        title: "Work Cards",
        columns: String(Math.min(cardDocs.length || 1, 4)),
        contentBuilder: cardDocs,
      },
    ],
  };

  try {
    const created = await writeClient.create(doc);
    return NextResponse.json({ success: true, id: created._id, slug });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
