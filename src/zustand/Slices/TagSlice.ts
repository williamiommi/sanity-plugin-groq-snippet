import {StateCreator} from 'zustand'
import {toastError, toastSuccess} from '../../lib/toastUtils'
import {QUERY_TAG_HAS_REFERENCES, TAG_EXISTS} from '../../queries'
import GroqSnippetTag, {GROQ_SNIPPET_TAG_TYPE} from '../../types/GroqSnippetTag'
import {SanitySlice} from './SanitySlice'

export interface TagSlice {
  tags: GroqSnippetTag[]
  tagsCount: number
  tagFieldError?: string
  setTags: (tags: GroqSnippetTag[]) => void
  setTagsCount: (tagsCount: number) => void
  addTag: (name: string) => void
  updateTag: (id: string, name: string) => void
  deleteTag: (id: string, name: string) => void
  setTagFieldError: (tagFieldError?: string) => void
}

export const createTagSlice: StateCreator<SanitySlice & TagSlice, [], [], TagSlice> = (
  set,
  get,
) => ({
  tags: [],
  tagsCount: 0,
  setTags: (tags: GroqSnippetTag[]) => set({tags}),
  setTagsCount: (tagsCount: number) => set({tagsCount}),
  setTagFieldError: (tagFieldError?: string) => set({tagFieldError}),
  addTag: async (name: string) => {
    const client = get().client!
    const toast = get().toast!
    try {
      // check if already exist a tag with the same name
      const alreadyExist = await client.fetch(TAG_EXISTS, {name})
      if (alreadyExist) {
        set({tagFieldError: 'Tag already exists'})
        throw Error(`Tag '${name}' already exists`)
      }
      // create tag
      await client.create({_type: `${GROQ_SNIPPET_TAG_TYPE}`, name: {current: name}})
      toastSuccess({toast: get().toast!, description: 'Tag created'})
    } catch (err: any) {
      toastError({toast, err})
    }
  },
  updateTag: async (id: string, name: string) => {
    const client = get().client!
    const toast = get().toast!
    try {
      await client
        .patch(id)
        .set({name: {current: name}})
        .commit()
      toastSuccess({toast, description: 'Tag updated'})
    } catch (err: any) {
      toastError({toast, err})
    }
  },
  deleteTag: async (id: string, name: string) => {
    const client = get().client!
    const toast = get().toast!
    try {
      // check if tag has references
      const referencesCount = await client.fetch(QUERY_TAG_HAS_REFERENCES, {id})
      if (referencesCount > 0) {
        throw Error(
          `Tag '${name}' is used by ${referencesCount} snippet${referencesCount > 1 ? 's' : ''}`,
        )
      }
      // delete the tag
      await client.delete(id)
      toastSuccess({toast, description: 'Tag deleted'})
    } catch (err: any) {
      toastError({toast, err})
    }
  },
})
