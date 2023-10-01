import {SanityDocumentLike} from 'sanity'
import GroqSnippetTag from './GroqSnippetTag'

export const GROQ_SNIPPET_TYPE = 'groq.snippet'

export default interface GroqSnippet extends SanityDocumentLike {
  _type: typeof GROQ_SNIPPET_TYPE
  title: string
  description?: string
  snippet: string
  tags?: GroqSnippetTag[]
}
