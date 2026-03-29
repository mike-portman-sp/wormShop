import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'productList',
  title: 'Product List',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      description: 'e.g. "Our Worms", "Best Sellers", "Featured Products"',
    }),
    defineField({
      name: 'showAllProducts',
      title: 'Show All Products',
      type: 'boolean',
      initialValue: true,
      description: 'When enabled, all in-stock products are displayed automatically.',
    }),
    defineField({
      name: 'featuredProducts',
      title: 'Featured Products',
      type: 'array',
      description: 'Manually select specific products to display (overrides Show All when populated).',
      of: [{type: 'reference', to: [{type: 'product'}]}],
      hidden: ({parent}) => parent?.showAllProducts === true,
    }),
    defineField({
      name: 'filterCategory',
      title: 'Filter by Category',
      type: 'string',
      description: 'Only show products from a specific category. Leave blank to show all.',
      options: {
        list: [
          {title: 'All', value: ''},
          {title: 'Red Wigglers', value: 'red-wigglers'},
          {title: 'Worm Castings', value: 'castings'},
          {title: 'Composting Kits', value: 'kits'},
          {title: 'Accessories', value: 'accessories'},
        ],
      },
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      options: {
        list: [
          {title: 'None (transparent)', value: ''},
          {title: 'Muted dark', value: 'bg-muted'},
          {title: 'Card', value: 'bg-card'},
        ],
        layout: 'radio',
      },
    }),
  ],
  preview: {
    select: {title: 'title'},
    prepare({title}: {title?: string}) {
      return {title: title || 'Product List'}
    },
  },
})
