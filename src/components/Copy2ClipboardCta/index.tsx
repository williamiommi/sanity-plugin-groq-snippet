import {Box, Button, Text, Tooltip} from '@sanity/ui'
import {memo} from 'react'
import useCopyToClipboard from '../../hooks/useCopyToClipboard'
import CopyIcon from '../Icons/CopyIcon'

interface Copy2ClipboardCtaProps {
  value: string | undefined
  disabled: boolean | undefined
}

const Copy2ClipboardCta = ({value, disabled}: Copy2ClipboardCtaProps) => {
  const copy2clipboard = useCopyToClipboard()
  return (
    <Tooltip
      content={
        <Box padding={2}>
          <Text muted size={1}>
            Copy to Clipboard
          </Text>
        </Box>
      }
    >
      <Button
        mode="bleed"
        icon={<CopyIcon width={20} height={20} />}
        paddingX={2}
        paddingY={3}
        disabled={disabled}
        onClick={() => copy2clipboard(value)}
      />
    </Tooltip>
  )
}

export default memo(Copy2ClipboardCta)
