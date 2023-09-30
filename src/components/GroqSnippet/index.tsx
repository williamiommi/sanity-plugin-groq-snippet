import {Box, ThemeProvider} from '@sanity/ui'
import Heading from '../Heading'

const GroqSnippetTool = () => {
  return (
    <ThemeProvider>
      <Box marginX={3} marginY={4}>
        <Heading />
      </Box>
    </ThemeProvider>
  )
}

export default GroqSnippetTool
