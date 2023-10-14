import {Box, Flex, useTheme} from '@sanity/ui'
import {ThemeProvider} from 'styled-components'
import useSetupTool from '../../hooks/useSetupTool'
import DialogSnippets from '../Dialogs/Snippet'
import DialogTags from '../Dialogs/Tag'
import Heading from '../Heading'
import MainActions from '../MainActions'
import SearchInput from '../SearchInput'
import SnippetsGrid from '../SnippetsGrid'

const GroqSnippetTool = () => {
  const theme = useTheme()
  useSetupTool()
  return (
    <ThemeProvider theme={theme}>
      <Box marginX={3} marginY={3}>
        <Flex justify="space-between" align="center" gap={2}>
          <Heading />
          <MainActions />
        </Flex>
        <SearchInput />
        <SnippetsGrid />
      </Box>
      <DialogSnippets />
      <DialogTags />
    </ThemeProvider>
  )
}

export default GroqSnippetTool
