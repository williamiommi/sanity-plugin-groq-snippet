import {FormEvent} from 'react'
import {useGroqSnippetStore} from '../zustand/store'

interface useTagOperationReturn {
  toggleTag: (e: FormEvent<HTMLInputElement>) => void
  toggleAll: (e: FormEvent<HTMLInputElement>) => void
  hasAtLeastOneTagChecked: boolean
  hasAllTagsChecked: boolean
}

const useTagOperation = (): useTagOperationReturn => {
  const tags = useGroqSnippetStore((s) => s.tags)
  const setTags = useGroqSnippetStore((s) => s.setTags)
  const hasAtLeastOneTagChecked = tags.some((t) => t.checked)
  const hasAllTagsChecked = tags.every((t) => t.checked)

  const toggleAll = (e: FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.checked) {
      setTags(tags.map((t) => ({...t, checked: true})))
    } else {
      setTags(tags.map((t) => ({...t, checked: false})))
    }
  }

  const toggleTag = (e: FormEvent<HTMLInputElement>) => {
    const {id} = e.currentTarget.dataset
    if (e.currentTarget.checked) {
      setTags(tags.map((t) => ({...t, checked: t._id === id ? true : t.checked})))
    } else {
      setTags(tags.map((t) => ({...t, checked: t._id === id ? false : t.checked})))
    }
  }

  return {toggleTag, toggleAll, hasAtLeastOneTagChecked, hasAllTagsChecked}
}

export default useTagOperation
