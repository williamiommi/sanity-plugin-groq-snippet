import {Button} from '@sanity/ui'
import {memo} from 'react'
import BroomIcon from '../Icons/BroomIcon'

interface BeautifyCtaProps {
  beautifyFn: () => void
}

const BeautifyCta = ({beautifyFn}: BeautifyCtaProps) => {
  return (
    <Button
      mode="bleed"
      icon={<BroomIcon width={20} height={20} />}
      paddingX={2}
      paddingY={3}
      onClick={beautifyFn}
    />
  )
}

export default memo(BeautifyCta)
