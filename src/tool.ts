import {Tool} from 'sanity'
import GroqSnippet from './components/GroqSnippet'
import SnippetIcon from './components/Icons/SnippetIcon'
import GroqSnippetPluginOptions from './types/GroqSnippetPluginOptions'

export const GroqSnippetTool = (options: GroqSnippetPluginOptions | void): Tool => {
  return {
    name: options?.name ? encodeURIComponent(options?.name) : 'groq-snippet',
    title: options?.name || 'Groq Snippet',
    icon: options?.icon || SnippetIcon,
    options,
    component: GroqSnippet,
  }
}
