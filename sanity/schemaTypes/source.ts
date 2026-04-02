import { defineField, defineType } from 'sanity'

export const source = defineType({
  name: 'source',
  title: 'Source',
  type: 'document',
  description: 'External papers, podcasts, articles, or links. Thumbnail is taken from the link when possible (Open Graph); upload a custom image to override.',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'kind',
      title: 'Kind',
      type: 'string',
      options: {
        list: [
          { title: 'Paper', value: 'paper' },
          { title: 'Podcast', value: 'podcast' },
          { title: 'Article', value: 'article' },
          { title: 'Link', value: 'link' },
        ],
        layout: 'radio',
      },
      initialValue: 'link',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      description: 'The page to open. The site’s Open Graph image is used as the thumbnail unless you add a custom image below.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'sourceInfo',
      title: 'Where it’s from',
      type: 'string',
      description:
        'Optional. One line on the card directly under the type and date—where this comes from (e.g. site, publication, podcast, venue).',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail (optional)',
      type: 'image',
      options: {
        hotspot: true,
      },
      description: 'Overrides the preview image from the link. Use when the link has no og:image or you want a custom crop.',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      kind: 'kind',
      sourceInfo: 'sourceInfo',
      media: 'thumbnail',
      publishedAt: 'publishedAt',
    },
    prepare({ title, kind, sourceInfo, media, publishedAt }) {
      const bits = [kind ?? 'link', sourceInfo, publishedAt ? new Date(publishedAt).toLocaleDateString() : null].filter(
        Boolean
      )
      return {
        title,
        subtitle: bits.join(' • '),
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Published Date, Newest',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
    {
      title: 'Published Date, Oldest',
      name: 'publishedAtAsc',
      by: [{ field: 'publishedAt', direction: 'asc' }],
    },
  ],
})
