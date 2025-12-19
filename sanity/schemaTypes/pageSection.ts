import { defineField, defineType } from 'sanity'

export const pageSection = defineType({
  name: 'pageSection',
  title: 'Page Section',
  type: 'object',
  fields: [
    defineField({
      name: 'sectionType',
      title: 'Section Type',
      type: 'string',
      options: {
        list: [
          { title: 'Hero', value: 'hero' },
          { title: 'Stats', value: 'stats' },
          { title: 'Solutions', value: 'solutions' },
          { title: 'Community', value: 'community' },
          { title: 'Insights', value: 'insights' },
          { title: 'Call to Action', value: 'cta' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'enabled',
      title: 'Enabled',
      type: 'boolean',
      description: 'Show this section on the page',
      initialValue: true,
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
      hidden: ({ parent }) => parent?.sectionType !== 'hero',
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
      hidden: ({ parent }) => parent?.sectionType !== 'stats',
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
      hidden: ({ parent }) => parent?.sectionType !== 'solutions',
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
      hidden: ({ parent }) => parent?.sectionType !== 'community',
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
      hidden: ({ parent }) => parent?.sectionType !== 'insights',
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
      hidden: ({ parent }) => parent?.sectionType !== 'cta',
    }),
  ],
  preview: {
    select: {
      sectionType: 'sectionType',
      enabled: 'enabled',
      heading: 'hero.heading',
      statsCount: 'stats.length',
      solutionsCount: 'solutions.length',
      communityHeading: 'community.heading',
      insightsHeading: 'insights.heading',
      ctaHeading: 'cta.heading',
    },
    prepare({ sectionType, enabled, heading, statsCount, solutionsCount, communityHeading, insightsHeading, ctaHeading }) {
      const titles = {
        hero: heading || 'Hero Section',
        stats: `Stats (${statsCount || 0} items)`,
        solutions: `Solutions (${solutionsCount || 0} items)`,
        community: communityHeading || 'Community Section',
        insights: insightsHeading || 'Insights Section',
        cta: ctaHeading || 'CTA Section',
      }
      return {
        title: titles[sectionType as keyof typeof titles] || sectionType,
        subtitle: enabled ? 'Enabled' : 'Disabled',
      }
    },
  },
})

