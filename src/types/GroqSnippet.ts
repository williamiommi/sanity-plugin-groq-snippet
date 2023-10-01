import GroqSnippetTag from './GroqSnippetTag'

export default interface GroqSnippet {
  title: string
  description?: string
  snippet: string
  tags?: GroqSnippetTag[]
}
