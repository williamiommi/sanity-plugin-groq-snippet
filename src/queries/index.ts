import {GROQ_SNIPPET_TYPE} from '../types/GroqSnippet'
import {GROQ_SNIPPET_TAG_TYPE} from '../types/GroqSnippetTag'

export const ALL_SNIPPETS = `*[_type=='${GROQ_SNIPPET_TYPE}']`
export const ALL_TAGS = `*[_type=='${GROQ_SNIPPET_TAG_TYPE}']`

export const ALL_DATA = `{
  "snippets": ${ALL_SNIPPETS},
  "tags": ${ALL_TAGS}
}`
