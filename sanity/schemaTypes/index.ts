import { SchemaTypeDefinition } from 'sanity'
import { pageContent } from './pageContent'
import { insight } from './insight'
import { communityPost } from './communityPost'

export const schemaTypes: SchemaTypeDefinition[] = [
  pageContent,
  insight,
  communityPost,
]
