import {StateCreator} from 'zustand'
import {SortOption, sortingOptions} from '../../components/Sorting'
import {toastError} from '../../lib/toastUtils'
import {
  QUERY_EXPORT_SNIPPETS,
  QUERY_GET_SNIPPET,
  QUERY_INITIAL_DATA,
  QUERY_SNIPPETS_SEARCH,
  QueryInitialDataResponse,
} from '../../queries'
import GroqSnippet, {GroqSnippetExport} from '../../types/GroqSnippet'
import GroqSnippetTag from '../../types/GroqSnippetTag'
import {SanitySlice} from './SanitySlice'
import {SnippetSlice} from './SnippetSlice'
import {TagSlice} from './TagSlice'

export interface UtilsSlice {
  searchTerm: string
  setSearchTerm: (searchTerm?: string) => void
  filterTags: GroqSnippetTag[]
  setFilterTags: (filterTags?: GroqSnippetTag[]) => void
  sortOption: SortOption
  setSortOption: (sortOption?: SortOption) => void
  getSnippet: (id: string) => Promise<GroqSnippet | undefined>
  searchSnippets: (term: string, filterTags: GroqSnippetTag[], sortOption: SortOption) => void
  fetchData: () => void
  exportData: () => Promise<GroqSnippetExport[]>
}

export const createUtilsSlice: StateCreator<
  SanitySlice & UtilsSlice & TagSlice & SnippetSlice,
  [],
  [],
  UtilsSlice
> = (set, get) => ({
  searchTerm: '',
  setSearchTerm: (searchTerm?: string) => set({searchTerm}),
  filterTags: [],
  setFilterTags: (filterTags?: GroqSnippetTag[]) => set({filterTags}),
  sortOption: sortingOptions[0],
  setSortOption: (sortOption?: SortOption) => set({sortOption}),
  getSnippet: async (id: string) => {
    const {client, toast} = get()
    try {
      const response = await client!.fetch<GroqSnippet>(
        QUERY_GET_SNIPPET,
        {id},
        {perspective: 'published'},
      )
      return response
    } catch (err: any) {
      toastError(toast!, get().toolName, {err})
      return undefined
    }
  },
  searchSnippets: async (term: string, filterTags: GroqSnippetTag[], sortOption: SortOption) => {
    const {client, toast, setSnippets} = get()
    try {
      const response = await client!.fetch(
        QUERY_SNIPPETS_SEARCH(filterTags.length > 0, sortOption),
        {term, tags: filterTags.map((tag) => tag.name.current)},
        {perspective: 'published'},
      )
      setSnippets(response)
    } catch (err: any) {
      toastError(toast!, get().toolName, {err})
    }
  },
  fetchData: async () => {
    const {client, toast, setSnippets, setSnippetsCount, setTags, setTagsCount} = get()
    try {
      const response = await client!.fetch<QueryInitialDataResponse>(
        QUERY_INITIAL_DATA,
        {},
        {perspective: 'published'},
      )
      setSnippets(response.snippets.length === 0 ? undefined : response.snippets)
      setSnippetsCount(response.snippetsCount)
      setTags(response.tags)
      setTagsCount(response.tagsCount)
    } catch (err: any) {
      toastError(toast!, get().toolName, {err})
    }
  },
  exportData: async () => {
    const {client, toast} = get()
    try {
      const ids = get()
        .snippets!.filter((t) => t.checked)
        .map((t) => t._id)
      if (ids.length === 0) return []
      const response = await client!.fetch<GroqSnippetExport[]>(
        QUERY_EXPORT_SNIPPETS,
        {ids},
        {perspective: 'published'},
      )
      return response
    } catch (err: any) {
      toastError(toast!, get().toolName, {err})
      return []
    }
  },
})
