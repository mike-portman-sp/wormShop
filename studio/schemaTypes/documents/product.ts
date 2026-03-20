import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  groups: [
    {name: 'basic', title: 'Basic Info', default: true},
    {name: 'pricing', title: 'Pricing & Stock'},
    {name: 'media', title: 'Images'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Product Name',
      type: 'string',
      group: 'basic',
      description: 'e.g. "Red Wigglers — Composting Worms", "European Nightcrawlers"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'basic',
      options: {source: 'name', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      group: 'basic',
      options: {
        list: [
          {title: 'Red Wigglers (Eisenia fetida)', value: 'red-wigglers'},
          {title: 'European Nightcrawlers (Eisenia hortensis)', value: 'european-nightcrawlers'},
          {title: 'African Nightcrawlers (Eudrilus eugeniae)', value: 'african-nightcrawlers'},
          {title: 'Canadian Nightcrawlers (Lumbricus terrestris)', value: 'canadian-nightcrawlers'},
          {title: 'Worm Castings / Vermicompost', value: 'castings'},
          {title: 'Composting Kits & Bins', value: 'kits'},
          {title: 'Bedding & Accessories', value: 'accessories'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'badge',
      title: 'Badge Label',
      type: 'string',
      group: 'basic',
      description: 'Optional badge shown on product card (e.g. "Best Seller", "New", "Organic Certified")',
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      group: 'basic',
      description: 'Shown on product cards and in search results. Keep under 160 characters.',
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: 'description',
      title: 'Full Description',
      type: 'advancedText',
      group: 'basic',
      description: 'Detailed product description shown on the product detail page.',
    }),
    defineField({
      name: 'features',
      title: 'Key Features / Benefits',
      type: 'array',
      group: 'basic',
      description: 'Bullet-point features shown on the product page (e.g. "Ships live, guaranteed", "Perfect for vermicomposting")',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'careInstructions',
      title: 'Care Instructions',
      type: 'text',
      rows: 4,
      group: 'basic',
      description: 'How to care for the worms after delivery.',
    }),

    // Pricing & Stock
    defineField({
      name: 'price',
      title: 'Base Price (USD)',
      type: 'number',
      group: 'pricing',
      description: 'Price in US Dollars (e.g. 29.99)',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'compareAtPrice',
      title: 'Compare At Price (USD)',
      type: 'number',
      group: 'pricing',
      description: 'Original price to show a strikethrough sale price. Leave blank if not on sale.',
    }),
    defineField({
      name: 'inStock',
      title: 'In Stock',
      type: 'boolean',
      group: 'pricing',
      initialValue: true,
    }),
    defineField({
      name: 'stockQuantity',
      title: 'Stock Quantity (lbs available)',
      type: 'number',
      group: 'pricing',
      description: 'Total pounds of worms available for sale.',
    }),
    defineField({
      name: 'weightOptions',
      title: 'Weight / Size Options',
      type: 'array',
      group: 'pricing',
      description: 'Different sizes available (e.g. 0.5 lb starter, 1 lb, 2 lb). Each option can add to the base price.',
      of: [
        {
          type: 'object',
          name: 'weightOption',
          fields: [
            {
              name: 'label',
              type: 'string',
              title: 'Label',
              description: 'e.g. "0.5 lb (Starter)", "1 lb", "2 lb", "5 lb (Bulk)"',
            },
            {
              name: 'priceModifier',
              type: 'number',
              title: 'Price Modifier ($)',
              description: 'Amount added to base price. Use 0 for the base option.',
              initialValue: 0,
            },
          ],
          preview: {
            select: {title: 'label', subtitle: 'priceModifier'},
            prepare({title, subtitle}: {title: string; subtitle: number}) {
              return {
                title,
                subtitle: subtitle > 0 ? `+$${subtitle}` : subtitle < 0 ? `-$${Math.abs(subtitle)}` : 'Base price',
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'sku',
      title: 'SKU',
      type: 'string',
      group: 'pricing',
      description: 'Internal product identifier (optional)',
    }),

    // Images
    defineField({
      name: 'images',
      title: 'Product Images',
      type: 'array',
      group: 'media',
      description: 'First image is the main product photo. Add multiple for a gallery.',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alt Text',
              description: 'Describe the image for accessibility (e.g. "Red wigglers in a container of bedding")',
            },
          ],
        },
      ],
    }),

    // SEO
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'images.0',
      price: 'price',
      inStock: 'inStock',
    },
    prepare({title, media, price, inStock}: {title: string; media: any; price: number; inStock: boolean}) {
      return {
        title,
        subtitle: `$${price ?? '—'} · ${inStock ? 'In Stock' : 'Out of Stock'}`,
        media,
      }
    },
  },
})
