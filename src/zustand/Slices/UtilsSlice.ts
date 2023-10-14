import {StateCreator} from 'zustand'
import {toastError} from '../../lib/toastUtils'
import {
  QUERY_GET_SNIPPET,
  QUERY_INITIAL_DATA,
  QUERY_SNIPPETS_SEARCH,
  QueryInitialDataResponse,
} from '../../queries'
import GroqSnippet from '../../types/GroqSnippet'
import {SanitySlice} from './SanitySlice'
import {SnippetSlice} from './SnippetSlice'
import {TagSlice} from './TagSlice'

export interface UtilsSlice {
  getSnippet: (id: string) => Promise<GroqSnippet | undefined>
  searchSnippets: (term: string) => void
  fetchData: () => void
}

export const createUtilsSlice: StateCreator<
  SanitySlice & UtilsSlice & TagSlice & SnippetSlice,
  [],
  [],
  UtilsSlice
> = (set, get) => ({
  getSnippet: async (id: string) => {
    const {client, toast} = get()
    try {
      const response = await client!.fetch<GroqSnippet>(
        QUERY_GET_SNIPPET,
        {id},
        {perspective: 'published'},
      )
      return response
    } catch (err: any) {
      toastError(toast!, {err})
      return undefined
    }
  },
  searchSnippets: async (term: string) => {
    const {client, toast, setSnippets} = get()
    try {
      const response = await client!.fetch(
        QUERY_SNIPPETS_SEARCH,
        {term},
        {perspective: 'published'},
      )
      setSnippets(response)
    } catch (err: any) {
      toastError(toast!, {err})
    }
  },
  fetchData: async () => {
    const {client, toast, setSnippets, setSnippetsCount, setTags, setTagsCount} = get()
    try {
      const response = await client!.fetch<QueryInitialDataResponse>(
        QUERY_INITIAL_DATA,
        {},
        {perspective: 'published'},
      )
      setSnippets(response.snippets)
      setSnippetsCount(response.snippetsCount)
      setTags(response.tags)
      setTagsCount(response.tagsCount)
    } catch (err: any) {
      toastError(toast!, {err})
    }
  },
})
