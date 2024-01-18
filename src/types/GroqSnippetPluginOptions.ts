import {ComponentType} from 'react'

export default interface GroqSnippetPluginOptions {
  name?: string
  icon?: ComponentType
  showDocuments?: boolean
  editableFor?: string[]
  visionToolCustomName?: string
}
