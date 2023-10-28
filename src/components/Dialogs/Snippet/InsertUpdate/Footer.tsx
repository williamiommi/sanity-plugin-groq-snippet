import {Button, Flex} from '@sanity/ui'
import {useGroqSnippetStore} from '../../../../zustand/store'

interface FooterProps {
  isEdit: boolean
  canConfirm: boolean
  onCancel: () => void
  onConfirm: () => void
}

const Footer = ({isEdit, canConfirm, onCancel, onConfirm}: FooterProps) => {
  const currentUserCanEdit = useGroqSnippetStore((s) => s.currentUserCanEdit)
  return (
    <Flex align="center" justify="space-between" gap={1} padding={3}>
      <Button mode="bleed" tone="default" fontSize={1} text="Cancel" onClick={onCancel} />
      {currentUserCanEdit && (
        <Button
          mode="default"
          tone="positive"
          fontSize={1}
          text={`${isEdit ? 'Update' : 'Save'} snippet`}
          disabled={!canConfirm}
          onClick={onConfirm}
        />
      )}
    </Flex>
  )
}

export default Footer
