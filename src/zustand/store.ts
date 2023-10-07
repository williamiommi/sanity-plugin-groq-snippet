import {create} from 'zustand'
import {SnippetSlice, createSnippetSlice} from './Slices/SnippetSlice'
import {TagSlice, createTagSlice} from './Slices/TagSlice'
import {UtilsSlice, createUtilsSlice} from './Slices/UtilsSlice'

export type GroqSnippetState = TagSlice & SnippetSlice & UtilsSlice

export const useGroqSnippetStore = create<GroqSnippetState>((...a) => ({
  ...createTagSlice(...a),
  ...createSnippetSlice(...a),
  ...createUtilsSlice(...a),
}))