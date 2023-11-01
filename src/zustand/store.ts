import {create} from 'zustand'
import {DialogSlice, createDialogSlice} from './Slices/DialogSlice'
import {SanitySlice, createSanitySlice} from './Slices/SanitySlice'
import {SnippetSlice, createSnippetSlice} from './Slices/SnippetSlice'
import {TagSlice, createTagSlice} from './Slices/TagSlice'
import {UtilsSlice, createUtilsSlice} from './Slices/UtilsSlice'

export type GroqSnippetState = SanitySlice & TagSlice & SnippetSlice & UtilsSlice & DialogSlice

export const useGroqSnippetStore = create<GroqSnippetState>((...a) => ({
  ...createSanitySlice(...a),
  ...createTagSlice(...a),
  ...createSnippetSlice(...a),
  ...createUtilsSlice(...a),
  ...createDialogSlice(...a),
}))
