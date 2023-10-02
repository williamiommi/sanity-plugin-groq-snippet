import {ToastContextValue} from '@sanity/ui'
import {SanityClient} from 'sanity'
import {create} from 'zustand'
import {toastError} from '../lib/toastUtils'
import {QUERY_INITIAL_DATA, QueryInitialDataResponse} from '../queries'
import GroqSnippet from '../types/GroqSnippet'
import GroqSnippetTag from '../types/GroqSnippetTag'

interface GroqSnippetState {
  snippets: GroqSnippet[]
  snippetsCount: number
  tags: GroqSnippetTag[]
  tagsCount: number
  setSnippets: (snippets: GroqSnippet[]) => void
  setSnippetsCount: (snippetsCount: number) => void
  setTags: (tags: GroqSnippetTag[]) => void
  setTagsCount: (tagsCount: number) => void
  fetchData: (client: SanityClient, toast: ToastContextValue) => void
}

export const useGroqSnippetStore = create<GroqSnippetState>((set, get) => ({
  snippets: [],
  snippetsCount: 0,
  tags: [],
  tagsCount: 0,
  setSnippets: (snippets: GroqSnippet[]) => set({snippets}),
  setSnippetsCount: (snippetsCount: number) => set({snippetsCount}),
  setTags: (tags: GroqSnippetTag[]) => set({tags}),
  setTagsCount: (tagsCount: number) => set({tagsCount}),
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
}))
