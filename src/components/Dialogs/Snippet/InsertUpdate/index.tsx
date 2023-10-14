import {Dialog, Flex, Text} from '@sanity/ui'
import useSnippetForm from '../../../../hooks/useSnippetForm'
import {useGroqSnippetStore} from '../../../../zustand/store'
import CodeMirrorEditor from '../../../CodeMirrorEditor'
import Horizontal from '../../../Resizer/Horizontal'
import Vertical from '../../../Resizer/Vertical'
import Footer from './Footer'
import Form from './Form'
import Header from './Header'

const InsertUpdateDialog = () => {
  const closeInsertUpdateSnippetsDialog = useGroqSnippetStore(
    (s) => s.closeInsertUpdateSnippetsDialog,
  )
  const snippetToUpdate = useGroqSnippetStore((s) => s.snippetToUpdate)
  const {
    title,
    description,
    formTags,
    query,
    variables,
    canConfirm,
    setTitle,
    setDescription,
    setFormTag,
    setQuery,
    setVariables,
    saveSnippet,
  } = useSnippetForm(snippetToUpdate)

  return (
    <Dialog
      id="insert-update-tag-dialog"
      header={<Header isEdit={!!snippetToUpdate} />}
      footer={
        <Footer
          isEdit={!!snippetToUpdate}
          onCancel={closeInsertUpdateSnippetsDialog}
          canConfirm={canConfirm}
          onConfirm={saveSnippet}
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
            title={title}
            description={description}
            formTags={formTags}
            onSelectTag={setFormTag}
            onChangeTitle={setTitle}
            onChangeDescription={setDescription}
          />
        }
        rightNode={
          <Flex style={{minHeight: '100%', width: '100%'}}>
            <Horizontal
              topHeight="70%"
              topNode={
                <Flex direction="column" gap={0} style={{width: '100%'}}>
                  <Text weight="semibold" size={1} style={{margin: '7px 0 7px 2px'}}>
                    Query *
                  </Text>
                  <CodeMirrorEditor
                    value={query}
                    onChange={setQuery}
                    placeholder="Insert your groq query..."
                  />
                </Flex>
              }
              bottomHeight="30%"
              bottomNode={
                <Flex direction="column" gap={0} style={{width: '100%'}}>
                  <Text weight="semibold" size={1} style={{margin: '7px 0 7px 2px'}}>
                    Params
                  </Text>
                  <CodeMirrorEditor value={variables} onChange={setVariables} />
                </Flex>
              }
            />
          </Flex>
        }
      />
    </Dialog>
  )
}

export default InsertUpdateDialog
