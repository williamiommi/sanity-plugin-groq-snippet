import {WarningOutlineIcon} from '@sanity/icons'
import {Card, Flex, Text} from '@sanity/ui'
import {useGroqSnippetStore} from '../../zustand/store'

export default function UserCantEditMessage() {
  const currentUserCanEdit = useGroqSnippetStore((s) => s.currentUserCanEdit)
  if (currentUserCanEdit) return null
  return (
    <Card padding={2} tone="caution" border>
      <Flex align="center" gap={2}>
        <WarningOutlineIcon width={25} height={25} />
        <Text weight="bold" size={1}>
          Your role does not have permissions to update this content.
        </Text>
      </Flex>
    </Card>
  )
}
