import {SortOption} from '../components/Sorting'
import GroqSnippet, {GROQ_SNIPPET_TYPE} from '../types/GroqSnippet'
import GroqSnippetTag, {GROQ_SNIPPET_TAG_TYPE} from '../types/GroqSnippetTag'

const SNIPPET_PROJECTION = `_id, title, description, tags[]->{'_ref': _id, 'name': name.current}`
const SNIPPET_EXPORT_PROJECTION = `_id, title, description, 'tags': tags[]->name.current, query, queryParams`

export const SNIPPETS = `*[_type == "${GROQ_SNIPPET_TYPE}"] | order(lower(title) asc) {${SNIPPET_PROJECTION}}`
export const SNIPPETS_COUNT = `count(*[_type == "${GROQ_SNIPPET_TYPE}"])`
export const QUERY_SNIPPET_DELETE = `*[_type == "${GROQ_SNIPPET_TYPE}" && _id in $ids]`

const MATCH_TITLE_DESCRIPTION = `[title, description] match '*'+$term+'*'`
const MATCH_TAGS = `tags[]->name.current match '*'+$term+'*'`
const COUNT_TAGS = `&& count((tags[]->name.current)[@ in $tags]) > 0`
export const QUERY_SNIPPETS_SEARCH = (hasFilterTags: boolean, sortOption: SortOption): string =>
  `*[_type == "${GROQ_SNIPPET_TYPE}" && (${MATCH_TITLE_DESCRIPTION} || ${MATCH_TAGS}) ${
    hasFilterTags ? COUNT_TAGS : ''
  }] | ${sortOption.value} {${SNIPPET_PROJECTION}}`
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
