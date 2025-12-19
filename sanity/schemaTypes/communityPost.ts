import { defineField, defineType } from 'sanity'

export const communityPost = defineType({
  name: 'communityPost',
  title: 'Community Post',
  type: 'document',
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
      name: 'author',
      title: 'Author',
      type: 'object',
      fields: [
        defineField({
          name: 'name',
          title: 'Name',
          type: 'string',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'avatar',
          title: 'Avatar',
          type: 'image',
          options: {
            hotspot: true,
          },
        }),
      ],
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'replies',
      title: 'Number of Replies',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show this post in the featured discussions section',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      createdAt: 'createdAt',
      replies: 'replies',
    },
    prepare({ title, author, createdAt, replies }) {
      return {
        title,
        subtitle: `by ${author} • ${replies} replies • ${createdAt ? new Date(createdAt).toLocaleDateString() : 'Draft'}`,
      }
    },
  },
  orderings: [
    {
      title: 'Created Date, Newest',
      name: 'createdAtDesc',
      by: [{ field: 'createdAt', direction: 'desc' }],
    },
    {
      title: 'Created Date, Oldest',
      name: 'createdAtAsc',
      by: [{ field: 'createdAt', direction: 'asc' }],
    },
    {
      title: 'Most Replies',
      name: 'repliesDesc',
      by: [{ field: 'replies', direction: 'desc' }],
    },
  ],
})
