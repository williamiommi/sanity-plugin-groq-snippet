import {StateCreator} from 'zustand'
import GroqSnippetTag from '../../types/GroqSnippetTag'

export interface TagSlice {
  tags: GroqSnippetTag[]
  tagsCount: number
  setTags: (tags: GroqSnippetTag[]) => void
  setTagsCount: (tagsCount: number) => void
}

export const createTagSlice: StateCreator<TagSlice, [], [], TagSlice> = (set, get) => ({
  tags: [],
  tagsCount: 0,
  setTags: (tags: GroqSnippetTag[]) => set({tags}),
  setTagsCount: (tagsCount: number) => set({tagsCount}),
})
