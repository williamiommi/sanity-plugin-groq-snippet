import {SanityDocumentLike} from 'sanity'
import {GroqSnippetTagReference} from './GroqSnippetTag'

export const GROQ_SNIPPET_TYPE = 'groq.snippet'

export interface GroqSnippet extends SanityDocumentLike {
  _type: typeof GROQ_SNIPPET_TYPE
  title: string
  description?: string
  snippet: string
  tags?: GroqSnippetTagReference[]
}

export type GroqSnippetMutation = Pick<
  GroqSnippet,
  '_type' | 'title' | 'description' | 'snippet' | 'tags'
>

export default GroqSnippet
