import {Dialog, Flex, Text, TextInput} from '@sanity/ui'
import {useCallback, useRef} from 'react'
import {useGroqSnippetStore} from '../../../../zustand/store'
import Footer from './Footer'
import Header from './Header'

const InsertUpdateDialog = () => {
  const nameRef = useRef<HTMLInputElement>(null)
  const isInsertUpdateTagsDialogOpen = useGroqSnippetStore((s) => s.isInsertUpdateTagsDialogOpen)
  const closeInsertUpdateTagsDialog = useGroqSnippetStore((s) => s.closeInsertUpdateTagsDialog)
  const addTag = useGroqSnippetStore((s) => s.addTag)
  const updateTag = useGroqSnippetStore((s) => s.updateTag)
  const tagToUpdate = useGroqSnippetStore((s) => s.tagToUpdate)

  const handleConfirm = useCallback(() => {
    if (!nameRef.current?.value) return
    if (tagToUpdate) {
      updateTag(tagToUpdate._id, nameRef.current.value)
    } else {
      addTag(nameRef.current.value)
    }
  }, [tagToUpdate, addTag, updateTag])

  if (!isInsertUpdateTagsDialogOpen) return null

  return (
    <Dialog
      id="insert-update-tag-dialog"
      header={<Header isEdit={!!tagToUpdate} />}
      footer={
        <Footer
          isEdit={!!tagToUpdate}
          onCancel={closeInsertUpdateTagsDialog}
          onConfirm={handleConfirm}
        />
      }
      onClose={closeInsertUpdateTagsDialog}
      width={1}
    >
      <Flex margin={4} direction="column" gap={2}>
        <Flex gap={1} align="center">
          <Text weight="semibold" size={1}>
            Name
          </Text>
        </Flex>
        <TextInput ref={nameRef} id="name" defaultValue={tagToUpdate?.name.current} />
      </Flex>
    </Dialog>
  )
}

export default InsertUpdateDialog
