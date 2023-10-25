import {Box, Flex, useTheme} from '@sanity/ui'
import {ThemeProvider} from 'styled-components'
import useSetupTool from '../../hooks/useSetupTool'
import DialogExport from '../Dialogs/Export'
import DialogSnippets from '../Dialogs/Snippet'
import DialogTags from '../Dialogs/Tag'
import Heading from '../Heading'
import MainActions from '../MainActions'
import SnippetsTable from '../SnippetsTable'

const GroqSnippetTool = () => {
  const theme = useTheme()
  useSetupTool()
  return (
    <ThemeProvider theme={theme}>
      <Box style={{minWidth: '400px'}}>
        <Flex justify="space-between" align="center" gap={2} padding={3}>
          <Heading />
          <MainActions />
        </Flex>
        <SnippetsTable />
      </Box>
      <DialogSnippets />
      <DialogTags />
      <DialogExport />
    </ThemeProvider>
  )
}

export default GroqSnippetTool
