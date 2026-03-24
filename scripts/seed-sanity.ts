import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "p0x6p47i",
  dataset: "production",
  apiVersion: "v2025-12-20",
  token: "skXWe5JmvmFNxpwacKT7nYXxpaubx92QMAeh3vjaaWGE4R02C2I6XuVmL1OM5R6aNXrG4y9HVGNO4GR1J",
  useCdn: false,
});

// ─── Helpers ────────────────────────────────────────────────────────────────

function block(text: string, style = "normal") {
  return {
    _type: "block",
    _key: Math.random().toString(36).slice(2, 10),
    style,
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: Math.random().toString(36).slice(2, 10),
        text,
        marks: [],
      },
    ],
  };
}

function boldBlock(text: string) {
  const spanKey = Math.random().toString(36).slice(2, 10);
  return {
    _type: "block",
    _key: Math.random().toString(36).slice(2, 10),
    style: "normal",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: spanKey,
        text,
        marks: ["strong"],
      },
    ],
  };
}

function h2Block(text: string) {
  return {
    _type: "block",
    _key: Math.random().toString(36).slice(2, 10),
    style: "h2",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: Math.random().toString(36).slice(2, 10),
        text,
        marks: [],
      },
    ],
  };
}

function advancedText(blocks: any[]) {
  return { content: blocks };
}

// ─── Products ────────────────────────────────────────────────────────────────

const products = [
  {
    _id: "product-red-wigglers",b
    _type: "product",
    name: "Red Wigglers — Live Composting Worms",
    slug: { _type: "slug", current: "red-wigglers" },
    category: "red-wigglers",
    badge: "Best Seller",
    shortDescription:
      "The #1 worm for home composting. Red Wigglers (Eisenia fetida) eat half their weight in food scraps daily, producing rich vermicompost your garden will love.",
    description: advancedText([
      h2Block("The Ultimate Composting Worm"),
      block(
        "Red Wigglers (Eisenia fetida) are the most popular composting worm in the world — and for good reason. These voracious eaters can consume up to half their body weight in organic matter every single day, transforming your kitchen scraps, coffee grounds, and cardboard into premium vermicompost."
      ),
      block(
        "Unlike earthworms, Red Wigglers thrive in the top layers of soil and in worm bins, making them perfect for apartment composting, backyard bins, and raised garden beds. They breed rapidly, doubling their population every 60–90 days under ideal conditions."
      ),
      h2Block("What's Included"),
      block("Each order includes live, healthy Red Wigglers packed in moist bedding to ensure they arrive safe and active. We include a starter guide with setup instructions, feeding tips, and troubleshooting advice."),
      h2Block("Ideal Uses"),
      block(
        "Home vermicomposting bins · Kitchen scrap reduction · Soil amendment · Fishing bait · School and classroom composting projects · Garden bed inoculation"
      ),
    ]),
    features: [
      "Live delivery guaranteed — arrive healthy or we reship free",
      "Eats up to 50% of body weight in food scraps daily",
      "Produces premium vermicompost in as little as 60 days",
      "Thrives in temperatures between 55–77°F (13–25°C)",
      "Reproduces rapidly — doubles every 60–90 days",
      "Organically raised, no chemicals or pesticides",
      "Packed in eco-friendly, compostable materials",
    ],
    careInstructions:
      "Keep worms in a breathable container with moist (not wet) bedding like shredded newspaper or coconut coir. Maintain temperature between 55–77°F. Feed kitchen scraps, coffee grounds, and cardboard. Avoid meat, dairy, and citrus. Harvest castings every 2–3 months.",
    price: 29.99,
    compareAtPrice: 34.99,
    inStock: true,
    stockQuantity: 500,
    weightOptions: [
      { _key: "w1", label: "0.5 lb — Starter Pack (~500 worms)", priceModifier: -10 },
      { _key: "w2", label: "1 lb — Standard (~1,000 worms)", priceModifier: 0 },
      { _key: "w3", label: "2 lb — Family Size (~2,000 worms)", priceModifier: 19 },
      { _key: "w4", label: "5 lb — Bulk / Garden (~5,000 worms)", priceModifier: 60 },
    ],
    seo: {
      metaTitle: "Buy Red Wigglers Live Composting Worms | wormShop",
      metaDescription:
        "Order live Red Wigglers (Eisenia fetida) for home composting. Live delivery guaranteed. Fast shipping across the US and Canada.",
    },
  },

  {
    _id: "product-european-nightcrawlers",
    _type: "product",
    name: "European Nightcrawlers — Premium Composting & Fishing Worms",
    slug: { _type: "slug", current: "european-nightcrawlers" },
    category: "european-nightcrawlers",
    badge: "Dual Purpose",
    shortDescription:
      "Bigger, hardier, and incredibly versatile. European Nightcrawlers (Eisenia hortensis) are elite composters and the best live fishing bait available.",
    description: advancedText([
      h2Block("The Hardworking All-Rounder"),
      block(
        "European Nightcrawlers (Eisenia hortensis), also known as 'Super Reds', are the larger, tougher cousin of the Red Wiggler. They excel in cooler conditions, making them ideal for outdoor composting in spring and fall, and they stay lively on the hook far longer than any other bait worm."
      ),
      block(
        "At 3–4 inches when mature, European Nightcrawlers produce exceptional castings and handle a wider range of organic waste, including tougher materials like cardboard and straw. They're a favorite among serious composters and anglers alike."
      ),
      h2Block("Why Anglers Love Them"),
      block(
        "European Nightcrawlers are incredibly active on the hook. Their natural wiggle action and hardiness in water make them irresistible to bass, perch, trout, catfish, and panfish. Unlike Canadian Nightcrawlers, they store easily and last weeks in a cool worm box."
      ),
    ]),
    features: [
      "Live delivery guaranteed — arrive healthy or we reship free",
      "3–4 inches at maturity — larger than Red Wigglers",
      "Excellent composters AND premium fishing bait",
      "Tolerates cooler temperatures down to 45°F",
      "Stays lively on the hook — irresistible to bass, trout & panfish",
      "Thrives on tougher organic material like cardboard and straw",
      "Organically raised, no chemicals",
    ],
    careInstructions:
      "Store in a cool location (45–70°F ideal). Keep bedding moist with shredded newspaper or peat moss. Feed vegetable scraps, coffee grounds, and grains. For fishing, store in the fridge in worm bedding — they'll last weeks. Avoid temperatures above 80°F.",
    price: 34.99,
    compareAtPrice: null,
    inStock: true,
    stockQuantity: 300,
    weightOptions: [
      { _key: "w1", label: "0.5 lb — Starter (~250 worms)", priceModifier: -12 },
      { _key: "w2", label: "1 lb — Standard (~500 worms)", priceModifier: 0 },
      { _key: "w3", label: "2 lb — Bulk (~1,000 worms)", priceModifier: 24 },
    ],
    seo: {
      metaTitle: "European Nightcrawlers — Composting & Fishing Worms | wormShop",
      metaDescription:
        "Buy live European Nightcrawlers — premium composting worms and the best live fishing bait. Ships fresh with live delivery guarantee.",
    },
  },

  {
    _id: "product-african-nightcrawlers",
    _type: "product",
    name: "African Nightcrawlers — Tropical Composting Powerhouse",
    slug: { _type: "slug", current: "african-nightcrawlers" },
    category: "african-nightcrawlers",
    badge: "High Output",
    shortDescription:
      "The fastest vermicompost producers in the warm-weather world. African Nightcrawlers (Eudrilus eugeniae) are massive, prolific, and thrive in heat.",
    description: advancedText([
      h2Block("Nature's Fastest Composters"),
      block(
        "African Nightcrawlers (Eudrilus eugeniae) are the workhorses of tropical vermicomposting. These large, vigorous worms — reaching 6–8 inches at maturity — consume organic waste at an extraordinary rate and produce large, nutrient-dense castings that are among the best vermicompost available."
      ),
      block(
        "They thrive in warm conditions (70–85°F), making them the top choice for composters in warmer climates, heated indoor bins, or greenhouses. Their rapid reproduction rate and enormous casting output make them a favorite of commercial vermiculture operations."
      ),
      h2Block("Best For"),
      block(
        "Warm-climate outdoor composting · Heated indoor worm bins · Commercial vermiculture · Tropical regions · Greenhouse composting"
      ),
    ]),
    features: [
      "Live delivery guaranteed",
      "Massive size — up to 6–8 inches at maturity",
      "Fastest casting producers of any composting worm species",
      "Thrives in warm temperatures 70–85°F",
      "Exceptional for warm climates and heated indoor bins",
      "Reproduces rapidly in optimal conditions",
      "Organically raised",
    ],
    careInstructions:
      "Requires warm temperatures — ideal range is 70–85°F. Will die below 55°F, so keep indoors during cold months. Needs higher moisture levels than Red Wigglers. Feed generously with fruit peels, vegetable scraps, and coffee grounds. Avoid cold drafts.",
    price: 39.99,
    compareAtPrice: null,
    inStock: true,
    stockQuantity: 150,
    weightOptions: [
      { _key: "w1", label: "0.5 lb — Starter", priceModifier: -14 },
      { _key: "w2", label: "1 lb — Standard", priceModifier: 0 },
    ],
    seo: {
      metaTitle: "African Nightcrawlers Live Worms | wormShop",
      metaDescription:
        "Buy live African Nightcrawlers — the fastest composting worms for warm climates. Premium vermicompost producers shipped fresh.",
    },
  },

  {
    _id: "product-worm-castings",
    _type: "product",
    name: "Premium Worm Castings — Pure Vermicompost",
    slug: { _type: "slug", current: "worm-castings" },
    category: "castings",
    badge: "Soil Superfood",
    shortDescription:
      "100% pure worm castings — the richest, most bioavailable soil amendment on earth. No additives, no fillers, just worm gold straight from our bins.",
    description: advancedText([
      h2Block("Pure Worm Gold for Your Garden"),
      block(
        "Our premium worm castings are produced by our own Red Wiggler colonies fed exclusively on organic food scraps and bedding — no additives, no chemicals, no fillers. The result is a rich, dark, earthy amendment packed with beneficial microorganisms, humic acids, and slow-release nutrients."
      ),
      block(
        "Unlike chemical fertilizers, worm castings won't burn plants even when applied directly to roots. They improve soil structure, enhance moisture retention, suppress certain plant diseases, and boost germination rates. One application keeps working for months."
      ),
      h2Block("How to Use"),
      block(
        "Mix into potting soil at 20–30% by volume · Top-dress garden beds at 1/4 inch depth · Brew as worm casting tea for foliar spray · Add to seed starting mix · Apply to lawn at 10–20 lbs per 100 sq ft"
      ),
    ]),
    features: [
      "100% pure — no additives, fillers, or chemicals",
      "Won't burn plants — safe for direct root application",
      "Contains billions of beneficial soil microorganisms",
      "Improves soil structure and moisture retention",
      "Slow-release nutrients last up to 6 months",
      "pH neutral (6.8–7.2) — safe for all plants",
      "Certified organic feed inputs",
    ],
    careInstructions:
      "Store in a cool, dry location. Castings remain effective for 1+ year when stored properly. If castings dry out, lightly mist to reactivate the microbial community before use.",
    price: 22.99,
    compareAtPrice: null,
    inStock: true,
    stockQuantity: 1000,
    weightOptions: [
      { _key: "w1", label: "5 lb Bag", priceModifier: 0 },
      { _key: "w2", label: "10 lb Bag", priceModifier: 18 },
      { _key: "w3", label: "20 lb Bag — Best Value", priceModifier: 32 },
    ],
    seo: {
      metaTitle: "Premium Worm Castings — Pure Vermicompost | wormShop",
      metaDescription:
        "Buy pure worm castings — the ultimate organic soil amendment. 100% natural, no additives. Ships fast across the US and Canada.",
    },
  },

  {
    _id: "product-starter-kit",
    _type: "product",
    name: "Worm Composting Starter Kit",
    slug: { _type: "slug", current: "worm-composting-starter-kit" },
    category: "kits",
    badge: "Great Gift",
    shortDescription:
      "Everything you need to start composting in one box. Includes 1 lb of live Red Wigglers, a breathable worm bin, premium coconut coir bedding, and a full care guide.",
    description: advancedText([
      h2Block("Everything You Need to Start Composting Today"),
      block(
        "Our Worm Composting Starter Kit takes the guesswork out of vermicomposting. Whether you're a total beginner or upgrading your setup, this kit has everything you need to get a thriving worm bin running from day one."
      ),
      h2Block("What's In the Box"),
      block("✅  1 lb of live, healthy Red Wigglers (≈1,000 worms)"),
      block("✅  Breathable fabric worm bin with drainage tray (12\" × 16\" × 10\")"),
      block("✅  1 lb brick of premium coconut coir bedding (expands to 6 liters)"),
      block("✅  pH strips for monitoring bin health"),
      block("✅  Full-color care guide with setup instructions & troubleshooting"),
      block("✅  'What to Feed Your Worms' reference card"),
      h2Block("Perfect For"),
      block(
        "First-time composters · Apartment dwellers · Parents teaching kids about sustainability · Anyone looking to reduce food waste · Gardeners who want premium soil amendment"
      ),
    ]),
    features: [
      "Complete kit — nothing else needed to get started",
      "Includes 1 lb live Red Wigglers (~1,000 worms)",
      "Breathable fabric bin — prevents mold and odors",
      "Premium coconut coir bedding included",
      "Full-color care guide for beginners",
      "Perfect gift for gardeners and eco-conscious households",
      "Live worms backed by our delivery guarantee",
    ],
    careInstructions:
      "Follow the included full-color care guide for step-by-step setup. Keep bin in a shaded area between 55–77°F. Add food scraps (no meat or dairy) every 2–3 days. Harvest castings every 60–90 days.",
    price: 64.99,
    compareAtPrice: 79.99,
    inStock: true,
    stockQuantity: 75,
    weightOptions: [],
    seo: {
      metaTitle: "Worm Composting Starter Kit — Everything Included | wormShop",
      metaDescription:
        "Start composting today with our all-in-one Worm Bin Starter Kit. Includes live Red Wigglers, bin, bedding, and full care guide.",
    },
  },
];

// ─── Shop Page ─────────────────────────────────────────────────────────────

const shopPage = {
  _id: "page-shop",
  _type: "page",
  title: "Shop",
  slug: { _type: "slug", current: "shop" },
  publishedDate: new Date().toISOString(),
  seo: {
    metaTitle: "Shop Compostable Worms | wormShop",
    metaDescription:
      "Buy live composting worms, worm castings, and starter kits. Red Wigglers, Nightcrawlers, and more — shipped fresh with a live delivery guarantee.",
  },
  pageBuilder: [],
};

// ─── Main ───────────────────────────────────────────────────────────────────

async function main() {
  console.log("🪱 Seeding Sanity content for wormShop...\n");

  // 1. Create / replace products
  console.log("📦 Creating products...");
  for (const product of products) {
    const { compareAtPrice, ...rest } = product as any;
    const doc = compareAtPrice ? product : { ...rest };
    await client.createOrReplace(doc as any);
    console.log(`  ✅  ${product.name}`);
  }

  // 2. Create shop page (only if it doesn't exist)
  console.log("\n📄 Creating shop page...");
  const existingShopPage = await client.fetch('*[_type == "page" && slug.current == "shop"][0]._id');
  if (!existingShopPage) {
    await client.createOrReplace(shopPage as any);
    console.log("  ✅  Shop page created (slug: 'shop')");
  } else {
    console.log("  ℹ️   Shop page already exists — skipping");
  }

  // 3. Update main menu — add Shop link if missing
  console.log("\n🧭 Updating main menu...");
  const menu = await client.fetch('*[_type == "mainMenu"][0]');
  if (menu) {
    const hasShop = menu.menuItems?.some(
      (item: any) => item.link?.internal?.slug?.current === "shop" || item.title === "Shop"
    );
    if (!hasShop) {
      await client
        .patch(menu._id)
        .setIfMissing({ menuItems: [] })
        .append("menuItems", [
          {
            _key: "menu-shop",
            _type: "menuItem",
            title: "Shop",
            link: {
              _type: "link",
              linkType: "internal",
              internal: {
                _type: "reference",
                _ref: "page-shop",
              },
            },
          },
        ])
        .commit();
      console.log("  ✅  Added 'Shop' to main menu");
    } else {
      console.log("  ℹ️   Shop already in main menu — skipping");
    }
  } else {
    console.log("  ⚠️   No main menu found — create one in Sanity Studio");
  }

  // 4. Check site settings
  console.log("\n⚙️  Checking site settings...");
  const settings = await client.fetch('*[_type == "siteSettings"][0]');
  if (!settings) {
    await client.createOrReplace({
      _id: "siteSettings",
      _type: "siteSettings",
      siteName: "wormShop",
      siteUrl: "http://localhost:3000",
      defaultSeo: {
        metaTitle: "wormShop — Premium Compostable Worms",
        metaDescription:
          "Buy live composting worms, worm castings, and starter kits. Shipped fresh with a live delivery guarantee across the US and Canada.",
      },
    });
    console.log("  ✅  Site settings created");
  } else {
    console.log("  ℹ️   Site settings exist — skipping");
  }

  console.log("\n🎉 Done! All content has been seeded to Sanity.");
  console.log("\nNext steps:");
  console.log("  1. Open Sanity Studio to verify content looks right");
  console.log("  2. Add product images via Studio (Shop → Products → each product → Images)");
  console.log("  3. Add STRIPE_SECRET_KEY to .env.local");
  console.log("  4. Visit http://localhost:3000/shop to see the shop");
}

main().catch((err) => {
  console.error("❌ Seed failed:", err.message);
  process.exit(1);
});
