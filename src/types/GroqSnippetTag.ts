import {SanityDocumentLike, Slug} from 'sanity'

export const GROQ_SNIPPET_TAG_TYPE = 'groq.snippet.tag'

interface GroqSnippetTag extends SanityDocumentLike {
  _type: typeof GROQ_SNIPPET_TAG_TYPE
  name: Slug
}

export type GroqSnippetTagMutation = Pick<GroqSnippetTag, '_type' | 'name'>

export default GroqSnippetTag
