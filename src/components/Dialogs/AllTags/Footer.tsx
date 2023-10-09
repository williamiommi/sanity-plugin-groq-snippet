import {AddIcon} from '@sanity/icons'
import {Button, Flex} from '@sanity/ui'
import {useGroqSnippetStore} from '../../../zustand/store'

const Footer = () => {
  const selectedTags = useGroqSnippetStore((s) => s.selectedTags)
  const openDeleteTagsDialog = useGroqSnippetStore((s) => s.openDeleteTagsDialog)
  return (
    <Flex flex={1} justify="space-between" gap={2} marginY={3} marginX={4}>
      <Button
        tone="critical"
        text="Delete Selected"
        fontSize={1}
        onClick={openDeleteTagsDialog}
        disabled={selectedTags.length === 0}
      />
      <Button tone="primary" icon={<AddIcon fontSize={0} />} text="Create" fontSize={1} />
    </Flex>
  )
}

export default Footer
