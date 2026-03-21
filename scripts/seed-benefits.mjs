import { createClient } from "@sanity/client";
import { readFileSync } from "fs";
import { resolve } from "path";
import { randomUUID as uuid } from "crypto";

// Load .env.local manually (no dotenv dependency needed)
const envPath = resolve(process.cwd(), ".env.local");
const envVars = Object.fromEntries(
  readFileSync(envPath, "utf8")
    .split("\n")
    .filter((l) => l && !l.startsWith("#"))
    .map((l) => l.split("=").map((p, i) => (i === 0 ? p.trim() : l.slice(l.indexOf("=") + 1).trim())))
);

const token = envVars.SANITY_API_TOKEN;
if (!token) { console.error("SANITY_API_TOKEN not found in .env.local"); process.exit(1); }

const client = createClient({
  projectId: "p0x6p47i",
  dataset: "production",
  apiVersion: "v2025-12-20",
  token,
  useCdn: false,
});

// helpers
const block = (text, style = "normal") => ({
  _type: "block",
  _key: uuid(),
  style,
  markDefs: [],
  children: [{ _type: "span", _key: uuid(), text, marks: [] }],
});

const strongBlock = (text, style = "normal") => ({
  _type: "block",
  _key: uuid(),
  style,
  markDefs: [],
  children: [{ _type: "span", _key: uuid(), text, marks: ["strong"] }],
});

const advancedText = (...blocks) => ({
  _type: "advancedText",
  _key: uuid(),
  content: blocks,
});

const heading = (text, level = 2) => ({
  _type: "heading",
  _key: uuid(),
  text,
  level,
});

const column = (title, opts = {}, ...columnContent) => ({
  _type: "column",
  _key: uuid(),
  title,
  flexDirection: "flex-col",
  colHorizontalAlign: opts.align ?? "items-start",
  colVerticalAlign: "align-top",
  colTextAlign: opts.textAlign ?? "text-left",
  colGap: "gap-6",
  columnContent,
});

const imageField = (assetRef, { borderRadius = true, maxHeight } = {}) => ({
  _type: "imageField",
  _key: uuid(),
  borderRadius,
  ...(maxHeight ? { maxHeight } : {}),
  asset: { _type: "reference", _ref: assetRef },
});

const row = (title, columns_count, ...contentBuilder) => ({
  _type: "row",
  _key: uuid(),
  title,
  columns: columns_count,
  contentBuilder,
});

// ── Page Builder ──────────────────────────────────────────────────────────────

const pageBuilder = [

  // 1. Hero
  {
    _type: "hero",
    _key: uuid(),
    heroStyle: "sub-page-hero",
    eyebrow: { badge: "Nature's Composters", sub: "Red Wigglers" },
    advancedText: advancedText(
      block("Why Red Wigglers?", "h1"),
    ),
    subheading:
      "The humble Eisenia fetida is one of the most effective, low-maintenance allies your garden (and kitchen) will ever have.",
  },

  // 2. Intro row — 2 col: text left, image right
  row(
    "Intro",
    2,
    column(
      "Intro Text",
      {},
      heading("Small worm. Big impact.", 2),
      advancedText(
        block(
          "Every year, the average household sends over 200 lbs of food scraps straight to landfill — where they rot, produce methane, and contribute to climate change. Red wigglers turn that problem into a solution. Give them your kitchen scraps; they'll give you the richest fertiliser on earth."
        )
      )
    ),
    column(
      "Intro Image",
      { align: "items-center" },
      imageField("image-3c08651f90a2bb7ba620115b7418b5ebd118b98c-1536x1024-png", { borderRadius: true })
    )
  ),

  // 3. Three benefits — 3 cols
  row(
    "Three Benefits",
    3,
    column(
      "Less Waste",
      {},
      heading("♻ Less Waste", 3),
      advancedText(
        block(
          "Red wigglers can consume roughly half their body weight in organic matter every single day. Coffee grounds, fruit peels, vegetable scraps, cardboard — nothing goes to landfill. A single pound of worms can divert 3–4 lbs of food waste per week, turning guilt into compost."
        ),
        block("What they'll eat:"),
        {
          _type: "block",
          _key: uuid(),
          style: "normal",
          listItem: "bullet",
          level: 1,
          markDefs: [],
          children: [{ _type: "span", _key: uuid(), text: "Fruit & vegetable scraps", marks: [] }],
        },
        {
          _type: "block",
          _key: uuid(),
          style: "normal",
          listItem: "bullet",
          level: 1,
          markDefs: [],
          children: [{ _type: "span", _key: uuid(), text: "Coffee grounds & tea bags", marks: [] }],
        },
        {
          _type: "block",
          _key: uuid(),
          style: "normal",
          listItem: "bullet",
          level: 1,
          markDefs: [],
          children: [{ _type: "span", _key: uuid(), text: "Cardboard & paper", marks: [] }],
        },
        {
          _type: "block",
          _key: uuid(),
          style: "normal",
          listItem: "bullet",
          level: 1,
          markDefs: [],
          children: [{ _type: "span", _key: uuid(), text: "Egg shells & plant trimmings", marks: [] }],
        }
      )
    ),
    column(
      "Better Soil",
      {},
      heading("🌱 Better Soil", 3),
      advancedText(
        block(
          "Worm castings — the polite name for worm poo — are plant superfood. They're 5× richer in nitrogen, 7× richer in phosphorus, and 11× richer in potassium than ordinary garden soil. They also contain beneficial microbes, humic acid, and natural growth hormones that wake up dormant seeds and supercharge root development."
        ),
        block("By the numbers:"),
        {
          _type: "block",
          _key: uuid(),
          style: "normal",
          listItem: "bullet",
          level: 1,
          markDefs: [],
          children: [{ _type: "span", _key: uuid(), text: "5× more nitrogen than topsoil", marks: [] }],
        },
        {
          _type: "block",
          _key: uuid(),
          style: "normal",
          listItem: "bullet",
          level: 1,
          markDefs: [],
          children: [{ _type: "span", _key: uuid(), text: "Improves soil water retention by up to 40%", marks: [] }],
        },
        {
          _type: "block",
          _key: uuid(),
          style: "normal",
          listItem: "bullet",
          level: 1,
          markDefs: [],
          children: [{ _type: "span", _key: uuid(), text: "Neutral pH — safe for all plants", marks: [] }],
        },
        {
          _type: "block",
          _key: uuid(),
          style: "normal",
          listItem: "bullet",
          level: 1,
          markDefs: [],
          children: [{ _type: "span", _key: uuid(), text: "No burning — unlike synthetic fertilisers", marks: [] }],
        }
      )
    ),
    column(
      "Fun Hobby",
      {},
      heading("🪱 A Surprisingly Fun Hobby", 3),
      advancedText(
        block(
          "Vermicomposting has a way of growing on you (pun intended). It's meditative, endlessly interesting, and totally family-friendly. Kids love checking on the worms, naming the colony, and watching scraps disappear. Adults love the ritual of feeding day and the satisfaction of harvesting jet-black castings."
        ),
        block("Why people love it:"),
        {
          _type: "block",
          _key: uuid(),
          style: "normal",
          listItem: "bullet",
          level: 1,
          markDefs: [],
          children: [{ _type: "span", _key: uuid(), text: "5 minutes of effort per week", marks: [] }],
        },
        {
          _type: "block",
          _key: uuid(),
          style: "normal",
          listItem: "bullet",
          level: 1,
          markDefs: [],
          children: [{ _type: "span", _key: uuid(), text: "Odour-free when managed correctly", marks: [] }],
        },
        {
          _type: "block",
          _key: uuid(),
          style: "normal",
          listItem: "bullet",
          level: 1,
          markDefs: [],
          children: [{ _type: "span", _key: uuid(), text: "Works indoors — apartment friendly", marks: [] }],
        },
        {
          _type: "block",
          _key: uuid(),
          style: "normal",
          listItem: "bullet",
          level: 1,
          markDefs: [],
          children: [{ _type: "span", _key: uuid(), text: "Great for kids & schools", marks: [] }],
        }
      )
    )
  ),

  // 4. Deep dive — 2 cols
  row(
    "Deep Dive",
    2,
    column(
      "Worm Tea",
      {},
      heading("Liquid Gold: Worm Tea", 2),
      advancedText(
        block(
          "Beyond solid castings, a worm bin produces worm leachate — the dark liquid that drains through the bin. Dilute it 10:1 with water and use it as a foliar spray or soil drench. Plants respond within days: greener leaves, stronger stems, more flowers."
        ),
        block(
          "For an even more potent brew, aerate castings in water for 24 hours to create actively aerated compost tea (AACT) — a microbial powerhouse that can inoculate your entire garden."
        )
      )
    ),
    column(
      "Planet Impact",
      {},
      heading("Good for the Planet", 2),
      advancedText(
        block(
          "Food waste in landfills generates methane, a greenhouse gas 80× more potent than CO₂ over 20 years. Diverting food scraps through vermicomposting doesn't just eliminate that methane — it sequesters carbon back into the soil, completing the natural nutrient cycle."
        ),
        block(
          "If just 10% of UK households started a worm bin, it would divert an estimated 750,000 tonnes of food waste per year from landfill. Your bin — however small — is part of that number."
        )
      )
    )
  ),

  // 5. Getting started CTA — 1 col, centered
  row(
    "CTA",
    1,
    column(
      "CTA",
      { align: "items-center", textAlign: "text-center" },
      heading("Ready to start your colony?", 2),
      advancedText(
        block(
          "Our red wigglers are organically raised, healthy, and ready to get to work. Every order comes with a care guide so you can hit the ground running — no experience needed."
        )
      ),
      {
        _type: "button",
        _key: uuid(),
        title: "Shop Red Wigglers",
        style: "btn--sun",
        link: {
          _type: "link",
          linkType: "internal",
        },
      }
    )
  ),
];

// ── Find & patch ──────────────────────────────────────────────────────────────

const doc = await client.fetch(
  `*[_type == "page" && slug.current == "benefits"][0]{ _id }`
);

if (!doc) {
  console.error("❌  No page with slug 'benefits' found. Create it in the Studio first.");
  process.exit(1);
}

await client.patch(doc._id).set({ pageBuilder }).commit();
console.log(`✅  Benefits page (${doc._id}) updated with ${pageBuilder.length} blocks.`);
