import {FormEvent} from 'react'
import {useGroqSnippetStore} from '../zustand/store'

interface useTagOperationReturn {
  toggleTag: (e: FormEvent<HTMLInputElement>) => void
}

const useTagOperation = (): useTagOperationReturn => {
  const selectedTags = useGroqSnippetStore((s) => s.selectedTags)
  const setSelectedTags = useGroqSnippetStore((s) => s.setSelectedTags)

  const toggleTag = (e: FormEvent<HTMLInputElement>) => {
    const {id, name} = e.currentTarget.dataset
    if (e.currentTarget.checked) {
      setSelectedTags([...selectedTags, {id: id!, name: name!}])
    } else {
      setSelectedTags(selectedTags.filter((tag) => tag.id !== id!))
    }
  }

  return {toggleTag}
}

export default useTagOperation
