import {Button, Flex} from '@sanity/ui'
import {useGroqSnippetStore} from '../../../../zustand/store'

interface FooterProps {
  isEdit: boolean
  canConfirm: boolean
  onCancel: () => void
  onConfirm: () => void
  onLoadSnippet: () => void
}

const Footer = ({isEdit, canConfirm, onCancel, onConfirm, onLoadSnippet}: FooterProps) => {
  const currentUserCanEdit = useGroqSnippetStore((s) => s.currentUserCanEdit)
  const visionTool = useGroqSnippetStore((s) => s.visionTool)
  return (
    <Flex align="center" justify="space-between" gap={1} padding={3}>
      <Button mode="bleed" tone="default" fontSize={1} text="Cancel" onClick={onCancel} />
      {currentUserCanEdit && (
        <Flex align="center" justify="space-between" gap={2}>
          {isEdit && visionTool && (
            <Button
              mode="default"
              tone="primary"
              fontSize={1}
              text={`Load on ${visionTool.title}`}
              disabled={!canConfirm}
              onClick={onLoadSnippet}
            />
          )}
          <Button
            mode="default"
            tone="positive"
            fontSize={1}
            text={`${isEdit ? 'Update' : 'Save'} snippet`}
            disabled={!canConfirm}
            onClick={onConfirm}
          />
        </Flex>
      )}
    </Flex>
  )
}

export default Footer
