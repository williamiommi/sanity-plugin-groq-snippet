import {GroqSnippetExport} from '../types/GroqSnippet'

export const sanitizeCsvData = (data: GroqSnippetExport) => {
  const {title, description, tags, query, variables} = data
  return {
    ...data,
    title: title ? title.replace(/"/g, '""') : '',
    description: description ? description.replace(/"/g, '""') : '',
    tags: tags && tags.length > 0 ? tags.map((tag) => tag.replace(/"/g, '""')) : [],
    query: query ? query.replace(/"/g, '""') : '',
    variables: variables ? variables.replace(/"/g, '""') : '',
  }
}
