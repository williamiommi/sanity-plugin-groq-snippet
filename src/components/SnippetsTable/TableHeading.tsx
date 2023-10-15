import {Button, Card, Checkbox, Flex, Label} from '@sanity/ui'
import {tableWidth} from '.'
import useSnippetsTable from '../../hooks/useSnippetsTable'
import {useGroqSnippetStore} from '../../zustand/store'
import {TableHeadingWrapper} from '../Styles'

const TableHeading = () => {
  const openDeleteSnippetsDialog = useGroqSnippetStore((s) => s.openDeleteSnippetsDialog)
  const {
    selectedSnippetsCount,
    hasSomeSnippetsChecked,
    hasAllSnippetsChecked,
    toggleSnippetsCheckbox,
  } = useSnippetsTable()
  return (
    <>
      <Card
        tone="transparent"
        paddingY={2}
        paddingX={3}
        style={{opacity: hasSomeSnippetsChecked ? 1 : 0}}
      >
        <Flex align="center" justify="space-between">
          <Label>{selectedSnippetsCount} selected</Label>
          <Flex>
            <Button
              mode="bleed"
              tone="critical"
              fontSize={1}
              paddingY={1}
              paddingX={2}
              style={{cursor: 'pointer'}}
              onClick={openDeleteSnippetsDialog}
            >
              <Label>Delete</Label>
            </Button>
          </Flex>
        </Flex>
      </Card>
      <TableHeadingWrapper align="center" gap={tableWidth.gap} paddingY={2}>
        <Flex align="center" justify="center" style={{width: tableWidth.checkbox}}>
          <Checkbox
            id="snippets-table__checkbox-all"
            checked={hasAllSnippetsChecked}
            onChange={toggleSnippetsCheckbox}
          />
        </Flex>
        <Flex wrap="nowrap" align="center" style={{width: tableWidth.snippet}}>
          <Flex>
            <Label weight="medium">Snippet</Label>
          </Flex>
        </Flex>
        <Flex align="center" justify="center" style={{width: tableWidth.actions}}>
          <Label weight="medium">actions</Label>
        </Flex>
      </TableHeadingWrapper>
    </>
  )
}

export default TableHeading
