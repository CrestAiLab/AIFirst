import { defineField, defineType } from 'sanity'

export const pageSection = defineType({
  name: 'pageSection',
  title: 'Page Section',
  type: 'object',
  description: 'Configure a section for your homepage. Each section type has different options.',
  fields: [
    defineField({
      name: 'sectionType',
      title: 'Section Type',
      type: 'string',
      description: 'Choose the type of section to display. Each type has different content options below.',
      options: {
        list: [
          { title: 'Hero (Top Banner)', value: 'hero' },
          { title: 'Stats (Numbers/Metrics)', value: 'stats' },
          { title: 'Solutions (Feature Cards)', value: 'solutions' },
          { title: 'Community', value: 'community' },
          { title: 'Insights (Blog Posts)', value: 'insights' },
          { title: 'Call to Action (CTA)', value: 'cta' },
          { title: 'Content (2-Column with Image)', value: 'content' },
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
      name: 'showMore',
      title: 'Show More / Explore More',
      type: 'object',
      description: 'Add a "Show More" or "Explore More" button at the bottom of this section',
      fields: [
        defineField({
          name: 'enabled',
          title: 'Enable Show More Button',
          type: 'boolean',
          description: 'Show the "Show More" button at the bottom of this section',
          initialValue: false,
        }),
        defineField({
          name: 'text',
          title: 'Button Text',
          type: 'string',
          description: 'Text displayed on the button (e.g., "Show More", "Explore More", "Learn More")',
          initialValue: 'Explore More',
          hidden: ({ parent }) => !parent?.enabled,
        }),
        defineField({
          name: 'linkType',
          title: 'Link Type',
          type: 'string',
          options: {
            list: [
              { title: 'Internal Page (within website)', value: 'internal' },
              { title: 'External URL', value: 'external' },
            ],
          },
          initialValue: 'internal',
          hidden: ({ parent }) => !parent?.enabled,
        }),
        defineField({
          name: 'internalPage',
          title: 'Internal Page',
          type: 'string',
          description: 'Page route within the website (e.g., /insights, /community, /#section-id)',
          initialValue: '/insights',
          hidden: ({ parent }) => !parent?.enabled || parent?.linkType !== 'internal',
        }),
        defineField({
          name: 'externalUrl',
          title: 'External URL',
          type: 'url',
          description: 'Full URL to an external website (e.g., https://example.com)',
          hidden: ({ parent }) => !parent?.enabled || parent?.linkType !== 'external',
        }),
      ],
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
          name: 'primaryButtonUrl',
          title: 'Primary Button Link',
          type: 'string',
          description: 'URL or page section (e.g., /insights, /community, #section-id)',
          initialValue: '#',
        }),
        defineField({
          name: 'secondaryButton',
          title: 'Secondary Button Text',
          type: 'string',
          initialValue: 'Watch Demo',
        }),
        defineField({
          name: 'secondaryButtonUrl',
          title: 'Secondary Button Link',
          type: 'string',
          description: 'URL or page section (e.g., /insights, /community, #section-id)',
          initialValue: '#',
        }),
        defineField({
          name: 'showPrimaryButton',
          title: 'Show Primary Button',
          type: 'boolean',
          description: 'Toggle to show or hide the primary button',
          initialValue: true,
        }),
        defineField({
          name: 'showSecondaryButton',
          title: 'Show Secondary Button',
          type: 'boolean',
          description: 'Toggle to show or hide the secondary button',
          initialValue: true,
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
          name: 'buttonUrl',
          title: 'Button Link',
          type: 'string',
          description: 'URL or page section (e.g., /community, /insights, #section-id)',
          initialValue: '/community',
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
        defineField({
          name: 'buttonUrl',
          title: 'Button Link',
          type: 'string',
          description: 'URL or page section (e.g., /insights, /community, #section-id)',
          initialValue: '/insights',
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
          name: 'buttonUrl',
          title: 'Button Link',
          type: 'string',
          description: 'URL or page section (e.g., /community, /insights, #section-id)',
          initialValue: '#',
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
    defineField({
      name: 'content',
      title: 'Content Section (2-Column Layout)',
      type: 'object',
      description: 'Create a section with a heading at the top, followed by a 2-column layout with content and optional image.',
      fields: [
        defineField({
          name: 'title',
          title: 'Heading',
          type: 'string',
          description: 'Main heading displayed at the top center of the section',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'body',
          title: 'Body Text',
          type: 'text',
          rows: 6,
          description: 'Main content text displayed in the content column. This appears below the heading.',
        }),
        defineField({
          name: 'items',
          title: 'List Items (Optional)',
          type: 'array',
          of: [{ type: 'string' }],
          description: 'Optional list items displayed as styled cards with bullet points. Each item will appear in its own card.',
        }),
        defineField({
          name: 'layout',
          title: 'Image Position',
          type: 'string',
          options: {
            list: [
              { title: 'No Image (Text Only)', value: 'default' },
              { title: 'Image on Left, Content on Right', value: 'imageLeft' },
              { title: 'Content on Left, Image on Right', value: 'imageRight' },
            ],
          },
          initialValue: 'default',
          description: 'Layout options:\n• No Image: Single column text layout\n• Image Left: Image on left, content on right\n• Image Right: Content on left, image on right',
        }),
        defineField({
          name: 'image',
          title: 'Image',
          type: 'image',
          options: {
            hotspot: true,
            accept: 'image/*',
          },
          description: 'Upload a new image or select an existing one from your media library. This field only appears when Image Position is set to "Image on Left" or "Image on Right".',
          hidden: ({ parent }) => parent?.layout === 'default',
        }),
        defineField({
          name: 'imageAlt',
          title: 'Image Alt Text',
          type: 'string',
          description: 'Alternative text describing the image. Important for accessibility and SEO. Example: "Futuristic cityscape with glowing buildings"',
          hidden: ({ parent }) => parent?.layout === 'default',
        }),
      ],
      hidden: ({ parent }) => parent?.sectionType !== 'content',
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
      contentTitle: 'content.title',
    },
    prepare({ sectionType, enabled, heading, statsCount, solutionsCount, communityHeading, insightsHeading, ctaHeading, contentTitle }) {
      const titles = {
        hero: heading || 'Hero Section',
        stats: `Stats (${statsCount || 0} items)`,
        solutions: `Solutions (${solutionsCount || 0} items)`,
        community: communityHeading || 'Community Section',
        insights: insightsHeading || 'Insights Section',
        cta: ctaHeading || 'CTA Section',
        content: contentTitle || 'Content Section',
      }
      return {
        title: titles[sectionType as keyof typeof titles] || sectionType,
        subtitle: enabled ? 'Enabled' : 'Disabled',
      }
    },
  },
})

