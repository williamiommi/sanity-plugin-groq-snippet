/* eslint-disable react/jsx-no-bind */
import {AddIcon, TagIcon} from '@sanity/icons'
import {Button, Flex} from '@sanity/ui'
import {useGroqSnippetStore} from '../../zustand/store'

const MainActions = () => {
  const openAllTagsDialog = useGroqSnippetStore((s) => s.openAllTagsDialog)
  const openInsertUpdateSnippetsDialog = useGroqSnippetStore(
    (s) => s.openInsertUpdateSnippetsDialog,
  )
  return (
    <Flex align="center" gap={2}>
      <Button
        mode="ghost"
        tone="primary"
        icon={AddIcon}
        text="Add snippet"
        fontSize={1}
        onClick={() => openInsertUpdateSnippetsDialog()}
      />
      <Button
        mode="ghost"
        tone="primary"
        icon={TagIcon}
        text="Tags"
        fontSize={1}
        onClick={openAllTagsDialog}
      />
    </Flex>
  )
}

export default MainActions
