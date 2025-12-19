import { SchemaTypeDefinition } from 'sanity'
import { pageContent } from './pageContent'
import { pageSection } from './pageSection'
import { insight } from './insight'
import { communityPost } from './communityPost'

export const schemaTypes: SchemaTypeDefinition[] = [
  pageContent,
  pageSection,
  insight,
  communityPost,
]
