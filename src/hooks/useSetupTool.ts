import {useToast} from '@sanity/ui'
import {useEffect} from 'react'
import {useClient, useCurrentUser} from 'sanity'
import userCanEdit from '../lib/userCanEdit'
import GroqSnippetPluginOptions from '../types/GroqSnippetPluginOptions'
import {useGroqSnippetStore} from '../zustand/store'

const useSetupTool = (options?: GroqSnippetPluginOptions): void => {
  const currentUser = useCurrentUser()
  const client = useClient({apiVersion: '2021-06-07'})
  const toast = useToast()
  const setupSanity = useGroqSnippetStore((s) => s.setupSanity)
  const setCurrentUserCanEdit = useGroqSnippetStore((s) => s.setCurrentUserCanEdit)
  const fetchData = useGroqSnippetStore((s) => s.fetchData)

  useEffect(() => {
    setupSanity(client, toast)
    setCurrentUserCanEdit(userCanEdit(currentUser, options?.editableFor))
    fetchData()
  }, [
    setupSanity,
    client,
    toast,
    fetchData,
    currentUser,
    options?.editableFor,
    setCurrentUserCanEdit,
  ])
}

export default useSetupTool
