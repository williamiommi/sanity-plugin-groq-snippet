import {Button, Flex} from '@sanity/ui'

interface FooterProps {
  isEdit: boolean
  canConfirm: boolean
  onCancel: () => void
  onConfirm: () => void
}

const Footer = ({isEdit, canConfirm, onCancel, onConfirm}: FooterProps) => (
  <Flex align="center" justify="space-between" gap={1} padding={3}>
    <Button mode="bleed" tone="default" fontSize={1} text="Cancel" onClick={onCancel} />
    <Button
      mode="default"
      tone="positive"
      fontSize={1}
      text={`${isEdit ? 'Update' : 'Save'} snippet`}
      disabled={!canConfirm}
      onClick={onConfirm}
    />
  </Flex>
)

export default Footer
