import {ErrorOutlineIcon} from '@sanity/icons'
import {Button, Card, Dialog, Flex, Text, Tooltip} from '@sanity/ui'
import useCopyToClipboard from '../../../../hooks/useCopyToClipboard'
import useSnippetForm from '../../../../hooks/useSnippetForm'
import {useGroqSnippetStore} from '../../../../zustand/store'
import CodeMirrorEditor from '../../../CodeMirrorEditor'
import BroomIcon from '../../../Icons/BroomIcon'
import CopyIcon from '../../../Icons/CopyIcon'
import Horizontal from '../../../Resizer/Horizontal'
import Vertical from '../../../Resizer/Vertical'
import Footer from './Footer'
import Form from './Form'
import Header from './Header'

const InsertUpdateDialog = () => {
  const copy2clipboard = useCopyToClipboard()
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
                      <Button
                        mode="bleed"
                        icon={<CopyIcon width={20} height={20} />}
                        paddingX={2}
                        paddingY={3}
                        onClick={() => copy2clipboard(query)}
                      />
                      <Button
                        mode="bleed"
                        icon={<BroomIcon width={20} height={20} />}
                        paddingX={2}
                        paddingY={3}
                        onClick={beautifyQuery}
                      />
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
                            <Card padding={2}>
                              <Text>{variablesError}</Text>
                            </Card>
                          }
                        >
                          <ErrorOutlineIcon fontSize={20} />
                        </Tooltip>
                      )}
                    </Flex>
                    <Flex align="center" gap={0}>
                      <Button
                        mode="bleed"
                        icon={<CopyIcon width={20} height={20} />}
                        paddingX={2}
                        paddingY={3}
                        onClick={() => copy2clipboard(variables)}
                      />
                      <Button
                        mode="bleed"
                        icon={<BroomIcon width={20} height={20} />}
                        paddingX={2}
                        paddingY={3}
                        onClick={beautifyVariables}
                      />
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
