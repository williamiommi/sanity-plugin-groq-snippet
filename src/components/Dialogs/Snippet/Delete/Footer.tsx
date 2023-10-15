import {Button, Flex} from '@sanity/ui'

interface FooterProps {
  onCancel: () => void
  onConfirm: () => void
}

const Footer = ({onCancel, onConfirm}: FooterProps) => (
  <Flex align="center" justify="space-between" gap={1} padding={3}>
    <Button mode="bleed" tone="default" fontSize={1} text="Cancel" onClick={onCancel} />
    <Button
      mode="default"
      tone="critical"
      fontSize={1}
      text="Delete snippet(s)"
      onClick={onConfirm}
    />
  </Flex>
)

export default Footer
