import {DocumentPdfIcon, DocumentSheetIcon} from '@sanity/icons'
import {Button, Card, Flex, Label, Menu, MenuButton, MenuItem} from '@sanity/ui'
import useSnippetsTable from '../../hooks/useSnippetsTable'
import {useGroqSnippetStore} from '../../zustand/store'

const HeaderActions = () => {
  const openDeleteSnippetsDialog = useGroqSnippetStore((s) => s.openDeleteSnippetsDialog)
  const {selectedSnippetsCount, hasSomeSnippetsChecked} = useSnippetsTable()
  return (
    <Card
      tone="transparent"
      paddingY={2}
      paddingX={3}
      style={{opacity: hasSomeSnippetsChecked ? 1 : 0}}
    >
      <Flex align="center" justify="space-between">
        <Label size={1}>{selectedSnippetsCount} selected</Label>
        <Flex>
          <MenuButton
            button={
              <Button
                mode="bleed"
                tone="default"
                paddingY={1}
                paddingX={2}
                style={{cursor: 'pointer'}}
              >
                <Label size={1}>export to...</Label>
              </Button>
            }
            id="menu-button-example"
            menu={
              <Menu>
                <MenuItem
                  role="button"
                  style={{cursor: 'pointer'}}
                  text={
                    <Flex align="center" padding={2} gap={2}>
                      <DocumentSheetIcon /> <Label size={1}>csv</Label>
                    </Flex>
                  }
                />
                <MenuItem
                  role="button"
                  style={{cursor: 'pointer'}}
                  text={
                    <Flex align="center" padding={2} gap={2}>
                      <DocumentPdfIcon /> <Label size={1}>pdf</Label>
                    </Flex>
                  }
                />
              </Menu>
            }
            popover={{portal: true, placement: 'bottom'}}
          />
          <Button
            mode="bleed"
            tone="critical"
            paddingY={1}
            paddingX={2}
            style={{cursor: 'pointer'}}
            onClick={openDeleteSnippetsDialog}
          >
            <Label size={1}>Delete</Label>
          </Button>
        </Flex>
      </Flex>
    </Card>
  )
}

export default HeaderActions
