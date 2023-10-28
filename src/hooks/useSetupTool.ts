import {useToast} from '@sanity/ui'
import {useEffect} from 'react'
import {Tool, useClient, useCurrentUser} from 'sanity'
import {TOOL_TITLE} from '../lib/constants'
import userCanEdit from '../lib/userCanEdit'
import GroqSnippetPluginOptions from '../types/GroqSnippetPluginOptions'
import {useGroqSnippetStore} from '../zustand/store'

const useSetupTool = (tool: Tool<GroqSnippetPluginOptions>): void => {
  const currentUser = useCurrentUser()
  const client = useClient({apiVersion: '2021-06-07'})
  const toast = useToast()
  const setupSanity = useGroqSnippetStore((s) => s.setupSanity)
  const setToolName = useGroqSnippetStore((s) => s.setToolName)
  const setCurrentUserCanEdit = useGroqSnippetStore((s) => s.setCurrentUserCanEdit)
  const fetchData = useGroqSnippetStore((s) => s.fetchData)

  useEffect(() => {
    setupSanity(client, toast)
    setToolName(tool.title || TOOL_TITLE)
    setCurrentUserCanEdit(userCanEdit(currentUser, tool.options?.editableFor))
    fetchData()
  }, [
    setupSanity,
    client,
    toast,
    fetchData,
    currentUser,
    tool.title,
    tool.options?.editableFor,
    setToolName,
    setCurrentUserCanEdit,
  ])
}

export default useSetupTool
