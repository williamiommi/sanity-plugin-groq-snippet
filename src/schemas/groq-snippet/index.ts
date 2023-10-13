import {defineField, defineType} from 'sanity'
import SnippetIcon from '../../components/Icons/SnippetIcon'
import GroqSnippetTagMetadata from '../groq-snippet-tag/metadata'
import GroqSnippetMetadata from './metadata'

const GroqSnippet = defineType({
  type: 'document',
  name: GroqSnippetMetadata.name,
  title: GroqSnippetMetadata.title,
  icon: SnippetIcon,
  fields: [
    defineField({
      type: 'string',
      name: 'title',
      title: 'Title',
    }),
    defineField({
      type: 'string',
      name: 'description',
      title: 'Description',
    }),
    defineField({
      type: 'text',
      name: 'query',
      title: 'Query',
    }),
    defineField({
      type: 'text',
      name: 'variables',
      title: 'variables',
    }),
    defineField({
      type: 'array',
      name: 'tags',
      title: 'Tags',
      of: [{type: 'reference', to: [{type: GroqSnippetTagMetadata.name}]}],
    }),
  ],
})

export default GroqSnippet
