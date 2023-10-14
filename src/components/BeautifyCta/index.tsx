import {Box, Button, Text, Tooltip} from '@sanity/ui'
import {memo} from 'react'
import BroomIcon from '../Icons/BroomIcon'

interface BeautifyCtaProps {
  beautifyFn: () => void
}

const BeautifyCta = ({beautifyFn}: BeautifyCtaProps) => {
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
        onClick={beautifyFn}
      />
    </Tooltip>
  )
}

export default memo(BeautifyCta)
