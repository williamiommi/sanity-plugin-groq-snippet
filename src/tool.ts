import {Tool} from 'sanity'
import GroqSnippet from './components/GroqSnippet'
import SnippetIcon from './components/Icons/SnippetIcon'

export const GroqSnippetTool: Tool = {
  name: 'groq-snippet',
  title: 'Groq Snippet',
  icon: SnippetIcon,
  component: GroqSnippet,
}
