import {FormEvent} from 'react'
import {useGroqSnippetStore} from '../zustand/store'

interface useTagOperationReturn {
  openDeleteTagDialog: (e: FormEvent<HTMLButtonElement>) => void
  closeDeleteTagDialog: () => void
  confirmDeleteTag: () => void
}

const useTagOperation = (): useTagOperationReturn => {
  const tagsToDelete = useGroqSnippetStore((s) => s.tagsToDelete)
  const setTagToDelete = useGroqSnippetStore((s) => s.setTagToDelete)
  const deleteTag = useGroqSnippetStore((s) => s.deleteTag)

  const openDeleteTagDialog = (e: FormEvent<HTMLButtonElement>) => {
    const {id, name} = e.currentTarget.dataset
    setTagToDelete({id: id!, name: name!})
  }

  const closeDeleteTagDialog = () => {
    setTagToDelete(undefined)
  }

  const confirmDeleteTag = () => {
    deleteTag(tagsToDelete!)
  }

  return {openDeleteTagDialog, closeDeleteTagDialog, confirmDeleteTag}
}

export default useTagOperation
