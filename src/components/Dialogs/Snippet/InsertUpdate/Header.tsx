import {TagIcon} from '@sanity/icons'
import {Flex} from '@sanity/ui'

interface HeaderProps {
  isEdit?: boolean
}

const Header = ({isEdit}: HeaderProps) => (
  <Flex align="center" gap={4}>
    <TagIcon />
    <span>{isEdit ? 'Edit' : 'Insert'} snippet</span>
  </Flex>
)

export default Header
