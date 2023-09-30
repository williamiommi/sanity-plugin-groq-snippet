import {defineField, defineType} from 'sanity'
import TagIcon from '../../components/Icons/TagIcon'
import GroqSnippetTagMetadata from './metadata'

const GroqSnippetTag = defineType({
  type: 'document',
  name: GroqSnippetTagMetadata.name,
  title: GroqSnippetTagMetadata.title,
  icon: TagIcon,
  fields: [
    defineField({
      type: 'string',
      name: 'name',
      title: 'Name',
    }),
  ],
})

export default GroqSnippetTag
