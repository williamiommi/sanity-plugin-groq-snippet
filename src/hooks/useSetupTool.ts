import {useToast} from '@sanity/ui'
import {useEffect} from 'react'
import {Tool, useClient, useCurrentUser, useTools} from 'sanity'
import {TOOL_TITLE, VISION_TOOL_NAME} from '../lib/constants'
import userCanEdit from '../lib/userCanEdit'
import GroqSnippetPluginOptions from '../types/GroqSnippetPluginOptions'
import {useGroqSnippetStore} from '../zustand/store'

const useSetupTool = (tool: Tool<GroqSnippetPluginOptions>): void => {
  const currentUser = useCurrentUser()
  const client = useClient({apiVersion: '2022-03-07'})
  const toast = useToast()
  const tools = useTools()
  const setupSanity = useGroqSnippetStore((s) => s.setupSanity)
  const setToolName = useGroqSnippetStore((s) => s.setToolName)
  const setVisionTool = useGroqSnippetStore((s) => s.setVisionTool)
  const setCurrentUserCanEdit = useGroqSnippetStore((s) => s.setCurrentUserCanEdit)
  const fetchData = useGroqSnippetStore((s) => s.fetchData)

  useEffect(() => {
    setupSanity(client, toast)
    setToolName(tool.title || TOOL_TITLE)

    tools.forEach((currentTool) => {
      if ([tool.options?.visionToolCustomName, VISION_TOOL_NAME].includes(currentTool.name))
        setVisionTool(currentTool)
    })

    setCurrentUserCanEdit(userCanEdit(currentUser, tool.options?.editableFor))
    fetchData()
  }, [
    setupSanity,
    client,
    toast,
    fetchData,
    currentUser,
    tools,
    tool.title,
    tool.options?.editableFor,
    tool.options?.visionToolCustomName,
    setToolName,
    setCurrentUserCanEdit,
    setVisionTool,
  ])
}

export default useSetupTool
