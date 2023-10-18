import {useCallback, useEffect, useMemo, useState} from 'react'
import beautify from '../lib/beautify'
import isValidJSON from '../lib/isValidJSON'
import GroqSnippet, {
  GROQ_SNIPPET_TYPE,
  GroqSnippetExport,
  GroqSnippetMutation,
} from '../types/GroqSnippet'
import GroqSnippetTag, {GroqSnippetTagReference} from '../types/GroqSnippetTag'
import {useGroqSnippetStore} from '../zustand/store'

interface useSnippetFormReturn {
  canConfirm: boolean
  title?: string
  description?: string
  query?: string
  variables?: string
  variablesError?: string | undefined
  formTags?: GroqSnippetTag[]
  snippetToExport: GroqSnippetExport | undefined
  setTitle: (title: string) => void
  setDescription: (description: string) => void
  setQuery: (query: string) => void
  beautifyQuery: () => void
  setFormTag: (query: string) => void
  setVariables: (variables: string) => void
  beautifyVariables: () => void
  saveSnippet: () => void
}

const useSnippetForm = (snippetToUpdate?: GroqSnippet): useSnippetFormReturn => {
  const tags = useGroqSnippetStore((s) => s.tags)
  const addSnippet = useGroqSnippetStore((s) => s.addSnippet)
  const updateSnippet = useGroqSnippetStore((s) => s.updateSnippet)
  const [title, setTitle] = useState(snippetToUpdate?.title)
  const [description, setDescription] = useState(snippetToUpdate?.description)
  const [query, setQuery] = useState(snippetToUpdate?.query)
  const [variables, setVariables] = useState(snippetToUpdate?.variables)
  const [variablesError, setVariablesError] = useState<string | undefined>()
  const canConfirm = useMemo(
    () => !!title && !!query && !variablesError,
    [title, query, variablesError],
  )
  const [formTags, setFormTags] = useState<GroqSnippetTag[]>([])

  const snippetToExport = useMemo<GroqSnippetExport | undefined>(() => {
    if (!snippetToUpdate) return undefined
    return {
      _id: snippetToUpdate?._id,
      _type: snippetToUpdate?._type,
      title: title!,
      description: description!,
      tags: formTags.map((tag) => tag.name.current),
      query: query!,
      variables,
    }
  }, [snippetToUpdate, title, description, formTags, query, variables])

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
      let tagsToSave: GroqSnippetTagReference[] = []
      if (formTags) {
        tagsToSave = formTags
          ?.filter((t) => t.checked)
          .map((t) => ({_type: 'reference', _ref: t._id}))
      }

      const snippetToStore: GroqSnippetMutation = {
        _type: GROQ_SNIPPET_TYPE,
        title,
        description,
        query,
        variables,
        tags: tagsToSave,
      }

      if (snippetToUpdate) {
        updateSnippet(snippetToUpdate._id, snippetToStore)
      } else {
        addSnippet(snippetToStore)
      }
    }
  }

  const handleVariables = (value: string) => {
    const isValid = isValidJSON(value)
    if (typeof isValid === 'boolean') {
      setVariables(value)
      setVariablesError(undefined)
    } else {
      setVariablesError(isValid)
    }
  }

  const beautifyQuery = useCallback(() => {
    if (query) setQuery(beautify(query))
  }, [query])

  const beautifyVariables = useCallback(() => {
    if (variables) setVariables(beautify(variables))
  }, [variables])

  return {
    title,
    description,
    formTags,
    canConfirm,
    query,
    variables,
    variablesError,
    snippetToExport,
    setQuery,
    beautifyQuery,
    setTitle,
    setDescription,
    setVariables: handleVariables,
    beautifyVariables,
    saveSnippet,
    setFormTag,
  }
}

export default useSnippetForm
