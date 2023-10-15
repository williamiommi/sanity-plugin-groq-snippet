import {Flex, Label} from '@sanity/ui'
import {useGroqSnippetStore} from '../../zustand/store'
import SearchInput from '../SearchInput'
import Row from './Row'
import TableHeading from './TableHeading'

export const tableWidth = {
  gap: 1,
  checkbox: '100px',
  actions: '100px',
  wrapper: 'calc(100% - 100px)',
  snippet: 'calc(100% - 200px)',
}

const SnippetsTable = () => {
  const snippets = useGroqSnippetStore((s) => s.snippets)
  if (!snippets) return null

  if (snippets.length === 0) {
    return (
      <Flex align="center" justify="center" padding={5}>
        <Label weight="semibold" size={3}>
          NO RESULTS
        </Label>
      </Flex>
    )
  }

  return (
    <>
      <SearchInput />
      <Flex marginY={3} direction="column">
        <TableHeading />
        {snippets.map((snippet, index) => (
          <Row key={snippet._id} snippet={snippet} odd={index % 2 !== 0} />
        ))}
      </Flex>
    </>
  )
}

export default SnippetsTable
