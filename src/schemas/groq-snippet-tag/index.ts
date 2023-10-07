import {defineField, defineType} from 'sanity'
import TagIcon from '../../components/Icons/TagIcon'
import GroqSnippetTagMetadata from './metadata'

const GroqSnippetTag = defineType({
  type: 'document',
  name: GroqSnippetTagMetadata.name,
  title: GroqSnippetTagMetadata.title,
  icon: TagIcon,
  preview: {
    select: {
      name: 'name',
    },
    prepare({name}) {
      return {title: name.current}
    },
  },
  fields: [
    defineField({
      type: 'slug',
      name: 'name',
      title: 'Name',
    }),
  ],
})

export default GroqSnippetTag
