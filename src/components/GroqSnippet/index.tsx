import {Box, Flex} from '@sanity/ui'
import useSetupTool from '../../hooks/useSetupTool'
import TagsDialog from '../Dialogs/AllTags'
import Heading from '../Heading'
import MainActions from '../MainActions'

const GroqSnippetTool = () => {
  useSetupTool()
  return (
    <>
      <Box marginX={3} marginY={4}>
        <Flex justify="space-between" align="center" gap={2}>
          <Heading />
          <MainActions />
        </Flex>
      </Box>
      <TagsDialog />
    </>
  )
}

export default GroqSnippetTool
