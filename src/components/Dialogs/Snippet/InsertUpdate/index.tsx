import {Dialog} from '@sanity/ui'
import {useCallback} from 'react'
import useSnippetForm from '../../../../hooks/useSnippetForm'
import {useGroqSnippetStore} from '../../../../zustand/store'
import Vertical from '../../../Resizer/Vertical'
import Footer from './Footer'
import Form from './Form'
import Header from './Header'

const InsertUpdateDialog = () => {
  const closeInsertUpdateSnippetsDialog = useGroqSnippetStore(
    (s) => s.closeInsertUpdateSnippetsDialog,
  )
  const snippetToUpdate = useGroqSnippetStore((s) => s.snippetToUpdate)
  const {formTags, canConfirm, setTitle, setDescription, setFormTag} =
    useSnippetForm(snippetToUpdate)

  const handleConfirm = useCallback(() => {}, [])

  const RightNode = () => <div style={{width: '100%'}}>right</div>

  return (
    <Dialog
      id="insert-update-tag-dialog"
      header={<Header isEdit={!!snippetToUpdate} />}
      footer={
        <Footer
          isEdit={!!snippetToUpdate}
          onCancel={closeInsertUpdateSnippetsDialog}
          canConfirm={canConfirm}
          onConfirm={handleConfirm}
        />
      }
      onClose={closeInsertUpdateSnippetsDialog}
      width={100}
    >
      <Vertical
        leftWidth="40%"
        rightWidth="60%"
        leftNode={
          <Form
            formTags={formTags}
            onSelectTag={setFormTag}
            onChangeTitle={setTitle}
            onChangeDescription={setDescription}
          />
        }
        rightNode={<RightNode />}
      />
    </Dialog>
  )
}

export default InsertUpdateDialog
