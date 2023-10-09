import {Box, Dialog, Flex, Text} from '@sanity/ui'
import {useGroqSnippetStore} from '../../../zustand/store'
import Footer from './Footer'
import Header from './Header'

const DeleteTagDialog = () => {
  const tags = useGroqSnippetStore((s) => s.tags)
  const deleteTags = useGroqSnippetStore((s) => s.deleteTags)
  const closeDeleteTagsDialog = useGroqSnippetStore((s) => s.closeDeleteTagsDialog)
  const isDeleteTagsDialogOpen = useGroqSnippetStore((s) => s.isDeleteTagsDialogOpen)

  if (!isDeleteTagsDialogOpen) return null

  return (
    <Dialog
      id="delete-tag-dialog"
      header={<Header />}
      footer={<Footer onCancel={closeDeleteTagsDialog} onConfirm={deleteTags} />}
      width={1}
      onClose={closeDeleteTagsDialog}
    >
      <Box padding={4}>
        <Text>Do you really want to remove the following tag(s)?</Text>
        <Flex direction="column" gap={2} marginTop={5}>
          {tags.map((tag) => {
            if (!tag.checked) return null
            return (
              <Text key={tag._id} weight="semibold">
                - {tag.name.current}
              </Text>
            )
          })}
        </Flex>
      </Box>
    </Dialog>
  )
}

export default DeleteTagDialog
