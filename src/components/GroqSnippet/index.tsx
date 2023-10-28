import {Box, Flex, useTheme} from '@sanity/ui'
import {Tool} from 'sanity'
import {ThemeProvider} from 'styled-components'
import useSetupTool from '../../hooks/useSetupTool'
import GroqSnippetPluginOptions from '../../types/GroqSnippetPluginOptions'
import DialogExport from '../Dialogs/Export'
import DialogSnippets from '../Dialogs/Snippet'
import DialogTags from '../Dialogs/Tag'
import Heading from '../Heading'
import MainActions from '../MainActions'
import SnippetsTable from '../SnippetsTable'
import UserCantEditMessage from '../UserCantEditMessage'

const GroqSnippetTool = ({tool}: {tool: Tool<GroqSnippetPluginOptions>}) => {
  const theme = useTheme()
  useSetupTool(tool.options)
  return (
    <ThemeProvider theme={theme}>
      <Box style={{minWidth: '400px'}}>
        <UserCantEditMessage />
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
