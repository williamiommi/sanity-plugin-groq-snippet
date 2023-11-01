import {StateCreator} from 'zustand'
import {QUERY_SNIPPET_DELETE} from '../../queries'
import GroqSnippet, {GroqSnippetMutation} from '../../types/GroqSnippet'
import {DialogSlice} from './DialogSlice'
import {SanitySlice} from './SanitySlice'
import {UtilsSlice} from './UtilsSlice'

export interface SnippetSlice {
  snippets?: GroqSnippet[]
  snippetsCount: number
  snippetToUpdate?: GroqSnippet
  setSnippets: (snippets?: GroqSnippet[]) => void
  setSnippetsCount: (snippetsCount: number) => void
  addSnippet: (mutation: GroqSnippetMutation) => void
  updateSnippet: (id: string, mutation: GroqSnippetMutation) => void
  deleteSnippets: () => void
  resetCheckedSnippets: () => void
}

export const createSnippetSlice: StateCreator<
  SnippetSlice & SanitySlice & UtilsSlice & DialogSlice,
  [],
  [],
  SnippetSlice
> = (set, get) => ({
  snippetsCount: 0,
  setSnippets: (snippets?: GroqSnippet[]) => set({snippets}),
  setSnippetsCount: (snippetsCount: number) => set({snippetsCount}),
  resetCheckedSnippets: () => set({snippets: get().snippets!.map((t) => ({...t, checked: false}))}),
  addSnippet: async (mutation: GroqSnippetMutation) => {
    const {client, toastSuccess, toastError} = get()
    try {
      await client!.create<GroqSnippetMutation>(mutation, {autoGenerateArrayKeys: true})
      toastSuccess({description: 'Snippet created'})
      get().closeInsertUpdateSnippetsDialog()
      get().searchSnippets(get().searchTerm, get().filterTags, get().sortOption)
    } catch (err: any) {
      toastError({err})
    }
  },
  updateSnippet: async (id: string, mutation: GroqSnippetMutation) => {
    const {client, toastSuccess, toastError} = get()
    try {
      await client!.patch(id).set(mutation).commit({autoGenerateArrayKeys: true})
      toastSuccess({description: 'Snippet updated'})
      get().closeInsertUpdateSnippetsDialog()
      get().searchSnippets(get().searchTerm, get().filterTags, get().sortOption)
    } catch (err: any) {
      toastError({err})
    }
  },
  deleteSnippets: async () => {
    const {client, toastSuccess, toastError} = get()
    const ids = get()
      .snippets!.filter((t) => t.checked)
      .map((t) => t._id)
    if (ids.length === 0) return
    try {
      // delete the snippet(s)
      await client!.delete({
        query: QUERY_SNIPPET_DELETE,
        params: {ids},
      })
      toastSuccess({
        description: `Snippet${ids.length > 1 ? 's' : ''} deleted`,
      })
      get().resetCheckedSnippets()
      get().closeDeleteSnippetsDialog()
      get().searchSnippets(get().searchTerm, get().filterTags, get().sortOption, true)
    } catch (err: any) {
      toastError({err})
    }
  },
})
