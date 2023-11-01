import {FormEvent, useMemo} from 'react'
import {useGroqSnippetStore} from '../zustand/store'

interface useSnippetsTableReturn {
  selectedSnippetsCount: number
  hasSomeSnippetsChecked: boolean
  hasAllSnippetsChecked: boolean
  toggleSnippetsCheckbox: (e: FormEvent<HTMLInputElement>) => void
}

const useSnippetsTable = (): useSnippetsTableReturn => {
  const snippets = useGroqSnippetStore((s) => s.snippets)
  const setSnippets = useGroqSnippetStore((s) => s.setSnippets)

  const selectedSnippetsCount = useMemo(
    () => snippets?.reduce((acc, curr) => (acc += curr.checked ? 1 : 0), 0) || 0,
    [snippets],
  )

  const toggleSnippetsCheckbox = (e: FormEvent<HTMLInputElement>) => {
    if (snippets) {
      setSnippets(snippets.map((snippet) => ({...snippet, checked: e.currentTarget.checked})))
    }
  }

  return {
    selectedSnippetsCount,
    hasSomeSnippetsChecked: selectedSnippetsCount > 0,
    hasAllSnippetsChecked: snippets ? selectedSnippetsCount === snippets.length : false,
    toggleSnippetsCheckbox,
  }
}

export default useSnippetsTable
