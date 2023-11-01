import {Grid} from '@sanity/ui'
import {useGroqSnippetStore} from '../../zustand/store'
import Item from './Item'

const SnippetsGrid = () => {
  const snippets = useGroqSnippetStore((s) => s.snippets)

  if (!snippets) return null

  return (
    <Grid marginY={3} columns={[1, 1, 2, 2, 3]} gap={3}>
      {snippets.map((snippet) => (
        <Item key={snippet._id} snippet={snippet} />
      ))}
    </Grid>
  )
}

export default SnippetsGrid
