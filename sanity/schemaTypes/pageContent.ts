import { defineField, defineType } from 'sanity'
import { pageSection } from './pageSection'

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
      name: 'sections',
      title: 'Page Sections',
      type: 'array',
      of: [{ type: 'pageSection' }],
      description: 'Add, remove, and reorder sections for your page',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      sectionsCount: 'sections.length',
    },
    prepare({ title, sectionsCount }) {
      return {
        title: title || 'Home Page',
        subtitle: `${sectionsCount || 0} section(s)`,
      }
    },
  },
})
