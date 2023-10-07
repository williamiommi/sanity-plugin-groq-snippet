import {ToastContextValue} from '@sanity/ui'
import {SanityClient} from 'sanity'
import {StateCreator} from 'zustand'
import {toastError} from '../../lib/toastUtils'
import {QUERY_INITIAL_DATA, QueryInitialDataResponse} from '../../queries'
import {SnippetSlice} from './SnippetSlice'
import {TagSlice} from './TagSlice'

export interface UtilsSlice {
  fetchData: (client: SanityClient, toast: ToastContextValue) => void
}

export const createUtilsSlice: StateCreator<
  UtilsSlice & TagSlice & SnippetSlice,
  [],
  [],
  UtilsSlice
> = (set, get) => ({
  fetchData: async (client: SanityClient, toast: ToastContextValue) => {
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
