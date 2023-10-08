import {Box} from '@sanity/ui'
import useSetupTool from '../../hooks/useSetupTool'
import Heading from '../Heading'

const GroqSnippetTool = () => {
  useSetupTool()
  return (
    <Box marginX={3} marginY={4}>
      <Heading />
    </Box>
  )
}

export default GroqSnippetTool
