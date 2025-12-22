import { defineField, defineType } from 'sanity'
import { pageSection } from './pageSection'

export const pageContent = defineType({
  name: 'pageContent',
  title: 'Homepage Content',
  type: 'document',
  description: 'Edit all sections of your homepage. Add, remove, reorder, and configure each section.',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Home Page',
      description: 'Internal title for this page (not displayed on the website)',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'sections',
      title: 'Homepage Sections',
      type: 'array',
      of: [{ type: 'pageSection' }],
      description: 'Build your homepage by adding sections below. You can drag to reorder, and enable/disable each section.',
      validation: (rule) => rule.min(1).error('At least one section is required'),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      sections: 'sections',
    },
    prepare({ title, sections }) {
      const sectionsCount = Array.isArray(sections) ? sections.length : 0
      return {
        title: title || 'Home Page',
        subtitle: `${sectionsCount} section(s)`,
      }
    },
  },
})
