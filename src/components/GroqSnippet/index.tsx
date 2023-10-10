import {Box, Flex} from '@sanity/ui'
import useSetupTool from '../../hooks/useSetupTool'
import DialogTags from '../Dialogs/Tag'
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
      <DialogTags />
    </>
  )
}

export default GroqSnippetTool
