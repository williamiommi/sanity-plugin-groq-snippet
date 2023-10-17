import GroqSnippet, {GROQ_SNIPPET_TYPE} from '../types/GroqSnippet'
import GroqSnippetTag, {GROQ_SNIPPET_TAG_TYPE} from '../types/GroqSnippetTag'

const SNIPPET_PROJECTION = `_id, title, description, tags[]->{'_ref': _id, 'name': name.current}`
const SNIPPET_EXPORT_PROJECTION = `_id, title, description, 'tags': tags[]->name.current, query, variables`

export const SNIPPETS = `*[_type == "${GROQ_SNIPPET_TYPE}"] | order(lower(title) asc) {${SNIPPET_PROJECTION}}`
export const SNIPPETS_COUNT = `count(*[_type == "${GROQ_SNIPPET_TYPE}"])`
export const QUERY_SNIPPET_DELETE = `*[_type == "${GROQ_SNIPPET_TYPE}" && _id in $ids]`
export const QUERY_SNIPPETS_SEARCH = `*[_type == "${GROQ_SNIPPET_TYPE}" && [title, description] match '*'+$term+'*'] | order(lower(title) asc) {${SNIPPET_PROJECTION}}`
export const QUERY_GET_SNIPPET = `*[_type == "${GROQ_SNIPPET_TYPE}" && _id == $id][0] {...}`
export const QUERY_EXPORT_SNIPPETS = `*[_type == "${GROQ_SNIPPET_TYPE}" && _id in $ids] | order(lower(title) asc) {${SNIPPET_EXPORT_PROJECTION}}`

export const QUERY_TAGS = `*[_type=='${GROQ_SNIPPET_TAG_TYPE}'] | order(lower(name.current) asc)`
export const TAGS_COUNT = `count(*[_type == "${GROQ_SNIPPET_TAG_TYPE}"])`
export const TAG_EXISTS = `count(*[_type == "${GROQ_SNIPPET_TAG_TYPE}" && name.current == $name]) > 0`
export const QUERY_TAG_HAS_REFERENCES = `count(*[_type == "${GROQ_SNIPPET_TYPE}" && references($ids)])`
export const QUERY_TAG_DELETE = `*[_type == "${GROQ_SNIPPET_TAG_TYPE}" && _id in $ids]`

export interface QueryInitialDataResponse {
  snippets: GroqSnippet[]
  snippetsCount: number
  tags: GroqSnippetTag[]
  tagsCount: number
}

export const QUERY_INITIAL_DATA = `{
  "snippets": ${SNIPPETS},
  "snippetsCount": ${SNIPPETS_COUNT},
  "tags": ${QUERY_TAGS},
  "tagsCount": ${TAGS_COUNT}
}`
