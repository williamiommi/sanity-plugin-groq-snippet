import {EditIcon} from '@sanity/icons'
import {Box, Button, Checkbox, Dialog, Flex, Label, Text} from '@sanity/ui'
import useTagOperation from '../../../../hooks/useTagOperation'
import {useGroqSnippetStore} from '../../../../zustand/store'
import DeleteTagDialog from '../Delete'
import Footer from './Footer'
import Header from './Header'

const AllDialog = () => {
  const isAllTagsDialogOpen = useGroqSnippetStore((s) => s.isAllTagsDialogOpen)
  const closeAllTagsDialog = useGroqSnippetStore((s) => s.closeAllTagsDialog)
  const openInsertUpdateTagsDialog = useGroqSnippetStore((s) => s.openInsertUpdateTagsDialog)
  const currentUserCanEdit = useGroqSnippetStore((s) => s.currentUserCanEdit)
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
        {tags.length === 0 ? (
          <Label weight="medium" style={{margin: '50px auto', width: '100%', textAlign: 'center'}}>
            no tags
          </Label>
        ) : (
          <>
            <Flex margin={4} marginBottom={3} align="center" as="label" htmlFor="check-all" gap={2}>
              {currentUserCanEdit && (
                <Checkbox id="check-all" onChange={toggleAll} checked={hasAllTagsChecked} />
              )}
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
                      {currentUserCanEdit && (
                        <Checkbox
                          id={`check-${tag._id}`}
                          onChange={toggleTag}
                          data-id={tag._id}
                          data-name={tag.name.current}
                          checked={tag.checked || false}
                        />
                      )}
                      <Text size={1}>{tag.name.current}</Text>
                    </Flex>
                    <Flex align="center" gap={1}>
                      {currentUserCanEdit && (
                        <Button
                          mode="bleed"
                          tone="primary"
                          icon={EditIcon}
                          fontSize={1}
                          padding={2}
                          onClick={() => openInsertUpdateTagsDialog(tag)}
                        />
                      )}
                    </Flex>
                  </Flex>
                ))}
              </Flex>
            </Box>
          </>
        )}
      </Dialog>
      <DeleteTagDialog />
    </>
  )
}

export default AllDialog
