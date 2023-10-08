import {AddIcon, TagIcon} from '@sanity/icons'
import {Button, Flex} from '@sanity/ui'
import {useGroqSnippetStore} from '../../zustand/store'

const MainActions = () => {
  const openAllTagsDialog = useGroqSnippetStore((s) => s.openAllTagsDialog)
  return (
    <Flex align="center" gap={2}>
      <Button mode="ghost" tone="primary" icon={AddIcon} text="Add snippet" fontSize={1} />
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
