import {Box} from '@sanity/ui'
import useFetchData from '../../hooks/useFetchData'
import {useGroqSnippetStore} from '../../zustand/store'
import Heading from '../Heading'

const GroqSnippetTool = () => {
  const snippets = useGroqSnippetStore((s) => s.snippets)
  useFetchData()
  return (
    <Box marginX={3} marginY={4}>
      <Heading />
      {snippets && <pre>{JSON.stringify(snippets, null, 2)}</pre>}
    </Box>
  )
}

export default GroqSnippetTool
