import {EditIcon, TrashIcon} from '@sanity/icons'
import {Box, Button, Dialog, Flex, Text} from '@sanity/ui'
import useTagOperation from '../../../hooks/useTagOperation'
import {useGroqSnippetStore} from '../../../zustand/store'
import DeleteTagDialog from '../DeleteTag'
import Header from './Header'

const TagsDialog = () => {
  const isAllTagsDialogOpen = useGroqSnippetStore((s) => s.isAllTagsDialogOpen)
  const closeAllTagsDialog = useGroqSnippetStore((s) => s.closeAllTagsDialog)
  const {openDeleteTagDialog} = useTagOperation()
  const tags = useGroqSnippetStore((s) => s.tags)

  if (!isAllTagsDialogOpen) return null

  return (
    <>
      <Dialog id="tags-dialog" header={<Header />} width={1} onClose={closeAllTagsDialog}>
        <Box style={{maxHeight: '300px', overflow: 'scroll'}}>
          <Flex direction="column" paddingY={2}>
            {tags.map((tag) => (
              <Flex
                key={tag._id}
                justify="space-between"
                align="center"
                gap={2}
                paddingY={1}
                paddingLeft={4}
                paddingRight={3}
              >
                <Text size={1}>{tag.name.current}</Text>
                <Flex align="center" gap={1}>
                  <Button mode="bleed" tone="primary" icon={EditIcon} fontSize={1} padding={2} />
                  <Button
                    mode="bleed"
                    tone="critical"
                    icon={TrashIcon}
                    fontSize={1}
                    padding={2}
                    data-id={tag._id}
                    data-name={tag.name.current}
                    onClick={openDeleteTagDialog}
                  />
                </Flex>
              </Flex>
            ))}
          </Flex>
        </Box>
      </Dialog>
      <DeleteTagDialog />
    </>
  )
}

export default TagsDialog
