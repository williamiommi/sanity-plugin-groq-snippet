import {Button, Flex} from '@sanity/ui'

interface FooterProps {
  isEdit: boolean
  onCancel: () => void
  onConfirm: () => void
}

const Footer = ({isEdit, onCancel, onConfirm}: FooterProps) => (
  <Flex align="center" justify="space-between" gap={1} padding={3}>
    <Button mode="bleed" tone="default" fontSize={1} text="Cancel" onClick={onCancel} />
    <Button
      mode="default"
      tone="positive"
      fontSize={1}
      text={`${isEdit ? 'Update' : 'Save'} tag`}
      onClick={onConfirm}
    />
  </Flex>
)

export default Footer
