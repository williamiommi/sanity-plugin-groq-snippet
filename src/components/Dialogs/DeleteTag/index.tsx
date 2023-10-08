import {Box, Dialog, Text} from '@sanity/ui'
import useTagOperation from '../../../hooks/useTagOperation'
import {useGroqSnippetStore} from '../../../zustand/store'
import Footer from './Footer'
import Header from './Header'

const DeleteTagDialog = () => {
  const {closeDeleteTagDialog, confirmDeleteTag} = useTagOperation()
  const tagsToDelete = useGroqSnippetStore((s) => s.tagsToDelete)

  if (!tagsToDelete) return null

  return (
    <Dialog
      id="delete-tag-dialog"
      header={<Header />}
      footer={<Footer onCancel={closeDeleteTagDialog} onConfirm={confirmDeleteTag} />}
      width={1}
      onClose={closeDeleteTagDialog}
    >
      <Box padding={4}>
        <Text>Do you really want to remove the '{tagsToDelete.name}' tag?</Text>
      </Box>
    </Dialog>
  )
}

export default DeleteTagDialog
