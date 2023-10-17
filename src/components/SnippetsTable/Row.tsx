import {CogIcon, EditIcon} from '@sanity/icons'
import {Badge, Button, Flex, Text} from '@sanity/ui'
import {useState} from 'react'
import {tableWidth} from '.'
import GroqSnippet from '../../types/GroqSnippet'
import {useGroqSnippetStore} from '../../zustand/store'
import SnippetCheckbox from '../SnippetCheckbox'
import {TableRowWrapper, TextClamp} from '../Styles'

interface RowProps {
  snippet: GroqSnippet
  odd?: boolean
}

const Row = ({snippet, odd}: RowProps) => {
  const [isHover, setIsHover] = useState(false)
  const openInsertUpdateSnippetsDialog = useGroqSnippetStore(
    (s) => s.openInsertUpdateSnippetsDialog,
  )

  const handleEditDialog = () => openInsertUpdateSnippetsDialog(snippet._id)
  const handleMouseOver = () => setIsHover(true)
  const handleMouseLeave = () => setIsHover(false)

  return (
    <TableRowWrapper
      paddingY={5}
      tone={isHover ? 'transparent' : undefined}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
    >
      <Flex gap={tableWidth.gap} align="center">
        <SnippetCheckbox snippet={snippet} />
        <Flex style={{width: tableWidth.wrapper}}>
          <Flex align="center" style={{width: tableWidth.wrapper}}>
            <Flex direction="column" gap={2}>
              {snippet.tags && snippet.tags?.length > 0 && (
                <Flex gap={2} wrap="wrap">
                  {snippet.tags.map((tag) => (
                    <Badge key={tag._ref} tone="primary" fontSize={0} padding={1} paddingX={2}>
                      {tag.name}
                    </Badge>
                  ))}
                </Flex>
              )}
              <Text weight="bold">{snippet.title}</Text>
              {snippet.description && (
                <TextClamp as="i" lines={3}>
                  {snippet.description}
                </TextClamp>
              )}
            </Flex>
          </Flex>
          <Flex align="center" justify="center" style={{width: tableWidth.actions}}>
            <Button mode="bleed" icon={EditIcon} onClick={handleEditDialog} />
            <Button mode="bleed" icon={CogIcon} />
          </Flex>
        </Flex>
      </Flex>
    </TableRowWrapper>
  )
}

export default Row
