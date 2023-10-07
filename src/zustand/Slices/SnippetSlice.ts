import {StateCreator} from 'zustand'
import GroqSnippet from '../../types/GroqSnippet'

export interface SnippetSlice {
  snippets: GroqSnippet[]
  snippetsCount: number
  setSnippets: (snippets: GroqSnippet[]) => void
  setSnippetsCount: (snippetsCount: number) => void
}

export const createSnippetSlice: StateCreator<SnippetSlice, [], [], SnippetSlice> = (set, get) => ({
  snippets: [],
  snippetsCount: 0,
  setSnippets: (snippets: GroqSnippet[]) => set({snippets}),
  setSnippetsCount: (snippetsCount: number) => set({snippetsCount}),
})
