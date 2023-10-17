import {SanityDocumentLike} from 'sanity'
import {GroqSnippetTagReference} from './GroqSnippetTag'

export const GROQ_SNIPPET_TYPE = 'groq.snippet'

export interface GroqSnippet extends SanityDocumentLike {
  _type: typeof GROQ_SNIPPET_TYPE
  title: string
  description?: string
  query: string
  variables?: string
  tags?: GroqSnippetTagReference[]
  checked?: boolean // used only in form for checkbox selection
}

export type GroqSnippetMutation = Pick<
  GroqSnippet,
  '_type' | 'title' | 'description' | 'query' | 'tags' | 'variables'
>

export type GroqSnippetExport = Omit<GroqSnippet, 'tags'> & {
  tags: string[]
}

export default GroqSnippet
