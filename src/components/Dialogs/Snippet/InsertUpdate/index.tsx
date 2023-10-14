import {ErrorOutlineIcon} from '@sanity/icons'
import {Box, Card, Dialog, Flex, Text, Tooltip} from '@sanity/ui'
import useSnippetForm from '../../../../hooks/useSnippetForm'
import {useGroqSnippetStore} from '../../../../zustand/store'
import BeautifyCta from '../../../BeautifyCta'
import CodeMirrorEditor from '../../../CodeMirrorEditor'
import Copy2ClipboardCta from '../../../Copy2ClipboardCta'
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
    variablesError,
    canConfirm,
    setTitle,
    setDescription,
    setFormTag,
    setQuery,
    beautifyQuery,
    setVariables,
    beautifyVariables,
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
                  <Flex gap={2} align="center" justify="space-between">
                    <Text weight="semibold" size={1} style={{margin: '7px 0 7px 2px'}}>
                      Query *
                    </Text>
                    <Flex align="center" gap={0}>
                      <Copy2ClipboardCta value={query} />
                      <BeautifyCta beautifyFn={beautifyQuery} />
                    </Flex>
                  </Flex>
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
                  <Flex gap={2} align="center" justify="space-between">
                    <Flex gap={2} align="center">
                      <Text weight="semibold" size={1} style={{margin: '7px 0 7px 2px'}}>
                        Params
                      </Text>
                      {variablesError && (
                        <Tooltip
                          content={
                            <Box padding={2}>
                              <Text size={1}>{variablesError}</Text>
                            </Box>
                          }
                        >
                          <ErrorOutlineIcon fontSize={20} />
                        </Tooltip>
                      )}
                    </Flex>
                    <Flex align="center" gap={0}>
                      <Copy2ClipboardCta value={variables} />
                      <BeautifyCta beautifyFn={beautifyVariables} />
                    </Flex>
                  </Flex>
                  <Card
                    {...(variablesError && {tone: 'critical'})}
                    style={{width: '100%', height: '100%'}}
                  >
                    <CodeMirrorEditor value={variables} onChange={setVariables} />
                  </Card>
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
