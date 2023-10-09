import {StateCreator} from 'zustand'
import {toastError, toastSuccess} from '../../lib/toastUtils'
import {QUERY_TAG_DELETE, QUERY_TAG_HAS_REFERENCES, TAG_EXISTS} from '../../queries'
import GroqSnippetTag, {
  GROQ_SNIPPET_TAG_TYPE,
  GroqSnippetTagMutation,
} from '../../types/GroqSnippetTag'
import {DialogSlice} from './DialogSlice'
import {SanitySlice} from './SanitySlice'
import {UtilsSlice} from './UtilsSlice'

type SelectedTagsType = {id: string; name: string}

export interface TagSlice {
  tags: GroqSnippetTag[]
  tagsCount: number
  tagFieldError?: string
  selectedTags: SelectedTagsType[]
  setTags: (tags: GroqSnippetTag[]) => void
  setTagsCount: (tagsCount: number) => void
  addTag: (name: string) => void
  updateTag: (id: string, name: string) => void
  deleteTags: () => void
  setTagFieldError: (tagFieldError?: string) => void
  setSelectedTags: (selectedTags?: SelectedTagsType[]) => void
}

export const createTagSlice: StateCreator<
  SanitySlice & TagSlice & UtilsSlice & DialogSlice,
  [],
  [],
  TagSlice
> = (set, get) => ({
  tags: [],
  tagsCount: 0,
  selectedTags: [],
  setTags: (tags: GroqSnippetTag[]) => set({tags}),
  setTagsCount: (tagsCount: number) => set({tagsCount}),
  setTagFieldError: (tagFieldError?: string) => set({tagFieldError}),
  addTag: async (name: string) => {
    const {client, toast} = get()
    try {
      // check if already exist a tag with the same name
      const alreadyExist = await client!.fetch(TAG_EXISTS, {name})
      if (alreadyExist) {
        set({tagFieldError: 'Tag already exists'})
        throw Error(`Tag '${name}' already exists`)
      }
      // create tag
      await client!.create<GroqSnippetTagMutation>({
        _type: `${GROQ_SNIPPET_TAG_TYPE}`,
        name: {_type: 'slug', current: name},
      })
      toastSuccess(toast!, {description: 'Tag created'})
    } catch (err: any) {
      toastError(toast!, {err})
    }
  },
  updateTag: async (id: string, name: string) => {
    const {client, toast} = get()
    try {
      await client!.patch(id).set({'name.current': name}).commit()
      toastSuccess(toast!, {description: 'Tag updated'})
    } catch (err: any) {
      toastError(toast!, {err})
    }
  },
  deleteTags: async () => {
    const {client, toast} = get()
    const ids = get().selectedTags.map((tag) => tag.id)
    if (ids.length === 0) return
    try {
      // check if tag has references
      const referencesCount = await client!.fetch(QUERY_TAG_HAS_REFERENCES, {ids})
      if (referencesCount > 0) {
        throw Error(
          `${
            ids.length > 1 ? 'One or more tags are' : 'Selected tag is'
          } used by ${referencesCount} snippet${referencesCount > 1 ? 's' : ''}`,
        )
      }
      // delete the tag
      await client!.delete({
        query: QUERY_TAG_DELETE,
        params: {ids},
      })
      toastSuccess(toast!, {description: `Tag${ids.length > 1 ? 's' : ''} deleted`})
      get().setSelectedTags([])
      get().closeDeleteTagsDialog()
    } catch (err: any) {
      toastError(toast!, {err})
    }
  },
  setSelectedTags: (selectedTags?: SelectedTagsType[]) => set({selectedTags}),
})
