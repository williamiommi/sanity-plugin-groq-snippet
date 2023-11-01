import {SanityDocumentLike} from 'sanity'
import {GroqSnippetTagReference} from './GroqSnippetTag'

export const GROQ_SNIPPET_TYPE = 'groq.snippet'

export interface GroqSnippet extends SanityDocumentLike {
  _type: typeof GROQ_SNIPPET_TYPE
  title: string
  description?: string
  query: string
  queryParams?: string
  tags?: GroqSnippetTagReference[]
  checked?: boolean // used only in form for checkbox selection
}

export type GroqSnippetMutation = Pick<
  GroqSnippet,
  '_type' | 'title' | 'description' | 'query' | 'tags' | 'queryParams'
>

export type GroqSnippetExport = Pick<
  GroqSnippet,
  '_id' | '_type' | 'title' | 'description' | 'query' | 'queryParams'
> & {tags: string[]}

export default GroqSnippet
