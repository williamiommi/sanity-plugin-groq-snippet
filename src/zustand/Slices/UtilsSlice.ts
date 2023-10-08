import {StateCreator} from 'zustand'
import {toastError} from '../../lib/toastUtils'
import {QUERY_INITIAL_DATA, QueryInitialDataResponse} from '../../queries'
import {SanitySlice} from './SanitySlice'
import {SnippetSlice} from './SnippetSlice'
import {TagSlice} from './TagSlice'

export interface UtilsSlice {
  fetchData: () => void
}

export const createUtilsSlice: StateCreator<
  SanitySlice & UtilsSlice & TagSlice & SnippetSlice,
  [],
  [],
  UtilsSlice
> = (set, get) => ({
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
