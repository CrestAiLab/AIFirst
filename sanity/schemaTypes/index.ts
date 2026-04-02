import { SchemaTypeDefinition } from 'sanity'
import { pageContent } from './pageContent'
import { pageSection } from './pageSection'
import { insight } from './insight'
import { communityPost } from './communityPost'
import { source } from './source'

export const schemaTypes: SchemaTypeDefinition[] = [
  pageContent,
  pageSection,
  insight,
  communityPost,
  source,
]
