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
    _id: "product-red-wigglers",
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
      { _key: "w2", label: "1 lb — Standard (~1,000 worms)", priceModifier: 0 },
      { _key: "w3", label: "2 lb — Family Size (~2,000 worms)", priceModifier: 19 },
      { _key: "w4", label: "5 lb — Bulk / Garden (~5,000 worms)", priceModifier: 60 },
    ],
    seo: {
      metaTitle: "Buy Red Wigglers Live Composting Worms | GotWormz",
      metaDescription:
        "Order live Red Wigglers (Eisenia fetida) for home composting. Live delivery guaranteed. Fast shipping across the US and Canada.",
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
    metaTitle: "Shop Compostable Worms | GotWormz",
    metaDescription:
      "Buy live composting worms, worm castings, and starter kits. Red Wigglers, Nightcrawlers, and more — shipped fresh with a live delivery guarantee.",
  },
  pageBuilder: [],
};

// ─── Main ───────────────────────────────────────────────────────────────────

async function main() {
  console.log("🪱 Seeding Sanity content for GotWormz...\n");

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
      siteName: "GotWormz",
      siteUrl: "http://localhost:3000",
      defaultSeo: {
        metaTitle: "GotWormz — Premium Compostable Worms",
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
