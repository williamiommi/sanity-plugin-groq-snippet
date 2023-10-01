import {ToastContextValue} from '@sanity/ui'
import {SanityClient} from 'sanity'
import {create} from 'zustand'
import {toastError} from '../lib/toastUtils'
import {ALL_DATA} from '../queries'
import GroqSnippet from '../types/GroqSnippet'
import GroqSnippetTag from '../types/GroqSnippetTag'

interface GroqSnippetState {
  snippets: GroqSnippet[]
  tags: GroqSnippetTag[]
  setSnippets: (snippets: GroqSnippet[]) => void
  setTags: (tags: GroqSnippetTag[]) => void
  fetchData: (client: SanityClient, toast: ToastContextValue) => void
}

export const useGroqSnippetStore = create<GroqSnippetState>((set, get) => ({
  snippets: [],
  tags: [],
  setSnippets: (snippets: GroqSnippet[]) => set({snippets}),
  setTags: (tags: GroqSnippetTag[]) => set({tags}),
  fetchData: async (client: SanityClient, toast: ToastContextValue) => {
    try {
      type Response = {snippets: GroqSnippet[]; tags: GroqSnippetTag[]}
      const response = await client.fetch<Response>(ALL_DATA, {}, {perspective: 'published'})
      get().setSnippets(response.snippets)
      get().setTags(response.tags)
    } catch (err: any) {
      toastError({toast, err})
    }
  },
}))
