import {Checkbox, Flex, Label} from '@sanity/ui'
import {tableWidth} from '.'
import useSnippetsTable from '../../hooks/useSnippetsTable'
import Sorting from '../Sorting'
import {TableHeadingWrapper} from '../Styles'
import HeaderActions from './HeaderActions'

const TableHeading = () => {
  const {hasAllSnippetsChecked, toggleSnippetsCheckbox} = useSnippetsTable()
  return (
    <>
      <HeaderActions />
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
        <Flex
          align="center"
          justify="flex-end"
          style={{width: tableWidth.actions, paddingRight: '30px'}}
        >
          <Sorting />
        </Flex>
      </TableHeadingWrapper>
    </>
  )
}

export default TableHeading
