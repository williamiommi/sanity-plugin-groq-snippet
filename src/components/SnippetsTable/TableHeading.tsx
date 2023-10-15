import {Checkbox, Flex, Label} from '@sanity/ui'
import {tableWidth} from '.'
import {TableHeadingWrapper} from '../Styles'

const TableHeading = () => {
  return (
    <TableHeadingWrapper align="center" gap={tableWidth.gap} paddingY={2}>
      <Flex align="center" justify="center" style={{width: tableWidth.checkbox}}>
        <Checkbox />
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
  )
}

export default TableHeading
