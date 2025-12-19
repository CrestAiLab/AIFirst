import { defineField, defineType } from 'sanity'

export const pageContent = defineType({
  name: 'pageContent',
  title: 'Page Content',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Home Page',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        defineField({
          name: 'badge',
          title: 'Badge Text',
          type: 'string',
          initialValue: "Empowering tomorrow's infrastructure today",
        }),
        defineField({
          name: 'heading',
          title: 'Heading',
          type: 'string',
          initialValue: 'Build the future with AI-powered infrastructure',
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 3,
        }),
        defineField({
          name: 'primaryButton',
          title: 'Primary Button Text',
          type: 'string',
          initialValue: 'Start Building',
        }),
        defineField({
          name: 'secondaryButton',
          title: 'Secondary Button Text',
          type: 'string',
          initialValue: 'Watch Demo',
        }),
      ],
    }),
    defineField({
      name: 'stats',
      title: 'Statistics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'value',
              title: 'Value',
              type: 'string',
            }),
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'string',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'solutions',
      title: 'Solutions',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon Name',
              type: 'string',
              description: 'Icon name from lucide-react (e.g., Brain, Cloud, Database, Zap)',
            }),
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'community',
      title: 'Community Section',
      type: 'object',
      fields: [
        defineField({
          name: 'heading',
          title: 'Heading',
          type: 'string',
          initialValue: 'Join a thriving community of innovators',
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
        }),
        defineField({
          name: 'buttonText',
          title: 'Button Text',
          type: 'string',
          initialValue: 'Join Community',
        }),
        defineField({
          name: 'features',
          title: 'Features',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                defineField({
                  name: 'icon',
                  title: 'Icon Name',
                  type: 'string',
                }),
                defineField({
                  name: 'title',
                  title: 'Title',
                  type: 'string',
                }),
                defineField({
                  name: 'description',
                  title: 'Description',
                  type: 'string',
                }),
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'insights',
      title: 'Insights Section',
      type: 'object',
      fields: [
        defineField({
          name: 'heading',
          title: 'Heading',
          type: 'string',
          initialValue: 'Latest insights',
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'string',
          initialValue: 'Stay ahead with industry trends and expert perspectives',
        }),
        defineField({
          name: 'buttonText',
          title: 'Button Text',
          type: 'string',
          initialValue: 'View All',
        }),
      ],
    }),
    defineField({
      name: 'cta',
      title: 'Call to Action Section',
      type: 'object',
      fields: [
        defineField({
          name: 'heading',
          title: 'Heading',
          type: 'string',
          initialValue: 'Ready to transform your infrastructure?',
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
        }),
        defineField({
          name: 'buttonText',
          title: 'Button Text',
          type: 'string',
          initialValue: 'Get Started',
        }),
        defineField({
          name: 'disclaimer',
          title: 'Disclaimer Text',
          type: 'string',
          initialValue: 'No credit card required • Free 14-day trial',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})
