import {StateCreator} from 'zustand'
import {
  FETCH_TAGS_DATA,
  QUERY_TAG_DELETE,
  QUERY_TAG_HAS_REFERENCES,
  QueryInitialDataResponse,
  TAG_EXISTS,
} from '../../queries'
import GroqSnippetTag, {
  GROQ_SNIPPET_TAG_TYPE,
  GroqSnippetTagMutation,
} from '../../types/GroqSnippetTag'
import {DialogSlice} from './DialogSlice'
import {SanitySlice} from './SanitySlice'
import {UtilsSlice} from './UtilsSlice'

export interface TagSlice {
  tags: GroqSnippetTag[]
  tagsCount: number
  tagToUpdate?: GroqSnippetTag
  setTags: (tags: GroqSnippetTag[]) => void
  resetCheckedTags: () => void
  setTagsCount: (tagsCount: number) => void
  fetchTags: () => void
  addTag: (name: string) => void
  updateTag: (id: string, name: string) => void
  deleteTags: () => void
}

export const createTagSlice: StateCreator<
  SanitySlice & TagSlice & UtilsSlice & DialogSlice,
  [],
  [],
  TagSlice
> = (set, get) => ({
  tags: [],
  tagsCount: 0,
  setTags: (tags: GroqSnippetTag[]) => set({tags}),
  resetCheckedTags: () => set({tags: get().tags.map((t) => ({...t, checked: false}))}),
  setTagsCount: (tagsCount: number) => set({tagsCount}),
  fetchTags: async () => {
    const {client, toastError, setTags, setTagsCount} = get()
    try {
      const response = await client!.fetch<QueryInitialDataResponse>(
        FETCH_TAGS_DATA,
        {},
        {perspective: 'published'},
      )
      setTags(response.tags)
      setTagsCount(response.tagsCount)
    } catch (err: any) {
      toastError({err})
    }
  },
  addTag: async (name: string) => {
    const {client, toastSuccess, toastError} = get()
    try {
      // check if already exist a tag with the same name
      const alreadyExist = await client!.fetch(TAG_EXISTS, {name})
      if (alreadyExist) {
        throw Error(`Tag '${name}' already exists`)
      }
      // create tag
      await client!.create<GroqSnippetTagMutation>({
        _type: `${GROQ_SNIPPET_TAG_TYPE}`,
        name: {_type: 'slug', current: name},
      })
      toastSuccess({description: 'Tag created'})
      get().closeInsertUpdateTagsDialog()
      get().fetchTags()
    } catch (err: any) {
      toastError({err})
    }
  },
  updateTag: async (id: string, name: string) => {
    const {client, toastSuccess, toastError} = get()
    try {
      await client!.patch(id).set({'name.current': name}).commit()
      toastSuccess({description: 'Tag updated'})
      get().closeInsertUpdateTagsDialog()
      get().fetchTags()
    } catch (err: any) {
      toastError({err})
    }
  },
  deleteTags: async () => {
    const {client, toastSuccess, toastError} = get()
    const ids = get()
      .tags.filter((t) => t.checked)
      .map((t) => t._id)
    if (ids.length === 0) return
    try {
      // check if tag(s) has/have references
      const referencesCount = await client!.fetch(QUERY_TAG_HAS_REFERENCES, {ids})
      if (referencesCount > 0) {
        throw Error(
          `${
            ids.length > 1 ? 'One or more tags are' : 'Selected tag is'
          } used by ${referencesCount} snippet${referencesCount > 1 ? 's' : ''}`,
        )
      }
      // delete the tag(s)
      await client!.delete({
        query: QUERY_TAG_DELETE,
        params: {ids},
      })
      toastSuccess({description: `Tag${ids.length > 1 ? 's' : ''} deleted`})
      get().resetCheckedTags()
      get().closeDeleteTagsDialog()
      get().fetchTags()
    } catch (err: any) {
      toastError({err})
    }
  },
})
