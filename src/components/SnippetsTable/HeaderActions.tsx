import {Button, Card, Flex, Label} from '@sanity/ui'
import useSnippetsTable from '../../hooks/useSnippetsTable'
import {useGroqSnippetStore} from '../../zustand/store'

const HeaderActions = () => {
  const openDeleteSnippetsDialog = useGroqSnippetStore((s) => s.openDeleteSnippetsDialog)
  const currentUserCanEdit = useGroqSnippetStore((s) => s.currentUserCanEdit)
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
          {currentUserCanEdit && (
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
          )}
        </Flex>
      </Flex>
    </Card>
  )
}

export default HeaderActions
