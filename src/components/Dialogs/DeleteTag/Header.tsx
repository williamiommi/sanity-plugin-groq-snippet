import {WarningOutlineIcon} from '@sanity/icons'
import {Flex} from '@sanity/ui'

const Header = () => (
  <Flex align="center" gap={4}>
    <WarningOutlineIcon />
    <span>Confirm operation</span>
  </Flex>
)

export default Header
