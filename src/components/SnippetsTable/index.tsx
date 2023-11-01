import {AddIcon} from '@sanity/icons'
import {Button, Flex, Label, Text} from '@sanity/ui'
import {useGroqSnippetStore} from '../../zustand/store'
import SearchInput from '../SearchInput'
import Row from './Row'
import TableHeading from './TableHeading'

export const tableWidth = {
  gap: 1,
  checkbox: '100px',
  actions: '270px',
  wrapper: 'calc(100% - 100px)',
  snippet: 'calc(100% - 370px)',
}

const SnippetsTable = () => {
  const isToolLoaded = useGroqSnippetStore((s) => s.isToolLoaded)
  const snippets = useGroqSnippetStore((s) => s.snippets)
  const openInsertUpdateSnippetsDialog = useGroqSnippetStore(
    (s) => s.openInsertUpdateSnippetsDialog,
  )
  if (!isToolLoaded) return null

  if (!snippets)
    return (
      <Flex direction="column" align="center" justify="center" gap={4} marginY={5}>
        <span style={{fontSize: '60px'}}>👀</span>
        <Text size={4} weight="bold">
          Nothing to see here
        </Text>
        <Button
          mode="ghost"
          tone="primary"
          icon={<AddIcon />}
          text="Add your first snippet"
          padding={4}
          style={{cursor: 'pointer'}}
          onClick={() => openInsertUpdateSnippetsDialog()}
        />
      </Flex>
    )

  return (
    <>
      <SearchInput />
      {snippets.length === 0 && (
        <Flex align="center" justify="center" padding={5}>
          <Label weight="semibold" size={3}>
            NO RESULTS
          </Label>
        </Flex>
      )}
      {snippets.length > 0 && (
        <Flex marginY={3} direction="column">
          <TableHeading />
          {snippets.map((snippet, index) => (
            <Row key={snippet._id} snippet={snippet} />
          ))}
        </Flex>
      )}
    </>
  )
}

export default SnippetsTable
