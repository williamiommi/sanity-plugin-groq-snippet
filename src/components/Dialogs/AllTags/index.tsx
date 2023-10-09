import {EditIcon} from '@sanity/icons'
import {Box, Button, Checkbox, Dialog, Flex, Text} from '@sanity/ui'
import useTagOperation from '../../../hooks/useTagOperation'
import {useGroqSnippetStore} from '../../../zustand/store'
import DeleteTagDialog from '../DeleteTag'
import Footer from './Footer'
import Header from './Header'

const TagsDialog = () => {
  const isAllTagsDialogOpen = useGroqSnippetStore((s) => s.isAllTagsDialogOpen)
  const closeAllTagsDialog = useGroqSnippetStore((s) => s.closeAllTagsDialog)
  const {toggleTag, toggleAll, hasAllTagsChecked} = useTagOperation()
  const tags = useGroqSnippetStore((s) => s.tags)

  if (!isAllTagsDialogOpen) return null

  return (
    <>
      <Dialog
        id="tags-dialog"
        header={<Header />}
        footer={<Footer />}
        width={1}
        onClose={closeAllTagsDialog}
      >
        <Flex margin={4} marginBottom={3} align="center" as="label" htmlFor="check-all" gap={2}>
          <Checkbox id="check-all" onChange={toggleAll} checked={hasAllTagsChecked} />
          <Text muted as="i" size={1}>
            {hasAllTagsChecked ? 'Deselect' : 'Select'} all
          </Text>
        </Flex>
        <Box style={{maxHeight: '300px', overflow: 'scroll', position: 'relative'}}>
          <Flex direction="column" paddingY={2}>
            {tags.map((tag) => (
              <Flex
                key={tag._id}
                justify="space-between"
                align="center"
                gap={2}
                paddingY={1}
                paddingX={4}
              >
                <Flex gap={2} align="center" as="label" htmlFor={`check-${tag._id}`}>
                  <Checkbox
                    id={`check-${tag._id}`}
                    onChange={toggleTag}
                    data-id={tag._id}
                    data-name={tag.name.current}
                    checked={tag.checked || false}
                  />
                  <Text size={1}>{tag.name.current}</Text>
                </Flex>
                <Flex align="center" gap={1}>
                  <Button mode="bleed" tone="primary" icon={EditIcon} fontSize={1} padding={2} />
                  {/* <Button
                    mode="bleed"
                    tone="critical"
                    icon={TrashIcon}
                    fontSize={1}
                    padding={2}
                    data-id={tag._id}
                    data-name={tag.name.current}
                    onClick={openDeleteTagDialog}
                  /> */}
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
