import {useGroqSnippetStore} from '../../../zustand/store'
import DeleteDialog from './Delete'
import InsertUpdateDialog from './InsertUpdate'

const DialogSnippets = () => {
  const isInsertUpdateSnippetsDialogOpen = useGroqSnippetStore(
    (s) => s.isInsertUpdateSnippetsDialogOpen,
  )
  return (
    <>
      {isInsertUpdateSnippetsDialogOpen && <InsertUpdateDialog />}
      <DeleteDialog />
    </>
  )
}

export default DialogSnippets
