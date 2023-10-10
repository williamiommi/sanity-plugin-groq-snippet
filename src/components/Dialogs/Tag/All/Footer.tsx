import {AddIcon} from '@sanity/icons'
import {Button, Flex} from '@sanity/ui'
import useTagOperation from '../../../../hooks/useTagOperation'
import {useGroqSnippetStore} from '../../../../zustand/store'

const Footer = () => {
  const openDeleteTagsDialog = useGroqSnippetStore((s) => s.openDeleteTagsDialog)
  const openInsertUpdateTagsDialog = useGroqSnippetStore((s) => s.openInsertUpdateTagsDialog)
  const {hasAtLeastOneTagChecked} = useTagOperation()
  return (
    <Flex flex={1} justify="space-between" gap={2} marginY={3} marginX={4}>
      <Button
        tone="critical"
        text="Delete Selected"
        fontSize={1}
        onClick={openDeleteTagsDialog}
        disabled={!hasAtLeastOneTagChecked}
      />
      <Button
        tone="primary"
        icon={<AddIcon fontSize={0} />}
        text="Create"
        fontSize={1}
        onClick={() => openInsertUpdateTagsDialog()}
      />
    </Flex>
  )
}

export default Footer
