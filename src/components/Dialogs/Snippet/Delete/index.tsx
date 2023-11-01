import {Box, Dialog, Text} from '@sanity/ui'
import {useGroqSnippetStore} from '../../../../zustand/store'
import Footer from './Footer'
import Header from './Header'

const DeleteDialog = () => {
  const deleteSnippets = useGroqSnippetStore((s) => s.deleteSnippets)
  const closeDeleteSnippetsDialog = useGroqSnippetStore((s) => s.closeDeleteSnippetsDialog)
  const isDeleteSnippetsDialogOpen = useGroqSnippetStore((s) => s.isDeleteSnippetsDialogOpen)

  if (!isDeleteSnippetsDialogOpen) return null

  return (
    <Dialog
      id="delete-tag-dialog"
      header={<Header />}
      footer={<Footer onCancel={closeDeleteSnippetsDialog} onConfirm={deleteSnippets} />}
      width={1}
      onClose={closeDeleteSnippetsDialog}
    >
      <Box padding={4}>
        <Text>Do you really want to remove the selected snippet(s)?</Text>
      </Box>
    </Dialog>
  )
}

export default DeleteDialog
