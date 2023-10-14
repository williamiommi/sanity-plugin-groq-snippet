import {useEffect, useMemo, useState} from 'react'
import GroqSnippet, {GROQ_SNIPPET_TYPE} from '../types/GroqSnippet'
import GroqSnippetTag from '../types/GroqSnippetTag'
import {useGroqSnippetStore} from '../zustand/store'

interface useSnippetFormReturn {
  canConfirm: boolean
  title?: string
  description?: string
  query?: string
  formTags?: GroqSnippetTag[]
  setTitle: (title: string) => void
  setDescription: (description: string) => void
  setQuery: (query: string) => void
  setFormTag: (query: string) => void
  setVariables: (variables: string) => void
  saveSnippet: () => void
}

const useSnippetForm = (snippetToUpdate?: GroqSnippet): useSnippetFormReturn => {
  const tags = useGroqSnippetStore((s) => s.tags)
  const addSnippet = useGroqSnippetStore((s) => s.addSnippet)
  const [title, setTitle] = useState(snippetToUpdate?.title)
  const [description, setDescription] = useState(snippetToUpdate?.description)
  const [query, setQuery] = useState(snippetToUpdate?.query)
  const [variables, setVariables] = useState(snippetToUpdate?.variables)
  const canConfirm = useMemo(() => !!title && !!query, [title, query])
  const [formTags, setFormTags] = useState<GroqSnippetTag[]>()

  useEffect(() => {
    if (tags) {
      setFormTags(
        tags.map((t) => ({
          ...t,
          checked: !!snippetToUpdate?.tags?.find((nt) => nt._ref === t._id),
        })),
      )
    }
  }, [tags, snippetToUpdate?.tags])

  const setFormTag = (tagRef: string) => {
    setFormTags((state) => {
      if (!state) return []
      return state!.map((tag) => ({
        ...tag,
        checked: tag._id === tagRef ? !tag.checked : tag.checked,
      }))
    })
  }

  const saveSnippet = () => {
    if (title && query) {
      addSnippet({_type: GROQ_SNIPPET_TYPE, title, description, query, variables})
    }
  }

  return {
    title,
    description,
    setQuery,
    formTags,
    canConfirm,
    setTitle,
    setDescription,
    setVariables,
    saveSnippet,
    setFormTag,
  }
}

export default useSnippetForm
