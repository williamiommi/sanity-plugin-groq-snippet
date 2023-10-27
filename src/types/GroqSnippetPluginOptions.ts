import {ComponentType} from 'react'

export default interface GroqSnippetPluginOptions {
  name?: string
  icon?: ComponentType
  editableFor?: string[]
}
