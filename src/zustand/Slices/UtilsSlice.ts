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
    const client = get().client!
    const toast = get().toast!
    try {
      const response = await client.fetch<QueryInitialDataResponse>(
        QUERY_INITIAL_DATA,
        {},
        {perspective: 'published'},
      )
      get().setSnippets(response.snippets)
      get().setSnippetsCount(response.snippetsCount)
      get().setTags(response.tags)
      get().setTagsCount(response.tagsCount)
    } catch (err: any) {
      toastError({toast, err})
    }
  },
})
