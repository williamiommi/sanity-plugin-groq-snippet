import {Badge, Card, Flex, Text} from '@sanity/ui'
import GroqSnippet from '../../types/GroqSnippet'
import {useGroqSnippetStore} from '../../zustand/store'
import SnippetCheckbox from '../SnippetCheckbox'
import {TextClamp} from '../Styles'

interface ItemProps {
  snippet: GroqSnippet
}

const Item = ({snippet}: ItemProps) => {
  const openInsertUpdateSnippetsDialog = useGroqSnippetStore(
    (s) => s.openInsertUpdateSnippetsDialog,
  )

  return (
    <Card
      border
      padding={3}
      style={{position: 'relative'}}
      onClick={() => openInsertUpdateSnippetsDialog(snippet._id)}
    >
      <Flex gap={4} style={{height: '100%'}}>
        <SnippetCheckbox snippet={snippet} />
        <Flex direction="column" gap={2}>
          <Text weight="bold" size={3}>
            {snippet.title}
          </Text>
          {snippet.description && (
            <TextClamp as="i" lines={3}>
              {snippet.description}
            </TextClamp>
          )}
          {snippet.tags && snippet.tags?.length > 0 && (
            <Flex marginTop={3} gap={2} wrap="wrap">
              {snippet.tags.map((tag) => (
                <Badge key={tag._ref} tone="primary" fontSize={0} padding={2}>
                  {tag.name}
                </Badge>
              ))}
            </Flex>
          )}
        </Flex>
      </Flex>
    </Card>
  )
}

export default Item
