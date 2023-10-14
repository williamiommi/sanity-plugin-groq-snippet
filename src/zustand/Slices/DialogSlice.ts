import {StateCreator} from 'zustand'
import GroqSnippetTag from '../../types/GroqSnippetTag'
import {SanitySlice} from './SanitySlice'
import {SnippetSlice} from './SnippetSlice'
import {TagSlice} from './TagSlice'
import {UtilsSlice} from './UtilsSlice'

export interface DialogSlice {
  isDeleteSnippetsDialogOpen: boolean
  openDeleteSnippetsDialog: () => void
  closeDeleteSnippetsDialog: () => void

  isInsertUpdateSnippetsDialogOpen: boolean
  openInsertUpdateSnippetsDialog: (id?: string) => void
  closeInsertUpdateSnippetsDialog: () => void

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
  SanitySlice & DialogSlice & TagSlice & SnippetSlice & UtilsSlice,
  [],
  [],
  DialogSlice
> = (set, get) => ({
  isDeleteSnippetsDialogOpen: false,
  openDeleteSnippetsDialog: () => set({isDeleteSnippetsDialogOpen: true}),
  closeDeleteSnippetsDialog: () => set({isDeleteSnippetsDialogOpen: false}),

  isInsertUpdateSnippetsDialogOpen: false,
  openInsertUpdateSnippetsDialog: async (id?: string) => {
    const snippetToUpdate = id ? await get().getSnippet(id) : undefined
    set({isInsertUpdateSnippetsDialogOpen: true, snippetToUpdate})
  },
  closeInsertUpdateSnippetsDialog: () =>
    set({isInsertUpdateSnippetsDialogOpen: false, snippetToUpdate: undefined}),

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
