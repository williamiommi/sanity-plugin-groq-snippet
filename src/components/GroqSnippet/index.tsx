import {Box} from '@sanity/ui'
import useFetchData from '../../hooks/useFetchData'
import {useGroqSnippetStore} from '../../zustand/store'
import Heading from '../Heading'

const GroqSnippetTool = () => {
  const snippets = useGroqSnippetStore((s) => s.snippets)
  const snippetsCount = useGroqSnippetStore((s) => s.snippetsCount)
  useFetchData()
  return (
    <Box marginX={3} marginY={4}>
      <Heading />
      {snippets && (
        <>
          <h4>Total: {snippetsCount}</h4>
          <pre>{JSON.stringify(snippets, null, 2)}</pre>
        </>
      )}
    </Box>
  )
}

export default GroqSnippetTool
