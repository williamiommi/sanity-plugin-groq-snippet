import GroqSnippet, {GROQ_SNIPPET_TYPE} from '../types/GroqSnippet'
import GroqSnippetTag, {GROQ_SNIPPET_TAG_TYPE} from '../types/GroqSnippetTag'

export const SNIPPETS = `*[_type == "${GROQ_SNIPPET_TYPE}"][0..100]`
export const SNIPPETS_COUNT = `count(*[_type == "${GROQ_SNIPPET_TYPE}"])`
export const TAGS = `*[_type=='${GROQ_SNIPPET_TAG_TYPE}']`
export const TAGS_COUNT = `count(*[_type == "${GROQ_SNIPPET_TAG_TYPE}"])`
export const TAG_EXISTS = `count(*[_type == "${GROQ_SNIPPET_TAG_TYPE}" && name.current == $name]) > 0`
export const QUERY_TAG_HAS_REFERENCES = `count(*[_type == "${GROQ_SNIPPET_TYPE}" && $id in tags[]._ref])`

export interface QueryInitialDataResponse {
  snippets: GroqSnippet[]
  snippetsCount: number
  tags: GroqSnippetTag[]
  tagsCount: number
}

export const QUERY_INITIAL_DATA = `{
  "snippets": ${SNIPPETS},
  "snippetsCount": ${SNIPPETS_COUNT},
  "tags": ${TAGS},
  "tagsCount": ${TAGS_COUNT}
}`
