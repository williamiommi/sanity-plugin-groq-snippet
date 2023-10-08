import {StateCreator} from 'zustand'
import {toastError, toastSuccess} from '../../lib/toastUtils'
import GroqSnippet, {GroqSnippetMutation} from '../../types/GroqSnippet'
import {SanitySlice} from './SanitySlice'

export interface SnippetSlice {
  snippets: GroqSnippet[]
  snippetsCount: number
  setSnippets: (snippets: GroqSnippet[]) => void
  setSnippetsCount: (snippetsCount: number) => void
  addSnippet: (mutation: GroqSnippetMutation) => void
  updateSnippet: (id: string, mutation: GroqSnippetMutation) => void
  deleteSnippet: (id: string) => void
}

export const createSnippetSlice: StateCreator<SnippetSlice & SanitySlice, [], [], SnippetSlice> = (
  set,
  get,
) => ({
  snippets: [],
  snippetsCount: 0,
  setSnippets: (snippets: GroqSnippet[]) => set({snippets}),
  setSnippetsCount: (snippetsCount: number) => set({snippetsCount}),
  addSnippet: async (mutation: GroqSnippetMutation) => {
    const {client, toast} = get()
    try {
      await client!.create<GroqSnippetMutation>(mutation)
      toastSuccess(toast!, {description: 'Snippet created'})
    } catch (err: any) {
      toastError(toast!, {err})
    }
  },
  updateSnippet: async (id: string, mutation: GroqSnippetMutation) => {
    const {client, toast} = get()
    try {
      await client!.patch(id).set(mutation).commit({autoGenerateArrayKeys: true})
      toastSuccess(toast!, {description: 'Snippet updated'})
    } catch (err: any) {
      toastError(toast!, {err})
    }
  },
  deleteSnippet: async (id: string) => {
    const {client, toast} = get()
    try {
      await client!.delete(id)
      toastSuccess(toast!, {description: 'Snippet deleted'})
    } catch (err: any) {
      toastError(toast!, {err})
    }
  },
})
