import {Box, Button, Text, Tooltip} from '@sanity/ui'
import {memo} from 'react'
import BroomIcon from '../Icons/BroomIcon'

interface BeautifyCtaProps {
  beautifyFn: () => void
  disabled: boolean | undefined
}

const BeautifyCta = ({beautifyFn, disabled}: BeautifyCtaProps) => {
  return (
    <Tooltip
      content={
        <Box padding={2}>
          <Text muted size={1}>
            Beautify
          </Text>
        </Box>
      }
    >
      <Button
        mode="bleed"
        icon={<BroomIcon width={20} height={20} />}
        paddingX={2}
        paddingY={3}
        disabled={disabled}
        onClick={beautifyFn}
      />
    </Tooltip>
  )
}

export default memo(BeautifyCta)
