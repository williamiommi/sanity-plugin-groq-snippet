import {StateCreator} from 'zustand'
import GroqSnippetTag from '../../types/GroqSnippetTag'
import {SanitySlice} from './SanitySlice'
import {SnippetSlice} from './SnippetSlice'
import {TagSlice} from './TagSlice'

export interface DialogSlice {
  isAllTagsDialogOpen: boolean
  openAllTagsDialog: () => void
  closeAllTagsDialog: () => void

  isDeleteTagsDialogOpen: boolean
  openDeleteTagsDialog: () => void
  closeDeleteTagsDialog: () => void

  isInsertUpdateTagsDialogOpen: boolean
  openInsertUpdateTagsDialog: (tagToUpdate?: GroqSnippetTag) => void
  closeInsertUpdateTagsDialog: () => void
}

export const createDialogSlice: StateCreator<
  SanitySlice & DialogSlice & TagSlice & SnippetSlice,
  [],
  [],
  DialogSlice
> = (set, get) => ({
  isAllTagsDialogOpen: false,
  openAllTagsDialog: () => set({isAllTagsDialogOpen: true}),
  closeAllTagsDialog: () => {
    get().resetCheckedTags()
    set({isAllTagsDialogOpen: false})
  },

  isDeleteTagsDialogOpen: false,
  openDeleteTagsDialog: () => set({isDeleteTagsDialogOpen: true}),
  closeDeleteTagsDialog: () => set({isDeleteTagsDialogOpen: false}),

  isInsertUpdateTagsDialogOpen: false,
  openInsertUpdateTagsDialog: (tagToUpdate?: GroqSnippetTag) =>
    set({isInsertUpdateTagsDialogOpen: true, tagToUpdate}),
  closeInsertUpdateTagsDialog: () =>
    set({isInsertUpdateTagsDialogOpen: false, tagToUpdate: undefined}),
})
