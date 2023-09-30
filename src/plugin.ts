import {definePlugin} from 'sanity'
import {GroqSnippetTool} from './tool'
import GroqSnippetPluginOptions from './types/GroqSnippetPluginOptions'

export const GroqSnippetPlugin = definePlugin<GroqSnippetPluginOptions | void>((config) => {
  return {
    name: `sanity-plugin-groq-snippet`,
    tools: [GroqSnippetTool],
  }
})
