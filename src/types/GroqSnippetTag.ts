import {SanityDocumentLike, Slug} from 'sanity'

export const GROQ_SNIPPET_TAG_TYPE = 'groq.snippet.tag'

export interface GroqSnippetTagMutation {
  _type: typeof GROQ_SNIPPET_TAG_TYPE
  name: Slug
}

interface GroqSnippetTag extends GroqSnippetTagMutation, Omit<SanityDocumentLike, '_type'> {}

export default GroqSnippetTag
